import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Reveal } from '../UI/Reveal';
import { TEXT_CONTENT, SectionId } from '../../constants';

const Film: React.FC = () => {
  const { title, role, description, cta } = TEXT_CONTENT.film;
  const [logoError, setLogoError] = useState(false);

  return (
    <section id={SectionId.FILM} className="relative py-32 bg-black text-white overflow-hidden">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" 
          alt="Film Set" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <Reveal>
             <div className="inline-block px-3 py-1 border border-red-600 text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                {role}
             </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Logo Image Replacement */}
            <img 
                src="/logo-hijos-revolucion.png" 
                alt={title}
                className={`w-full max-w-[500px] mb-8 h-auto object-contain transition-opacity duration-500 ${logoError ? 'hidden' : 'block'}`}
                onError={() => setLogoError(true)}
            />

            {/* Fallback Text if Logo is missing */}
            {logoError && (
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 leading-tight">
                {title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                ))}
                </h2>
            )}
          </Reveal>
          
          <Reveal delay={0.2}>
              <div className="flex items-center gap-4 my-8 text-yellow-500">
                 {[1,2,3,4,5].map(i => (
                     <span key={i} className="text-xl">★</span>
                 ))}
                 <span className="text-gray-400 text-sm ml-2 uppercase tracking-widest">19 Lauros Internacionales</span>
              </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="prose prose-invert prose-lg text-gray-300 mb-10 font-light">
                {description.split('\n\n').map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-6">
                <button className="flex items-center gap-3 px-8 py-4 bg-brand-red text-white font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
                    <Play size={20} fill="currentColor" />
                    <span>Ver Trailer</span>
                </button>
                <button className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    {cta}
                </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Censored Banner Effect */}
      <div className="absolute bottom-10 right-0 bg-brand-red px-10 py-2 transform -rotate-3 shadow-lg hidden lg:block">
        <p className="text-white font-bold uppercase tracking-[0.5em] text-sm">Censurado en Venezuela</p>
      </div>
    </section>
  );
};

export default Film;