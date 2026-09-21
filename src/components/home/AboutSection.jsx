import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    n: '01',
    label: 'Chose reliability',
    body: 'A year into Instanodes the backlog held two quarters of customer requests. Analytics, API management, billing, a richer console. Before committing, I went back through our sales calls and separated what customers asked for from what they actually asked about when deciding to buy. The lists barely overlapped. Buying conversations were about uptime and what happened when a chain broke. I chose reliability and told the customers who had asked that their requests were deferred, with reasoning. Demos stopped stalling. Conversion improved. Two premium services became sellable that had not been before.',
    aside:
      'I argued from conversation notes rather than instrumented data. I define the metric before making the case now.',
  },
  {
    n: '02',
    label: 'Shipped less',
    body: 'Vuelo was scoped as a full GenAI assistant for clinicians. I cut the first release to two capabilities, prescription generation and history summarisation, and shipped months earlier. The feedback we got from real clinical use reshaped the roadmap more usefully than another quarter of building would have.',
  },
  {
    n: '03',
    label: 'Bought instead of built',
    body: 'We needed product analytics. Building it in-house would have taken engineering off customer-facing work for a quarter. I recommended integrating existing tooling instead. Measurement went live early and the team stayed on the roadmap. Not every capability needs to be ours.',
  },
  {
    n: '04',
    label: 'Designed the incentive',
    body: 'A client exchange had a thin order book and the obvious fix was paying for market-making capacity. I designed a points-based trading competition instead. It produced $1.1M in trading volume and 1,000 to 1,500 active users inside three months, at a fraction of what liquidity provision would have cost.',
  },
];

const AboutSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-line', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-14 md:py-20">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6">
          <p className="eyebrow col-span-12 md:col-span-2 about-line">How I work</p>

          <div className="col-span-12 md:col-span-9 md:col-start-3">
            <h2 className="display-lg text-foreground max-w-[16ch] about-line">
              Four calls I'd <em className="serif text-accent">make again</em>.
            </h2>

            {/* Two columns rather than three: these are decision stories, not
                one-line principles, and they need the measure to stay readable. */}
            <ol className="mt-16 md:mt-20 grid md:grid-cols-2 gap-12 md:gap-x-14 md:gap-y-16">
              {principles.map((p) => (
                <li key={p.n} className="about-line">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-serif italic text-accent text-xl">{p.n}</span>
                    <span className="hairline flex-1" />
                  </div>
                  <h3 className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-foreground/70 mb-4">
                    {p.label}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-[52ch]">
                    {p.body}
                  </p>
                  {p.aside && (
                    <p className="mt-5 pl-4 border-l border-[var(--hairline-strong)] text-muted-foreground/80 leading-relaxed text-[14px] md:text-[15px] max-w-[50ch]">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/55">
                        What I would do differently
                      </span>
                      <br />
                      {p.aside}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
