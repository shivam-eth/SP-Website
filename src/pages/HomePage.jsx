import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronUp,
  Briefcase,
  Menu,
  X
} from 'lucide-react';

// Import components
import BlockchainBackground from '../components/BlockchainBackground';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ActivitiesSection from '../components/home/ActivitiesSection';
import GallerySection from '../components/home/GallerySection';

const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // Handle outside click for mobile menu
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-background text-foreground relative"
    >
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-50 glass-effect"
        ref={mobileMenuRef}
      >
        <div className="container-custom px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-lg md:text-xl lg:text-2xl font-bold gradient-text"
              >
                Shivam Pandiya
              </motion.h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">About</a>
              <a href="#activities" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">Activities</a>
              <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">Gallery</a>
              <Link
                to="/resume"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-3 py-2 lg:px-4 lg:py-2 rounded-full transition-all duration-300 hover-lift text-xs lg:text-sm"
              >
                Resume
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-3 pb-4 border-t border-border/20"
              >
                <div className="flex flex-col space-y-3 pt-4">
                  <a
                    href="#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    About
                  </a>
                  <a
                    href="#activities"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    Activities
                  </a>
                  <a
                    href="#gallery"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    Gallery
                  </a>
                  <Link
                    to="/resume"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-3 rounded-full transition-all duration-300 text-center text-sm mt-2"
                  >
                    Resume
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <HeroSection y={y} />
      <AboutSection />
      <ActivitiesSection />
      <GallerySection />

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95">
          <BlockchainBackground />
        </div>
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="gradient-text">Ready to Collaborate?</span>
            </motion.h2>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Let's build the next big blockchain innovation together.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/resume" onClick={() => window.scrollTo(0, 0)}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold glow-effect flex items-center gap-2 md:gap-3 mx-auto transition-all duration-300"
                >
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                  Check My Professional Resume
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-border py-6 md:py-8 text-center px-4 md:px-6">
        <div className="container-custom">
          <p className="text-muted-foreground text-sm md:text-base">&copy; {new Date().getFullYear()} Shivam Pandiya. All rights reserved.</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Crafted with passion and precision</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-primary hover:bg-primary/80 text-primary-foreground p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 z-50 glow-effect"
          >
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;
