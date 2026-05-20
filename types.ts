export interface Award {
  id: string;
  organization: string;
  title: string;
  year: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  coverColor?: string; // Kept for fallback
  coverImage?: string; // New property for image path
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  coverImage?: string;
  href?: string;
  featured?: boolean;
  content?: Array<Record<string, unknown>> | string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export type AppRoute = 'home' | 'articles' | 'article-detail';

export enum SectionId {
  HERO = 'home',
  BIO = 'biography',
  AWARDS = 'awards',
  BOOKS = 'books',
  ARTICLES = 'articles',
  CONSULTING = 'consulting',
  FILM = 'film',
  CONTACT = 'contact'
}
