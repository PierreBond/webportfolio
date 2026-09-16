import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import LoadingScreen from './components/LoadingScreen';

const VALID_PATHS = ['/', '/index.html'];

const App: React.FC = () => {
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    if (!VALID_PATHS.includes(path)) {
      setNotFound(true);
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
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
      <LoadingScreen onComplete={handleLoadingComplete} />
      
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease-in-out' }}>
        <Navbar />
        
        <main className="flex-grow flex flex-col">
          <Hero className="-mt-16" ready={!loading} />
          <Expertise />
          <Projects />
          <About />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;