import React from 'react';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Clock3 } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { Reveal } from '../UI/Reveal';
import { ARTICLES_ROUTE } from '../../constants';
import { Article } from '../../types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'jimcmq0x';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const imageBuilder = imageUrlBuilder({ projectId, dataset });

interface ArticleDetailProps {
  article: Article;
  articles?: Article[];
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[1.05rem] md:text-[1.12rem] text-gray-700 leading-8">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl md:text-[2.35rem] font-serif font-bold text-brand-navy pt-6 leading-tight">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl md:text-[1.9rem] font-serif font-bold text-brand-navy pt-3 leading-tight">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-brand-red pl-6 italic text-gray-600 text-[1.05rem] md:text-[1.12rem] leading-8">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 text-[1.05rem] md:text-[1.12rem] text-gray-700 space-y-3 leading-8">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 text-[1.05rem] md:text-[1.12rem] text-gray-700 space-y-3 leading-8">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-red underline underline-offset-4 hover:text-brand-navy transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { _ref?: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className="my-10 md:my-12 overflow-hidden">
          <img
            src={imageBuilder.image(value).width(1400).fit('max').auto('format').url()}
            alt={value.alt || value.caption || ''}
            className="w-full rounded-[1.5rem] object-cover shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
          />
          {value.caption && (
            <figcaption className="mt-4 text-sm text-gray-500 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, articles = [] }) => {
  const hasPortableTextContent =
    Array.isArray(article.content) &&
    article.content.length > 0 &&
    typeof article.content[0] === 'object' &&
    article.content[0] !== null &&
    '_type' in article.content[0];
  const suggestedArticles = articles
    .filter((item) => item.id !== article.id)
    .slice(0, 4);

  return (
    <section className="min-h-screen pt-36 pb-24 md:pt-44 md:pb-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(170,28,45,0.08),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f7f7f7_100%)]"></div>
      <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-brand-red/5 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <a
            href={ARTICLES_ROUTE}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-navy/60 hover:text-brand-red transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Volver a artículos
          </a>
        </Reveal>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-14 items-start">
            <div>
              <Reveal delay={0.05}>
                <h1 className="max-w-4xl text-4xl md:text-6xl xl:text-[4.1rem] font-serif font-bold text-brand-navy leading-[0.95] mb-5">
                  {article.title}
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="max-w-3xl text-xl md:text-[1.7rem] font-serif text-gray-500 leading-snug mb-10">
                  {article.excerpt}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mb-10">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-red">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-400">Inicio / Artículos / {article.category}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-gray-200 py-4 text-sm text-gray-500">
                    <span className="font-medium text-brand-navy">Por Amaury Mogollón</span>
                    <span>{article.date}</span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={16} />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Reveal>

              {article.coverImage && (
                <Reveal delay={0.12} width="100%">
                  <div className="aspect-[16/8.5] overflow-hidden rounded-[1.75rem] mb-12 shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
                    <img src={article.coverImage} alt={article.title} className="h-full w-full object-cover" />
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.14} width="100%">
                <div className="max-w-3xl space-y-8">
                  {hasPortableTextContent ? (
                    <PortableText value={article.content as Array<Record<string, unknown>>} components={portableTextComponents} />
                  ) : (
                    (article.content as string[] | undefined)?.map((paragraph, index) => (
                      <p key={`${article.id}-${index}`} className="text-[1.05rem] md:text-[1.12rem] text-gray-700 leading-8">
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} width="100%" className="hidden xl:block">
              <aside className="sticky top-36 rounded-[1.5rem] border border-gray-200 bg-white/95 p-7 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-red mb-4">
                  Sugerencias
                </p>
                <h2 className="text-2xl font-serif font-bold text-brand-navy leading-tight mb-4">
                  Otros artículos
                </h2>
                {suggestedArticles.length > 0 ? (
                  <div className="space-y-5">
                    {suggestedArticles.map((suggestedArticle, index) => (
                      <article
                        key={suggestedArticle.id}
                        className={`pb-5 ${index !== suggestedArticles.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
                          {suggestedArticle.category}
                        </p>
                        <h3 className="text-lg font-serif font-bold leading-snug text-brand-navy">
                          <a
                            href={suggestedArticle.href ?? '#'}
                            className="transition-colors hover:text-brand-red"
                          >
                            {suggestedArticle.title}
                          </a>
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                          <span>{suggestedArticle.date}</span>
                          <span>{suggestedArticle.readTime}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-7 text-gray-600">
                    A medida que se publiquen nuevos artículos, aparecerán aquí como lecturas relacionadas.
                  </p>
                )}
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
