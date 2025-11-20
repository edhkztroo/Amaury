import React from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Biography from './components/Sections/Biography';
import Awards from './components/Sections/Awards';
import Books from './components/Sections/Books';
import Consulting from './components/Sections/Consulting';
import Film from './components/Sections/Film';
import Contact from './components/Sections/Contact';

function App() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <Biography />
      <Awards />
      <Books />
      <Consulting />
      <Film />
      <Contact />
    </main>
  );
}

export default App;