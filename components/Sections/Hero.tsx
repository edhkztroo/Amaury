import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TEXT_CONTENT, SectionId } from '../../constants';

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy">
      
      {/* Background Image with Parallax Effect (Simulated via CSS) */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
        {/* Texture background */}
        <img 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
          alt="Background Texture" 
          className="w-full h-full object-cover animate-slow-pan"
        />
      </div>

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-20 pt-20 h-full min-h-[80vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-end gap-12 h-full">
          
          {/* Text Content */}
          <div className="max-w-4xl pb-12 lg:pb-24">
            <div className="overflow-hidden mb-4">
               <h2 className="text-brand-red text-lg md:text-xl font-bold tracking-[0.2em] uppercase animate-[fadeInUp_1s_0.2s_both]">
                  {TEXT_CONTENT.hero.role}
               </h2>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white leading-[0.9] mb-10 animate-[fadeInUp_1s_0.4s_both]">
              AMAURY <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                MOGOLLÓN
              </span>
            </h1>

            <div className="flex items-center space-x-6 animate-[fadeInUp_1s_0.6s_both]">
              <a 
                href={`#${SectionId.CONTACT}`}
                className="group flex items-center gap-4 px-8 py-4 bg-white text-brand-navy font-bold text-lg tracking-widest hover:bg-brand-red hover:text-white transition-all duration-300"
              >
                <span>{TEXT_CONTENT.hero.cta}</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </a>
              
              <div className="hidden md:block w-32 h-[1px] bg-white/20"></div>
            </div>
          </div>

          {/* Person Image Placeholder Area - Explicitly Right Aligned */}
          <div className="hidden lg:flex relative h-full min-h-[600px] w-full flex-col justify-end items-end animate-[fadeInUp_1s_0.8s_both]">
             
             {/* Visual Placeholder: Visible only if image is NOT loaded */}
             {!imageLoaded && (
               <div className="absolute inset-0 border-2 border-dashed border-white/20 bg-white/5 rounded-xl flex flex-col items-center justify-center m-8 backdrop-blur-sm">
                  <div className="text-center p-6">
                    <p className="text-white font-bold mb-2 tracking-widest">ESPACIO PARA FOTO</p>
                    <p className="text-brand-red font-mono text-xs mb-4">/amaury-hero.png</p>
                    <div className="px-4 py-2 bg-brand-navy rounded text-white/50 text-xs">
                      Sube tu imagen PNG transparente <br/> a la carpeta raíz del proyecto.
                    </div>
                  </div>
               </div>
             )}

            <img 
              src="/amaury-hero.png" 
              alt="Amaury Mogollón" 
              className={`relative z-10 max-h-[85vh] w-auto object-contain drop-shadow-2xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                 maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                 WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                // If error, we ensure image is hidden so placeholder shows
                setImageLoaded(false);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

        </div>
      </div>

      {/* Decorative Elements - Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col items-center gap-3 opacity-70">
        <span 
          className="text-white text-[10px] font-bold tracking-[0.3em] uppercase" 
          style={{ writingMode: 'vertical-rl' }}
        >
          DESLIZA
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-red to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;