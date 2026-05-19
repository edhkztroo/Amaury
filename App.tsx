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
import { AppRoute, SectionId } from './types';

const getHash = () => window.location.hash;

const getRouteFromHash = (hash: string): AppRoute => {
  if (hash.startsWith('#/articulos/')) {
    return 'article-detail';
  }

  if (hash.startsWith('#/articulos')) {
    return 'articles';
  }

  return 'home';
};

const getArticleSlugFromHash = (hash: string) => {
  if (!hash.startsWith('#/articulos/')) {
    return null;
  }

  return hash.replace('#/articulos/', '').trim() || null;
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
  const [currentHash, setCurrentHash] = useState(getHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(getHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentRoute = useMemo(() => getRouteFromHash(currentHash), [currentHash]);
  const currentArticle = useMemo(() => {
    const slug = getArticleSlugFromHash(currentHash);

    if (!slug) {
      return null;
    }

    return ARTICLES.find((article) => article.slug === slug) ?? null;
  }, [currentHash]);

  useEffect(() => {
    if (!currentHash || currentHash.startsWith('#/')) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const targetId = currentHash.replace('#', '');
    let attempts = 0;

    const tryScroll = () => {
      const found = scrollToSection(targetId);
      attempts += 1;

      if (!found && attempts < 8) {
        window.requestAnimationFrame(tryScroll);
      }
    };

    window.requestAnimationFrame(tryScroll);
  }, [currentHash, currentRoute]);

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar currentRoute={currentRoute} />
      {currentRoute === 'article-detail' && currentArticle ? (
        <>
          <ArticleDetail article={currentArticle} />
          <Contact />
        </>
      ) : currentRoute === 'articles' ? (
        <>
          <Articles />
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
