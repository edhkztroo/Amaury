import React from 'react';
import { Twitter, Instagram, Globe, Mail, ArrowRight } from 'lucide-react';
import { Reveal } from '../UI/Reveal';
import { SOCIAL_LINKS, SectionId } from '../../constants';

const SocialItem: React.FC<{ icon: React.ReactNode; label: string; handle: string; href: string; delay: number }> = ({ icon, label, handle, href, delay }) => (
  <Reveal delay={delay} width="100%">
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center justify-between w-full py-6 border-b border-gray-100 hover:border-brand-red transition-colors duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="text-brand-navy group-hover:text-brand-red transition-colors duration-300">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-brand-red transition-colors mb-1">{label}</p>
          <p className="text-lg font-serif font-black text-brand-navy group-hover:translate-x-2 transition-transform duration-300">{handle}</p>
        </div>
      </div>
      <ArrowRight className="text-gray-300 group-hover:text-brand-red opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
    </a>
  </Reveal>
);

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Sidebar: Social Networks */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-navy mb-2">Contacto<span className="text-brand-red">.</span></h2>
              <p className="text-gray-500 text-lg mb-12">Conecta a través de las plataformas digitales.</p>
            </Reveal>

            <div className="flex flex-col">
              <SocialItem 
                icon={<Twitter size={24} />} 
                label="Twitter / X" 
                handle={SOCIAL_LINKS.twitter} 
                href={`https://twitter.com/${SOCIAL_LINKS.twitter.replace('@', '')}`}
                delay={0.1}
              />
              <SocialItem 
                icon={<Instagram size={24} />} 
                label="Instagram" 
                handle={SOCIAL_LINKS.instagram} 
                href={`https://instagram.com/${SOCIAL_LINKS.instagram.replace('@', '')}`}
                delay={0.2}
              />
              <SocialItem 
                icon={<Globe size={24} />} 
                label="Website" 
                handle={SOCIAL_LINKS.web} 
                href={`https://${SOCIAL_LINKS.web}`}
                delay={0.3}
              />
              <SocialItem 
                icon={<Mail size={24} />} 
                label="Email" 
                handle="info@accionpolitica.com" 
                href="mailto:info@accionpolitica.com"
                delay={0.4}
              />
            </div>
          </div>

          {/* Right Side: Big CTA Card */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2} width="100%" className="h-full">
              <div className="relative w-full h-full min-h-[500px] bg-brand-navy text-white p-12 md:p-16 flex flex-col justify-between group overflow-hidden">
                
                {/* Background Texture & Glow */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red blur-[100px] rounded-full opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 group-hover:opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 blur-[100px] rounded-full opacity-10 pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

                {/* Content Top */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full mb-6 bg-white/5 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest">Agenda Abierta</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-serif font-black leading-tight mb-6">
                    Hablemos de <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 group-hover:to-white transition-all duration-500">
                      Estrategia & Poder
                    </span>.
                  </h3>
                </div>

                {/* Bottom Action */}
                <div className="relative z-10 mt-12">
                   <a 
                     href="mailto:info@accionpolitica.com"
                     className="block w-full group/btn"
                   >
                     <div className="flex items-center justify-between py-6 border-b border-white/20 group-hover/btn:border-white transition-colors duration-500">
                        <span className="text-xl md:text-2xl font-light tracking-wide group-hover/btn:translate-x-2 transition-transform duration-300">
                          Iniciar Conversación
                        </span>
                        <div className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center transform group-hover/btn:scale-110 group-hover/btn:rotate-[-45deg] transition-all duration-300 shadow-lg shadow-brand-red/50">
                           <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                     </div>
                   </a>
                </div>

              </div>
            </Reveal>
          </div>

        </div>

        {/* Minimal Footer */}
        <div className="mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} Amaury Mogollón</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-navy transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-brand-navy transition-colors">Privacidad</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;