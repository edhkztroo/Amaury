import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../UI/Reveal';
import { TEXT_CONTENT, SectionId } from '../../constants';

const Consulting: React.FC = () => {
  const { name, subtitle, description, cta } = TEXT_CONTENT.consulting;

  return (
    <section id={SectionId.CONSULTING} className="py-32 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-gray-50 p-8 md:p-20 border-l-8 border-brand-red shadow-2xl relative overflow-hidden">
            
            {/* Watermark Background */}
            <div className="absolute -right-20 -top-20 text-[200px] font-serif font-bold text-brand-navy/5 select-none leading-none">AP</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <Reveal>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-navy mb-2">{name}</h2>
                        <p className="text-xl md:text-2xl text-brand-red font-light tracking-wide mb-8">{subtitle}</p>
                    </Reveal>
                    
                    <Reveal delay={0.2}>
                        <div className="h-1 w-24 bg-brand-navy mb-8"></div>
                    </Reveal>
                </div>

                <div>
                    <Reveal delay={0.3}>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            {description}
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <a href="#" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-navy text-white font-bold uppercase tracking-widest hover:bg-brand-red transition-colors duration-300 group">
                            <span>{cta}</span>
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </Reveal>
                </div>
            </div>

            {/* Stats/Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-gray-200 pt-12">
                <Reveal delay={0.5} className="text-center">
                    <h4 className="text-4xl font-bold text-brand-navy mb-2">10+</h4>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">Años de Experiencia</p>
                </Reveal>
                <Reveal delay={0.6} className="text-center border-l border-r border-gray-200">
                    <h4 className="text-4xl font-bold text-brand-navy mb-2">LATAM</h4>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">Alcance Regional</p>
                </Reveal>
                <Reveal delay={0.7} className="text-center">
                    <h4 className="text-4xl font-bold text-brand-navy mb-2">360°</h4>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">Estrategia Integral</p>
                </Reveal>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Consulting;