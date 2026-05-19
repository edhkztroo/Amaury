import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ARTICLES_ROUTE, NAV_ITEMS, SectionId } from '../../constants';
import { AppRoute } from '../../types';

interface NavbarProps {
  currentRoute: AppRoute;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);

    if (!element) {
      return false;
    }

    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    return true;
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href.startsWith('#/')) {
      window.location.hash = href;
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const targetId = href.replace('#', '');

    if (currentRoute === 'home' && smoothScrollToSection(targetId)) {
      if (window.location.hash !== href) {
        window.history.replaceState(null, '', href);
      }
      return;
    }

    window.location.hash = href;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-brand-navy/90 backdrop-blur-lg border-b border-white/5 shadow-2xl' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href={`#${SectionId.HERO}`} 
          onClick={(e) => handleNavigation(e, `#${SectionId.HERO}`)}
          className="block transition-opacity hover:opacity-80"
        >
          {/* Logo Image - Make sure logo.svg exists in your public folder */}
          <img 
            src="/logo.svg" 
            alt="Amaury Mogollón" 
            className="h-9 w-auto md:h-10"
            onError={(e) => {
              // Fallback if image not found
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback Text hidden by default */}
          <span className="hidden text-2xl font-serif font-bold text-white tracking-tight">
            AMAURY MOGOLLÓN<span className="text-brand-red">.</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavigation(e, item.href)}
              className={`text-sm uppercase tracking-widest font-medium transition-colors relative group cursor-pointer ${
                item.href === ARTICLES_ROUTE && currentRoute === 'articles'
                  ? 'text-brand-red'
                  : 'text-gray-300 hover:text-brand-red'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-red transition-all duration-300 ${
                item.href === ARTICLES_ROUTE && currentRoute === 'articles'
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
          <a 
            href={`#${SectionId.CONTACT}`}
            onClick={(e) => handleNavigation(e, `#${SectionId.CONTACT}`)}
            className="px-6 py-2 bg-brand-red text-white text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            Contactar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-brand-navy z-40 flex flex-col justify-center items-center space-y-8 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'}`}>
           {NAV_ITEMS.map((item, idx) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavigation(e, item.href)}
              className={`text-3xl font-serif font-bold transition-colors cursor-pointer ${
                item.href === ARTICLES_ROUTE && currentRoute === 'articles'
                  ? 'text-brand-red'
                  : 'text-white hover:text-brand-red'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
