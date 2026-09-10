import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Quote from './components/Quote';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-obsidian text-frost selection:bg-mint selection:text-obsidian">
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        <Hero />
        <Expertise />
        <Projects />
        <Quote />
      </main>

      <Footer />
    </div>
  );
};

export default App;
