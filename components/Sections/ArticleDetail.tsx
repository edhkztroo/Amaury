import React from 'react';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { Reveal } from '../UI/Reveal';
import { ARTICLES_ROUTE } from '../../constants';
import { Article } from '../../types';

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
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

          <div className="max-w-3xl space-y-8">
            {(article.content ?? []).map((paragraph, index) => (
              <Reveal key={`${article.id}-${index}`} delay={0.12 + index * 0.05}>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
