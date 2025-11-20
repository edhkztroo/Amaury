import React, { useRef } from 'react';
import { Trophy, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../UI/Reveal';
import { AWARDS, SectionId } from '../../constants';

const Awards: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll amount approx width of one card + gap
      const scrollAmount = 480; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id={SectionId.AWARDS} className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-8 mb-12">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy">
                Reconocimientos<span className="text-brand-red">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-brand-navy/60 font-medium tracking-widest uppercase text-sm mt-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-brand-red fill-current" />
                Excelencia & Estrategia
              </p>
            </Reveal>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className="p-4 rounded-full border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 group"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-4 rounded-full border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 group"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scrollable Row */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none' 
          }}
        >
            {AWARDS.map((award, index) => {
                return (
                    <div 
                      key={award.id} 
                      className="min-w-[85vw] md:min-w-[450px] snap-start h-full"
                    >
                      <Reveal 
                        delay={index * 0.1} 
                        className="h-full"
                      >
                          <div 
                              className={`
                                  relative w-full h-[400px] p-8 md:p-10
                                  flex flex-col justify-between
                                  overflow-hidden transition-all duration-500 ease-out
                                  hover:-translate-y-2 hover:shadow-2xl
                                  border select-none group
                                  bg-brand-navy border-brand-navy text-white
                              `}
                          >
                              {/* Metallic Gradient Background */}
                              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#0F2448] to-brand-navy z-0"></div>
                              
                              {/* Interactive Shine Effect */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                                  <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white/10 blur-md animate-[shine_1s_ease-in-out_infinite]"></div>
                              </div>

                              {/* Decorative Icon Background */}
                              <div className="absolute top-0 right-0 -mt-6 -mr-6 z-0 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                                  <Trophy className="w-40 h-40 text-amber-500" />
                              </div>

                              {/* Content */}
                              <div className="relative z-10 flex flex-col h-full">
                                  <div className="flex justify-between items-start mb-6">
                                      <div className="
                                          inline-flex items-center justify-center w-12 h-12 rounded-full border 
                                          border-amber-500/30 bg-amber-500/10 text-amber-400
                                          transition-all duration-500 group-hover:scale-110
                                      ">
                                          <Trophy size={20} />
                                      </div>
                                      
                                      <span className="
                                          px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full border
                                          border-amber-500/50 text-amber-400 bg-amber-900/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]
                                      ">
                                          {award.year}
                                      </span>
                                  </div>

                                  <div className="mt-auto">
                                      {/* Organization Name - Increased Size and Visibility */}
                                      <p className="text-sm font-bold tracking-[0.25em] uppercase mb-3 text-amber-200 opacity-90">
                                          {award.organization}
                                      </p>
                                      
                                      <Reveal delay={0.2}>
                                        <h3 className="font-serif font-bold leading-tight text-2xl md:text-3xl mb-4">
                                            {award.title}
                                        </h3>
                                      </Reveal>
                                      
                                      <div className="h-1 mt-4 transition-all duration-500 bg-amber-500/50 w-12 group-hover:w-full"></div>
                                  </div>
                              </div>
                          </div>
                      </Reveal>
                    </div>
                );
            })}
        </div>

        {/* CSS Keyframes for shine effect */}
        <style>{`
            @keyframes shine {
                0% { left: -100%; }
                100% { left: 200%; }
            }
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
        `}</style>
      </div>
    </section>
  );
};

export default Awards;