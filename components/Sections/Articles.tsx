import React from 'react';
import { ArrowLeft, ArrowUpRight, Newspaper } from 'lucide-react';
import { Reveal } from '../UI/Reveal';
import { ARTICLES, SectionId } from '../../constants';

const Articles: React.FC = () => {
  const featuredArticle = ARTICLES.find((article) => article.featured) ?? ARTICLES[0];
  const secondaryArticles = ARTICLES.filter((article) => article.id !== featuredArticle?.id);

  return (
    <section id={SectionId.ARTICLES} className="min-h-screen pt-36 pb-24 md:pt-44 md:pb-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(170,28,45,0.08),_transparent_32%),linear-gradient(180deg,_#ffffff_0%,_#f7f7f7_100%)]"></div>
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-navy/5 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <a
            href={`#${SectionId.HERO}`}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-navy/60 hover:text-brand-red transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </a>
        </Reveal>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-end mb-16">
          <Reveal className="xl:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-brand-navy rounded-full">
                <Newspaper size={24} className="text-white" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-brand-red">
                Sección Editorial
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-navy leading-none">
              Artículos<span className="text-brand-red">.</span>
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
              Un interno editorial para publicar análisis, opinión y reflexiones sobre estrategia política, campañas, liderazgo y comunicación pública.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="xl:col-span-5">
            <div className="rounded-[1.75rem] border border-brand-navy/10 bg-white/80 backdrop-blur-sm p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4">
                Archivo vivo
              </p>
              <p className="text-3xl font-serif font-bold text-brand-navy mb-3">
                {ARTICLES.length} publicaciones
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cada tarjeta puede apuntar luego a su artículo completo. Por ahora este interno funciona como portada editorial del sitio.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {featuredArticle && (
            <Reveal width="100%" className="xl:col-span-7">
              <article className="h-full rounded-[2rem] bg-brand-navy text-white p-8 md:p-10 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] bg-white/10 rounded-full">
                    Destacado
                  </span>
                  <span className="text-sm uppercase tracking-[0.2em] text-white/60">
                    {featuredArticle.category}
                  </span>
                </div>

                <p className="text-sm uppercase tracking-[0.25em] text-brand-red font-bold mb-4">
                  {featuredArticle.date} · {featuredArticle.readTime}
                </p>
                <h3 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6">
                  {featuredArticle.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
                  {featuredArticle.excerpt}
                </p>

                <a
                  href={featuredArticle.href ?? '#'}
                  className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-white hover:text-brand-red transition-colors"
                >
                  Leer artículo
                  <ArrowUpRight size={18} />
                </a>
              </article>
            </Reveal>
          )}

          <div className="xl:col-span-5 grid gap-6">
            {secondaryArticles.map((article, index) => (
              <Reveal key={article.id} delay={0.15 + index * 0.08} width="100%">
                <article className="rounded-[1.75rem] border border-gray-200 bg-white/90 backdrop-blur-sm p-7 h-full hover:border-brand-red/40 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-brand-navy leading-tight mb-4">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between gap-4 pt-5 border-t border-gray-100">
                    <span className="text-sm uppercase tracking-[0.2em] text-gray-400">
                      {article.date}
                    </span>
                    <a
                      href={article.href ?? '#'}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-navy hover:text-brand-red transition-colors"
                    >
                      Ver más
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
