import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    n: 'i.',
    title: 'Protocol first, surface second',
    body: 'Most blockchain UX failure traces back to a leaky abstraction. I read the protocol spec before I sketch a flow.',
  },
  {
    n: 'ii.',
    title: 'Coordination is the work',
    body: 'Layer-1 launches are won by sequencing — security audits, exchange listings, validator onboarding, docs. The product is the calendar.',
  },
  {
    n: 'iii.',
    title: 'Write more than you ship',
    body: 'Memos clarify thinking, surface dissent, and outlast Slack threads. Every roadmap decision I make has a one-page memo behind it.',
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
              Three things I <em className="serif text-accent">don't</em> compromise on.
            </h2>

            <ol className="mt-16 md:mt-20 grid md:grid-cols-3 gap-10 md:gap-12">
              {principles.map((p) => (
                <li key={p.n} className="about-line">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-serif italic text-accent text-xl">{p.n}</span>
                    <span className="hairline flex-1" />
                  </div>
                  <h3 className="text-lg md:text-xl text-foreground font-medium tracking-tight mb-3">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px] max-w-[34ch]">
                    {p.body}
                  </p>
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
