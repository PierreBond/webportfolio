import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const VALID_PATHS = ['/', '/index.html'];

const App: React.FC = () => {
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (!VALID_PATHS.includes(path)) {
      setNotFound(true);
    }
  }, []);

  if (notFound) {
    return (
      <div className="relative min-h-screen flex flex-col font-sans bg-obsidian text-frost selection:bg-mint selection:text-obsidian">
        <NotFound />
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-obsidian text-frost selection:bg-mint selection:text-obsidian">
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        <Hero className="-mt-16" />
        <Expertise />
        <Projects />
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default App;
