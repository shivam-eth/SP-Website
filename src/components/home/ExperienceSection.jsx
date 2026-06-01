import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Product Manager',
    company: 'Antier Solutions',
    companyLink: 'https://www.antiersolutions.com/',
    period: 'Jun 2021 — Present',
    location: 'Chandigarh, IN',
    body:
      'End-to-end product delivery for Web3 platforms, DeFi applications, and exchanges. Coordinate roadmaps and releases across protocol, backend, DevOps, and wallet teams — 120+ engineers in total.',
  },
  {
    role: 'Product Owner',
    company: '5irechain',
    companyLink: 'https://5ire.org',
    period: 'Oct 2022 — Mar 2025',
    location: 'Remote',
    body:
      'Launched a Layer-1 that processed 100M+ transactions in its first month. Owned staking, governance, bridge, wallets, and developer tools.',
  },
  {
    role: 'Research Analyst',
    company: 'Sanghvi Consultancy',
    companyLink: '#',
    period: 'Oct 2020 — Mar 2021',
    location: 'Ahmedabad, IN',
    body:
      'Early-career analyst role. Automated client workflows in Excel and lifted site engagement through SEO and social experiments.',
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.exp-head > *', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.exp-head', start: 'top 80%' },
      });

      gsap.utils.toArray('.exp-row').forEach((row) => {
        gsap.from(row, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={ref} className="relative py-14 md:py-20">
      <div className="container-edge">
        {/* Header */}
        <div className="exp-head grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <p className="eyebrow col-span-12 md:col-span-2">Track record</p>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display-lg text-foreground">
              Where I've <em className="serif text-accent">done it</em>.
            </h2>
          </div>
        </div>

        {/* Rows */}
        <div className="hairline" />
        <ul>
          {experiences.map((e) => (
            <li key={`${e.company}-${e.period}`} className="exp-row">
              <div className="grid grid-cols-12 gap-6 py-10 md:py-12 border-b border-[var(--hairline)]">
                <div className="col-span-12 md:col-span-4">
                  <h3 className="text-2xl md:text-3xl text-foreground tracking-tight">
                    {e.role}
                  </h3>
                  <a
                    href={e.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent-link mt-2 inline-block text-base"
                  >
                    {e.company}
                  </a>
                </div>

                <div className="col-span-12 md:col-span-3 font-mono text-[12.5px] md:text-[13px] uppercase tracking-[0.12em] text-foreground/65 leading-relaxed">
                  <p>{e.period}</p>
                  <p className="mt-1">{e.location}</p>
                </div>

                <div className="col-span-12 md:col-span-5">
                  <p className="text-foreground/80 leading-relaxed text-base md:text-[17px] max-w-[52ch]">
                    {e.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperienceSection;
