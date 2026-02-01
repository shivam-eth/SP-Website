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
import FeaturedWorkSection from '../components/home/FeaturedWorkSection';
import AboutSection from '../components/home/AboutSection';
import GallerySection from '../components/home/GallerySection';
import ActivitiesSection from '../components/home/ActivitiesSection';

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
              <a href="#featured-work" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">Work</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">About</a>
              <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base">Life</a>
              <Link
                to="/resume"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
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
                    href="#featured-work"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    Work
                  </a>
                  <a
                    href="#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    About
                  </a>
                  <a
                    href="#gallery"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  >
                    Life
                  </a>
                  <Link
                    to="/resume"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-3 rounded-full transition-all duration-300 text-center text-sm font-medium mt-2"
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
      <FeaturedWorkSection />
      <AboutSection />
      <GallerySection />
      <ActivitiesSection />

      {/* Call to Action */}
      <section className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Let's Build Together</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Available for product leadership roles in Web3, DeFi, and DePIN ecosystems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a href="mailto:shivampan98@gmail.com">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-primary/25"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </a>
              <Link to="/resume" onClick={() => window.scrollTo(0, 0)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-border hover:border-primary/50 text-foreground px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-card/50"
                >
                  <Briefcase className="w-4 h-4" />
                  View Resume
                </motion.button>
              </Link>
            </div>

            <p className="text-muted-foreground">
              <a href="mailto:shivampan98@gmail.com" className="text-primary hover:underline">shivampan98@gmail.com</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-12 px-4 md:px-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-semibold text-foreground mb-1">Shivam Pandiya</p>
              <p className="text-sm text-muted-foreground">Senior Web3 Product Manager</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://linkedin.com/in/shivam-sot" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                LinkedIn
              </a>
              <a href="https://x.com/ShivamPandiya3" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Twitter
              </a>
              <a href="mailto:shivampan98@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Email
              </a>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
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
