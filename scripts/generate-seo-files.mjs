import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const siteUrl = process.env.SITE_URL || 'https://amaurymogollon.com';
const projectId = process.env.VITE_SANITY_PROJECT_ID || 'jimcmq0x';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2026-05-18';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/articulos', changefreq: 'daily', priority: '0.9' },
];

const articlesQuery = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  _updatedAt,
  "coverImage": coverImage.asset->url
}`;

const escapeXml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const toIso = (value) => {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
};

const formatRfc822 = (value) => new Date(toIso(value)).toUTCString();

const fetchArticles = async () => {
  try {
    return await client.fetch(articlesQuery);
  } catch (error) {
    console.warn('SEO generation fallback: could not fetch Sanity articles.', error?.message || error);
    return [];
  }
};

const generateSitemap = (articles) => {
  const urls = [
    ...staticPages.map((page) => `
  <url>
    <loc>${siteUrl}${page.path === '/' ? '' : page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`),
    ...articles.map((article) => `
  <url>
    <loc>${siteUrl}/articulos/${article.slug}</loc>
    <lastmod>${toIso(article._updatedAt || article.publishedAt)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`),
  ].join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const generateNewsSitemap = (articles) => {
  const recentArticles = articles.filter((article) => {
    const publishedAt = new Date(article.publishedAt || article._updatedAt || Date.now()).getTime();
    const diff = Date.now() - publishedAt;
    return diff <= 1000 * 60 * 60 * 24 * 2;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentArticles.map((article) => `
  <url>
    <loc>${siteUrl}/articulos/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Amaury Mogollón</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${toIso(article.publishedAt || article._updatedAt)}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`).join('')}
</urlset>
`;
};

const generateRss = (articles) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Amaury Mogollón | Artículos</title>
    <link>${siteUrl}/articulos</link>
    <description>Artículos, análisis y opinión de Amaury Mogollón.</description>
    <language>es-mx</language>
    ${articles.slice(0, 20).map((article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteUrl}/articulos/${article.slug}</link>
      <guid>${siteUrl}/articulos/${article.slug}</guid>
      <pubDate>${formatRfc822(article.publishedAt || article._updatedAt)}</pubDate>
      <description>${escapeXml(article.excerpt || '')}</description>
      <category>${escapeXml(article.category || '')}</category>
    </item>`).join('')}
  </channel>
</rss>
`;

const generateRobots = () => `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/news-sitemap.xml
`;

await mkdir(publicDir, { recursive: true });

const articles = await fetchArticles();

await Promise.all([
  writeFile(path.join(publicDir, 'sitemap.xml'), generateSitemap(articles), 'utf8'),
  writeFile(path.join(publicDir, 'news-sitemap.xml'), generateNewsSitemap(articles), 'utf8'),
  writeFile(path.join(publicDir, 'rss.xml'), generateRss(articles), 'utf8'),
  writeFile(path.join(publicDir, 'robots.txt'), generateRobots(), 'utf8'),
]);

console.log(`Generated SEO files with ${articles.length} article(s).`);
