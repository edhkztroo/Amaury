import React from 'react';
import { Reveal } from '../UI/Reveal';
import { TEXT_CONTENT, SectionId } from '../../constants';

const Biography: React.FC = () => {
  return (
    <section id={SectionId.BIO} className="py-24 md:py-32 bg-brand-gray relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-200 to-transparent opacity-50"></div>
      <div className="absolute -left-20 top-40 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image / Visual Column */}
          <div className="lg:col-span-5 relative">
            <Reveal width="100%" direction="right">
              <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto">
                <div className="absolute inset-0 border-2 border-brand-navy translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 bg-brand-navy overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                   {/* Placeholder for portrait */}
                   <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop"
                    alt="Amaury Mogollón Portrait"
                    className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply"></div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-navy mb-8">
                {TEXT_CONTENT.bio.title}<span className="text-brand-red">.</span>
              </h2>
            </Reveal>
            
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700 font-light">
              {TEXT_CONTENT.bio.text.split('\n\n').map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.1} direction="up">
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-12">
               <div className="flex flex-wrap gap-4">
                 <div className="px-6 py-3 bg-white border border-gray-200 shadow-sm text-sm font-bold text-brand-navy uppercase tracking-wider">MAICOP</div>
                 <div className="px-6 py-3 bg-white border border-gray-200 shadow-sm text-sm font-bold text-brand-navy uppercase tracking-wider">IAPC</div>
                 <div className="px-6 py-3 bg-white border border-gray-200 shadow-sm text-sm font-bold text-brand-navy uppercase tracking-wider">ALACOP</div>
                 <div className="px-6 py-3 bg-white border border-gray-200 shadow-sm text-sm font-bold text-brand-navy uppercase tracking-wider">AVENCOPOL</div>
               </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Biography;