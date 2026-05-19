import { createClient } from '@sanity/client';
import groq from 'groq';
import { Article } from '../types';
import { getArticleRoute } from '../constants';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'jimcmq0x';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-05-18';
const useCdn = (import.meta.env.VITE_SANITY_USE_CDN || 'true') === 'true';

export const hasSanityConfig = Boolean(projectId && dataset);

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

const articlesQuery = groq`*[_type == "article"] | order(featured desc, publishedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  "date": publishedAt,
  readTime,
  excerpt,
  "coverImage": coverImage.asset->url,
  featured,
  content
}`;

const formatDate = (value?: string) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const splitContent = (value?: string) =>
  value
    ?.split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) ?? [];

export const fetchSanityArticles = async (): Promise<Article[]> => {
  const articles = await sanityClient.fetch<
    Array<{
      id: string;
      slug: string;
      title: string;
      category: string;
      date?: string;
      readTime: string;
      excerpt: string;
      coverImage?: string;
      featured?: boolean;
      content?: string;
    }>
  >(articlesQuery);

  return articles.map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category,
    date: formatDate(article.date),
    readTime: article.readTime,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    featured: article.featured,
    href: getArticleRoute(article.slug),
    content: splitContent(article.content),
  }));
};

