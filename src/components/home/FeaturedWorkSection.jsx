import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const alsoProjects = [
  {
    name: 'Vine Labs',
    emphasis: 'Layer-0 · interoperability',
    body: 'Modular cross-chain functionality for metaverse applications.',
    link: 'https://www.vinelayer0.com/',
  },
  {
    name: 'Vuelo',
    emphasis: 'GenAI healthcare assistant',
    body: 'Fine-tuned LLMs on curated medical context; safe-response and fallback design.',
    link: '#',
  },
];

const projects = [
  {
    n: '01',
    name: 'Qubetics',
    emphasis: 'Layer-1',
    role: 'Product Manager',
    year: '2024',
    outcome:
      'Defined product flows for chain abstraction, validator roles, staking logic, and early dVPN. Translated protocol constraints into intuitive UI behaviours and safe-guard checks.',
    tags: ['Chain abstraction', 'DePIN', 'Tokenomics'],
    link: 'https://www.qubetics.com/',
  },
  {
    n: '02',
    name: '5irechain',
    emphasis: 'Mainnet',
    role: 'Product Owner',
    year: '2022 — 2025',
    outcome:
      'Owned ecosystem product surfaces — staking, governance, bridge, wallets, developer tooling. Mainnet launch landed 100M+ transactions in month one on a Rust-based Substrate chain.',
    tags: ['Substrate', 'Bridges', 'Wallets'],
    link: 'https://5ire.org',
  },
  {
    n: '03',
    name: 'BlockDAG',
    emphasis: 'Mobile',
    role: 'Product Manager',
    year: '2023',
    outcome:
      'Reworked onboarding and mining UX flows. v2 release shipped with ~35% lift in app installs and a noticeably cleaner first-run path.',
    tags: ['Mobile', 'Mining UX'],
    link: 'https://blockdag.network/',
  },
  {
    n: '04',
    name: 'Tomi',
    emphasis: 'DePIN',
    role: 'Product Manager',
    year: '2023',
    outcome:
      'Designed dashboard UX for usage tracking, billing, developer APIs, and lifecycle management of decentralized hosting and storage.',
    tags: ['DePIN', 'Storage', 'APIs'],
    link: 'https://tomi.com/storage',
  },
];

const protocols = [
  'Substrate', 'Cosmos SDK', 'EVM', 'Hyperledger', 'Corda',
  'CertiK', 'Hacken', 'Rust', 'ZK', 'MEV-aware',
];

const FeaturedWorkSection = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-row').forEach((row) => {
        gsap.from(row, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
        });
      });

      gsap.from('.work-header > *', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.work-header',
          start: 'top 80%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="featured-work" ref={rootRef} className="relative py-14 md:py-20">
      <div className="container-edge">
        {/* Header */}
        <div className="work-header grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <p className="eyebrow col-span-12 md:col-span-2">Selected</p>
          <div className="col-span-12 md:col-span-7">
            <h2 className="display-lg text-foreground">
              Work that <em className="serif text-accent">shipped</em>.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-[52ch] text-base md:text-lg">
              Four products, all in production. Selected for what they taught me about
              protocol-layer trade-offs, not for their headline numbers.
            </p>
          </div>
          <p className="hidden md:block eyebrow col-span-3 md:text-right">2021 — Now</p>
        </div>

        {/* Rows */}
        <div className="hairline" />
        <ul>
          {projects.map((p) => (
            <li key={p.n} className="work-row">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-10 md:py-12 border-b border-[var(--hairline)] hover:bg-[rgba(234,230,221,0.015)] transition-colors duration-300"
              >
                <div className="grid grid-cols-12 gap-6 items-start">
                  <span className="col-span-2 md:col-span-1 font-mono text-[13px] text-foreground/60 pt-2">
                    {p.n}
                  </span>

                  <div className="col-span-10 md:col-span-5">
                    <h3 className="display-lg leading-none text-foreground">
                      {p.name}
                      <span className="ml-3 font-serif italic text-muted-foreground text-[0.55em] align-middle">
                        {p.emphasis}
                      </span>
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12.5px] md:text-[13px] uppercase tracking-[0.12em] text-foreground/65">
                      {p.tags.map((t, i) => (
                        <span key={t} className="flex items-center gap-3">
                          {i > 0 && <span aria-hidden>·</span>}
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-5">
                    <p className="text-foreground/80 leading-relaxed text-base md:text-[17px] max-w-[48ch]">
                      {p.outcome}
                    </p>
                    <p className="mt-3 font-mono text-[13px] text-foreground/60">
                      {p.role} · {p.year}
                    </p>
                  </div>

                  <div className="hidden md:flex md:col-span-1 justify-end pt-2 text-muted-foreground group-hover:text-accent transition-colors duration-200">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Also — secondary project highlights */}
        <div className="mt-10 md:mt-14">
          <div className="hairline mb-8 md:mb-10" />
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <p className="eyebrow col-span-12 md:col-span-2">Also</p>
            <ul className="col-span-12 md:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {alsoProjects.map((p) => (
                <li key={p.name} className="work-row">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <h4 className="text-foreground text-xl md:text-2xl tracking-tight flex items-baseline gap-2 group-hover:text-accent transition-colors duration-200">
                      {p.name}
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h4>
                    <p className="mt-2 font-mono text-[12.5px] md:text-[13px] uppercase tracking-[0.12em] text-foreground/65">
                      {p.emphasis}
                    </p>
                    <p className="mt-4 text-foreground/75 leading-relaxed text-[15px] md:text-base max-w-[42ch]">
                      {p.body}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-24 md:mt-32">
          <div className="flex items-center justify-between mb-6">
            <p className="eyebrow">Stack & collaborators</p>
            <p className="eyebrow text-muted-foreground/60">passing through</p>
          </div>
          <div className="hairline" />
          <div className="overflow-hidden py-8">
            <div className="marquee font-serif italic text-muted-foreground text-2xl md:text-3xl">
              {[...protocols, ...protocols].map((p, i) => (
                <span key={i} className="flex items-center gap-16">
                  <span>{p}</span>
                  <span className="text-muted-foreground/30">/</span>
                </span>
              ))}
            </div>
          </div>
          <div className="hairline" />

          {/* Quiet CTA strip */}
          <div className="mt-10 md:mt-12 grid grid-cols-12 gap-6 items-baseline">
            <p className="col-span-12 md:col-span-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-[44ch]">
              Want the longer version — companies, scope, outcomes by year?
            </p>
            <div className="col-span-12 md:col-span-6 md:text-right flex md:justify-end gap-6 text-sm">
              <Link
                to="/resume"
                onClick={() => window.scrollTo(0, 0)}
                className="accent-link"
              >
                Read the résumé →
              </Link>
              <a
                href="mailto:shivampan98@gmail.com"
                className="ink-link text-muted-foreground hover:text-foreground"
              >
                Or get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
