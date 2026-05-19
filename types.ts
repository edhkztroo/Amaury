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
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  href?: string;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export type AppRoute = 'home' | 'articles';

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
