import React from 'react';
import { BookOpen } from 'lucide-react';
import { Reveal } from '../UI/Reveal';
import { BOOKS, SectionId } from '../../constants';

const Books: React.FC = () => {
  return (
    <section id={SectionId.BOOKS} className="py-24 bg-brand-navy text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <div className="p-3 bg-brand-red rounded-full">
              <BookOpen size={24} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Publicaciones</h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-24">
          {BOOKS.map((book, index) => {
            const isPrimary = index === 0; // First book is main

            if (isPrimary) {
              // PRIMARY BOOK LAYOUT (Detailed, Large)
              return (
                <div key={book.id} className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                  {/* Cover Image */}
                  <Reveal width="100%" className="flex-1 max-w-md">
                    <div className="relative group perspective-1000 w-full max-w-[350px] mx-auto">
                        <div className="aspect-[2/3] w-full relative shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:-translate-x-4 border-r-4 border-black/20">
                           {/* Use Image or Fallback Color */}
                           <img 
                             src={book.coverImage} 
                             alt={book.title}
                             className="w-full h-full object-cover bg-gray-800" // bg-gray-800 as placeholder if image loads slow
                             onError={(e) => {
                               e.currentTarget.src = 'https://placehold.co/400x600/1e293b/FFF?text=COVER'; // Fallback during dev
                             }}
                           />
                           
                           {/* Reflection/Sheen */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-white/10 pointer-events-none"></div>
                        </div>
                        {/* Shadow */}
                        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/50 blur-xl rounded-full transform scale-y-50"></div>
                    </div>
                  </Reveal>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <Reveal delay={0.2}>
                      <p className="text-brand-red font-bold tracking-widest uppercase text-sm mb-2">{book.date}</p>
                      <h3 className="text-4xl md:text-5xl font-serif font-black mb-2">{book.title}</h3>
                      {book.subtitle && (
                        <h4 className="text-xl text-gray-400 mb-6 font-light italic">{book.subtitle}</h4>
                      )}
                      <p className="text-gray-300 leading-relaxed text-lg mb-8 max-w-xl">
                        "{book.description}"
                      </p>
                      <button className="text-white border-b border-brand-red hover:text-brand-red hover:border-white transition-colors pb-1 uppercase tracking-widest text-sm font-bold">
                        Leer reseña completa
                      </button>
                    </Reveal>
                  </div>
                </div>
              );
            } else {
              // SECONDARY BOOK LAYOUT (Compact, Less Relevant)
              return (
                <div key={book.id} className="border-t border-white/10 pt-12">
                   <Reveal>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      {/* Smaller Cover */}
                      <div className="w-32 md:w-40 flex-shrink-0 relative shadow-lg group">
                         <div className="aspect-[2/3] w-full overflow-hidden">
                           <img 
                             src={book.coverImage} 
                             alt={book.title}
                             className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                             onError={(e) => {
                               e.currentTarget.src = 'https://placehold.co/300x450/333/FFF?text=BOOK';
                             }}
                           />
                         </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                             <h3 className="text-2xl font-serif font-bold text-gray-200">{book.title}</h3>
                             <span className="text-brand-red text-xs font-bold uppercase tracking-wider border border-brand-red/30 px-2 py-0.5 rounded">{book.date}</span>
                          </div>
                          {book.subtitle && <p className="text-gray-400 text-sm mb-3 italic">{book.subtitle}</p>}
                          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-4">
                            {book.description}
                          </p>
                          <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                            Ver detalles &rarr;
                          </a>
                      </div>
                    </div>
                   </Reveal>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Books;