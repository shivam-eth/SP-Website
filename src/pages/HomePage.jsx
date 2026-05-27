import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import HeroSection from '../components/home/HeroSection';
import FeaturedWorkSection from '../components/home/FeaturedWorkSection';
import AboutSection from '../components/home/AboutSection';
import NowSection from '../components/home/NowSection';
import OutsideSection from '../components/home/OutsideSection';

const navItems = [
  { href: '#featured-work', label: 'Work' },
  { href: '#about', label: 'How' },
  { href: '#now', label: 'Now' },
  { href: '#outside', label: 'Life' },
];

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-background text-foreground"
    >
      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          scrolled ? 'bg-background/85 backdrop-blur-md border-b border-[var(--hairline)]' : 'bg-transparent'
        }`}
      >
        <div className="container-edge h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm tracking-tight">
            <span className="text-foreground/90">Shivam Pandiya</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/resume"
              onClick={() => window.scrollTo(0, 0)}
              className="accent-link text-sm"
            >
              Resume
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-[var(--hairline)] bg-background/95 backdrop-blur-md overflow-hidden"
            >
              <div className="container-edge py-6 flex flex-col gap-4">
                {navItems.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base text-foreground/90"
                  >
                    {n.label}
                  </a>
                ))}
                <Link
                  to="/resume"
                  onClick={() => { window.scrollTo(0, 0); setMobileOpen(false); }}
                  className="text-base text-accent"
                >
                  Resume →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <HeroSection />
        <FeaturedWorkSection />
        <AboutSection />
        <NowSection />
        <OutsideSection />

        {/* Contact */}
        <section id="contact" className="relative py-16 md:py-24">
          <div className="container-edge">
            <div className="grid grid-cols-12 gap-6">
              <p className="eyebrow col-span-12 md:col-span-2">Contact</p>
              <div className="col-span-12 md:col-span-9 md:col-start-3">
                <h2 className="display-xl text-foreground max-w-[18ch]">
                  Open to roles where the <em className="serif text-accent">protocol layer</em> matters.
                </h2>
                <p className="mt-8 text-muted-foreground max-w-[52ch] text-lg leading-relaxed">
                  Mainnet-stage Layer-1s, infra teams, on-chain consumer products.
                  Permanent or contract. Remote, hybrid, or relocate for the right team.
                </p>
                <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-base">
                  <a href="mailto:shivampan98@gmail.com" className="accent-link">
                    shivampan98@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/shivam-sot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-link text-muted-foreground hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/ShivamPandiya3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-link text-muted-foreground hover:text-foreground"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--hairline)] py-10">
          <div className="container-edge flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <span className="pulse-dot" />
              <span>Shivam Pandiya — © {new Date().getFullYear()}</span>
            </div>
            <span>Last updated · {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};

export default HomePage;
