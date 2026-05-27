import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const HEADLINE_LINES = [
  [
    { word: 'A', accent: false },
    { word: 'product', accent: false },
    { word: 'manager', accent: false },
  ],
  [
    { word: 'who', accent: false },
    { word: 'reads', accent: false },
    { word: 'the', accent: false },
  ],
  [
    { word: 'protocol', accent: true },
    { word: 'spec', accent: true },
    { word: 'first.', accent: false },
  ],
];

const HeroSection = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const splits = gsap.utils.toArray('.hero-char');
      if (reduce) {
        gsap.set(splits, { y: 0, opacity: 1 });
        gsap.set('.hero-reveal', { y: 0, opacity: 1 });
        return;
      }
      gsap.set(splits, { yPercent: 110, opacity: 0 });
      gsap.set('.hero-reveal', { y: 16, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(splits, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.018,
        delay: 0.15,
      })
        .to(
          '.hero-reveal',
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          '-=0.7'
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen flex flex-col"
    >
      {/* Top meta row */}
      <div className="container-edge pt-32 md:pt-36 grid grid-cols-12 gap-6 items-start">
        <div className="col-span-6 md:col-span-3 hero-reveal">
          <p className="eyebrow">Shivam Pandiya</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Product manager. Protocol-layer focus.
          </p>
        </div>
        <div className="hidden md:block md:col-span-6" />
        <div className="col-span-6 md:col-span-3 flex md:justify-end hero-reveal">
          <div className="inline-flex items-center gap-2 text-sm">
            <span className="pulse-dot" />
            <span className="text-muted-foreground">Open to new roles · 2026</span>
          </div>
        </div>
      </div>

      {/* Headline + subtext */}
      <div className="container-edge flex-1 flex items-center mt-12 md:mt-0">
        <div className="grid grid-cols-12 gap-6 w-full">
          <h1
            className="col-span-12 md:col-span-11 text-foreground font-medium"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              fontSize: 'clamp(2.25rem, 6.2vw, 5.5rem)',
            }}
          >
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={`${li}-${wi}`} className="inline-block">
                    {w.word.split('').map((ch, ci) => (
                      <span
                        key={`${li}-${wi}-${ci}`}
                        className="inline-block overflow-hidden align-baseline"
                        style={{ lineHeight: 1.02 }}
                      >
                        <span
                          className={`hero-char inline-block will-change-transform ${
                            w.accent ? 'font-serif italic text-accent' : ''
                          }`}
                        >
                          {ch}
                        </span>
                      </span>
                    ))}
                    {wi < line.length - 1 && (
                      <span
                        className="inline-block overflow-hidden align-baseline"
                        style={{ lineHeight: 1.02 }}
                      >
                        <span className="hero-char inline-block">{' '}</span>
                      </span>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="col-span-12 md:col-span-9 mt-8 md:mt-10 hero-reveal">
            <span
              className="font-serif italic text-foreground/85 leading-snug"
              style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)' }}
            >
              "Protocol is product. Everything else is paint."
            </span>
          </p>
        </div>
      </div>

      {/* Bottom meta row */}
      <div className="container-edge pb-16 md:pb-24 grid grid-cols-12 gap-6 md:gap-10 items-end">
        <div className="col-span-12 md:col-span-5 hero-reveal">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link
              to="/resume"
              onClick={() => window.scrollTo(0, 0)}
              className="accent-link"
            >
              Read resume →
            </Link>
            <a
              href="mailto:shivampan98@gmail.com"
              className="ink-link text-muted-foreground hover:text-foreground"
            >
              Say hi
            </a>
            <a
              href="https://linkedin.com/in/shivam-sot"
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link text-muted-foreground hover:text-foreground"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 hero-reveal">
          <div className="grid grid-cols-4 divide-x divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {[
              { n: '5', suffix: 'yrs', label: 'Shipping Web3' },
              { n: '100M', suffix: '+', label: 'Tx on launched L1' },
              { n: '120', suffix: '+', label: 'Engineers led' },
              { n: '8', suffix: '', label: 'Products shipped' },
            ].map((m) => (
              <div key={m.label} className="px-3 md:px-5 py-5 md:py-6">
                <p className="leading-none flex items-baseline gap-1">
                  <span className="font-serif italic text-accent text-4xl md:text-5xl">
                    {m.n}
                  </span>
                  {m.suffix && (
                    <span className="font-serif italic text-accent text-2xl md:text-3xl">
                      {m.suffix}
                    </span>
                  )}
                </p>
                <p className="mt-3 md:mt-4 font-mono text-[11px] md:text-[13px] uppercase tracking-[0.14em] text-foreground/65 leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
