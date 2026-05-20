import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Biography from './components/Sections/Biography';
import Awards from './components/Sections/Awards';
import Books from './components/Sections/Books';
import Articles from './components/Sections/Articles';
import ArticleDetail from './components/Sections/ArticleDetail';
import Consulting from './components/Sections/Consulting';
import Film from './components/Sections/Film';
import Contact from './components/Sections/Contact';
import { ARTICLES } from './constants';
import { fetchSanityArticles, hasSanityConfig } from './lib/sanity';
import { applySeo } from './lib/seo';
import { AppRoute, Article, SectionId } from './types';

const getLocationState = () => ({
  pathname: window.location.pathname,
  hash: window.location.hash,
});

const getRouteFromPathname = (pathname: string): AppRoute => {
  if (pathname.startsWith('/articulos/')) {
    return 'article-detail';
  }

  if (pathname === '/articulos') {
    return 'articles';
  }

  return 'home';
};

const getArticleSlugFromPathname = (pathname: string) => {
  if (!pathname.startsWith('/articulos/')) {
    return null;
  }

  return pathname.replace('/articulos/', '').trim() || null;
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  const headerOffset = 100;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });

  return true;
};

function App() {
  const [locationState, setLocationState] = useState(getLocationState);
  const [articles, setArticles] = useState<Article[]>(ARTICLES);

  useEffect(() => {
    const updateLocationState = () => {
      setLocationState(getLocationState());
    };

    window.addEventListener('popstate', updateLocationState);
    window.addEventListener('hashchange', updateLocationState);
    updateLocationState();

    return () => {
      window.removeEventListener('popstate', updateLocationState);
      window.removeEventListener('hashchange', updateLocationState);
    };
  }, []);

  useEffect(() => {
    if (!hasSanityConfig) {
      return;
    }

    let cancelled = false;

    fetchSanityArticles()
      .then((items) => {
        if (!cancelled && items.length > 0) {
          setArticles(items);
        }
      })
      .catch((error) => {
        console.error('Error loading Sanity articles:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const currentRoute = useMemo(() => getRouteFromPathname(locationState.pathname), [locationState.pathname]);
  const currentArticle = useMemo(() => {
    const slug = getArticleSlugFromPathname(locationState.pathname);

    if (!slug) {
      return null;
    }

    return articles.find((article) => article.slug === slug) ?? null;
  }, [articles, locationState.pathname]);
  const shouldShowArticleDetail = currentRoute === 'article-detail' && currentArticle;

  useEffect(() => {
    applySeo({
      route: currentRoute,
      articles,
      article: currentArticle,
    });
  }, [articles, currentArticle, currentRoute]);

  useEffect(() => {
    if (currentRoute !== 'home' || !locationState.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const targetId = locationState.hash.replace('#', '');
    let attempts = 0;

    const tryScroll = () => {
      const found = scrollToSection(targetId);
      attempts += 1;

      if (!found && attempts < 8) {
        window.requestAnimationFrame(tryScroll);
      }
    };

    window.requestAnimationFrame(tryScroll);
  }, [locationState.hash, currentRoute]);

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar currentRoute={currentRoute} />
      {shouldShowArticleDetail ? (
        <>
          <ArticleDetail article={currentArticle} articles={articles} />
          <Contact />
        </>
      ) : currentRoute === 'articles' ? (
        <>
          <Articles articles={articles} />
          <Contact />
        </>
      ) : (
        <>
          <Hero />
          <Biography />
          <Awards />
          <Books />
          <Consulting />
          <Film />
          <Contact />
        </>
      )}
    </main>
  );
}

export default App;
