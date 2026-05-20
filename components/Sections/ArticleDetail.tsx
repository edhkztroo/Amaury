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
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-navy pt-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-navy pt-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-brand-red pl-6 italic text-gray-600 text-lg md:text-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 text-lg md:text-xl text-gray-700 space-y-3">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 text-lg md:text-xl text-gray-700 space-y-3">{children}</ol>
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
        <figure className="my-10 overflow-hidden">
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

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const hasPortableTextContent =
    Array.isArray(article.content) &&
    article.content.length > 0 &&
    typeof article.content[0] === 'object' &&
    article.content[0] !== null &&
    '_type' in article.content[0];

  return (
    <section className="min-h-screen pt-36 pb-24 md:pt-44 md:pb-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(170,28,45,0.08),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f7f7f7_100%)]"></div>

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

        <div className="max-w-5xl mx-auto">
          {article.coverImage && (
            <Reveal width="100%">
              <div className="aspect-[16/8] overflow-hidden rounded-[2rem] mb-10 shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
                <img src={article.coverImage} alt={article.title} className="h-full w-full object-cover" />
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">
                {article.category}
              </span>
              <span className="text-sm text-gray-400">{article.date}</span>
              <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                <Clock3 size={16} />
                {article.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-navy leading-tight mb-6">
              {article.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {article.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.12} width="100%">
            <div className="max-w-3xl space-y-8">
              {hasPortableTextContent ? (
                <PortableText value={article.content as Array<Record<string, unknown>>} components={portableTextComponents} />
              ) : (
                (article.content as string[] | undefined)?.map((paragraph, index) => (
                  <p key={`${article.id}-${index}`} className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
