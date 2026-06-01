import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const now = [
  {
    label: 'Reading',
    body: 'Tokenized treasuries and credit. BlackRock BUIDL, Ondo, and how onchain settlement is bleeding into TradFi rails.',
  },
  {
    label: 'Building',
    body: 'Agent-to-agent payment gateway rails for the agentic economy. AgenticRPC underneath, powering autonomous payments between agents.',
  },
  {
    label: 'Thinking about',
    body: 'Chain abstraction is a UX problem dressed as an infra problem. Most teams ship it inside out. Also, how on-chain liquidity can move freely across chains without trading away consensus security or decentralization.',
  },
];

const NowSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.now-row', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const updated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <section id="now" ref={ref} className="relative py-14 md:py-20">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <p className="eyebrow col-span-6 md:col-span-2 now-row">Now</p>
          <div className="col-span-12 md:col-span-7 now-row">
            <h2 className="display-lg text-foreground">
              What I'm <em className="serif text-accent">on</em>, this season.
            </h2>
          </div>
          <p className="col-span-6 md:col-span-3 md:text-right eyebrow text-muted-foreground/70 now-row">
            Updated · {updated}
          </p>
        </div>

        <div className="hairline" />
        <ul>
          {now.map((n) => (
            <li key={n.label} className="now-row group">
              <div className="grid grid-cols-12 gap-6 py-8 md:py-10 border-b border-[var(--hairline)] transition-colors duration-300 group-hover:bg-[rgba(234,230,221,0.015)]">
                <p className="col-span-12 md:col-span-3 font-mono text-xs uppercase tracking-wider text-muted-foreground pt-1">
                  {n.label}
                </p>
                <p className="col-span-12 md:col-span-9 text-foreground/85 text-lg md:text-xl leading-relaxed max-w-[64ch]">
                  {n.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NowSection;
