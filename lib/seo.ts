import { ARTICLES_ROUTE, BRAND_NAME, BRAND_ROLE, HOME_ROUTE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_URL } from '../constants';
import { Article, AppRoute } from '../types';

const DEFAULT_IMAGE = `${SITE_URL}/amaury-hero.png`;
const META_DATA_ATTRIBUTE = 'data-seo-managed';
const JSON_LD_ID = 'seo-json-ld';

const ensureMetaTag = (selector: string, attrs: Record<string, string>) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => {
      tag?.setAttribute(key, value);
    });
    tag.setAttribute(META_DATA_ATTRIBUTE, 'true');
    document.head.appendChild(tag);
  }

  return tag;
};

const setMetaContent = (selector: string, attrs: Record<string, string>, content?: string) => {
  if (!content) {
    return;
  }

  const tag = ensureMetaTag(selector, attrs);
  tag.setAttribute('content', content);
};

const setLinkHref = (selector: string, rel: string, href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>(selector);

  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    link.setAttribute(META_DATA_ATTRIBUTE, 'true');
    document.head.appendChild(link);
  }

  link.href = href;
};

const setJsonLd = (payload: Record<string, unknown> | Array<Record<string, unknown>>) => {
  let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = JSON_LD_ID;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);
};

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, '').trim();

const buildArticleDescription = (article: Article) => stripHtml(article.excerpt).slice(0, 160);

const buildHomeJsonLd = () => ([
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amaury Mogollón',
    jobTitle: BRAND_ROLE,
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    sameAs: [
      'https://www.instagram.com/amaurymogollon/',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Acción Política',
    },
    knowsAbout: [
      'Consultoría política',
      'Estrategia política',
      'Campañas electorales',
      'Comunicación política',
      'Latinoamérica',
      'México',
      'Colombia',
      'Venezuela',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${BRAND_NAME} | ${BRAND_ROLE}`,
    url: SITE_URL,
    inLanguage: 'es',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}${ARTICLES_ROUTE}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
]);

const buildArticlesJsonLd = (articles: Article[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `Artículos | ${BRAND_NAME}`,
  url: `${SITE_URL}${ARTICLES_ROUTE}`,
  description: 'Artículos, análisis y opinión de Amaury Mogollón sobre estrategia política y comunicación pública en Latinoamérica.',
  isPartOf: {
    '@type': 'WebSite',
    name: BRAND_NAME,
    url: SITE_URL,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: articles.slice(0, 12).map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}${article.href ?? HOME_ROUTE}`,
      name: article.title,
    })),
  },
});

const buildArticleJsonLd = (article: Article) => {
  const canonicalUrl = `${SITE_URL}${article.href ?? getArticlePath(article.slug)}`;
  const image = article.coverImage || DEFAULT_IMAGE;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Artículos',
          item: `${SITE_URL}${ARTICLES_ROUTE}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: buildArticleDescription(article),
      image: [image],
      datePublished: article.publishedAt || article.updatedAt,
      dateModified: article.updatedAt || article.publishedAt,
      mainEntityOfPage: canonicalUrl,
      author: {
        '@type': 'Person',
        name: 'Amaury Mogollón',
      },
      publisher: {
        '@type': 'Organization',
        name: BRAND_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.svg`,
        },
      },
      articleSection: article.category,
      inLanguage: 'es',
    },
  ];
};

const getArticlePath = (slug: string) => `${ARTICLES_ROUTE}/${slug}`;

interface ApplySeoArgs {
  route: AppRoute;
  articles: Article[];
  article?: Article | null;
}

export const applySeo = ({ route, articles, article }: ApplySeoArgs) => {
  const isArticleDetail = route === 'article-detail' && article;
  const canonicalPath = isArticleDetail
    ? article.href ?? getArticlePath(article.slug)
    : route === 'articles'
      ? ARTICLES_ROUTE
      : HOME_ROUTE;
  const canonicalUrl = `${SITE_URL}${canonicalPath === HOME_ROUTE ? '' : canonicalPath}`;

  const title = isArticleDetail
    ? `${article.title} | ${BRAND_NAME}`
    : route === 'articles'
      ? `Artículos | ${BRAND_NAME}`
      : `${BRAND_NAME} | ${BRAND_ROLE} en Latinoamérica`;

  const description = isArticleDetail
    ? buildArticleDescription(article)
    : route === 'articles'
      ? 'Artículos de Amaury Mogollón sobre consultoría política, campañas electorales, comunicación pública y liderazgo en Latinoamérica.'
      : SITE_DESCRIPTION;

  const image = isArticleDetail ? article.coverImage || DEFAULT_IMAGE : DEFAULT_IMAGE;

  document.title = title;
  setLinkHref('link[rel="canonical"]', 'canonical', canonicalUrl);
  setMetaContent('meta[name="description"]', { name: 'description' }, description);
  setMetaContent('meta[name="keywords"]', { name: 'keywords' }, SITE_KEYWORDS.join(', '));
  setMetaContent('meta[name="robots"]', { name: 'robots' }, 'index, follow, max-image-preview:large');
  setMetaContent('meta[property="og:title"]', { property: 'og:title' }, title);
  setMetaContent('meta[property="og:description"]', { property: 'og:description' }, description);
  setMetaContent('meta[property="og:type"]', { property: 'og:type' }, isArticleDetail ? 'article' : 'website');
  setMetaContent('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
  setMetaContent('meta[property="og:image"]', { property: 'og:image' }, image);
  setMetaContent('meta[property="og:locale"]', { property: 'og:locale' }, 'es_MX');
  setMetaContent('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  setMetaContent('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
  setMetaContent('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
  setMetaContent('meta[name="twitter:image"]', { name: 'twitter:image' }, image);

  if (isArticleDetail) {
    setMetaContent('meta[property="article:published_time"]', { property: 'article:published_time' }, article.publishedAt || article.updatedAt);
    setMetaContent('meta[property="article:modified_time"]', { property: 'article:modified_time' }, article.updatedAt || article.publishedAt);
    setMetaContent('meta[property="article:section"]', { property: 'article:section' }, article.category);
    setJsonLd(buildArticleJsonLd(article));
    return;
  }

  if (route === 'articles') {
    setJsonLd(buildArticlesJsonLd(articles));
    return;
  }

  setJsonLd(buildHomeJsonLd());
};
