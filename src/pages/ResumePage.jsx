import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import resumePDF from '../assets/Shivam_Pandiya_Resume.pdf';
import {
  summary,
  experiences,
  projects,
  skills,
  education,
  certifications,
} from '../data/resumeData';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
];

const ResumePage = () => {
  const [active, setActive] = useState('summary');
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const y = window.scrollY + 220;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(s.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.r-block').forEach((el) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-background text-foreground"
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          scrolled ? 'bg-background/85 backdrop-blur-md border-b border-[var(--hairline)]' : 'bg-transparent'
        }`}
      >
        <div className="container-edge h-16 md:h-20 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <a
            href={resumePDF}
            download="Shivam_Pandiya_Resume.pdf"
            className="inline-flex items-center gap-2 text-sm accent-link"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* Document */}
      <article className="container-edge pt-32 md:pt-40 pb-32">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Sticky side nav */}
          <aside className="hidden lg:block col-span-3">
            <div className="sticky top-32">
              <p className="eyebrow mb-6">Contents</p>
              <ul className="space-y-3">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => goTo(s.id)}
                      className={`group flex items-center gap-3 text-sm transition-colors ${
                        active === s.id
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span
                        className={`block h-px transition-all duration-500 ${
                          active === s.id
                            ? 'w-10 bg-accent'
                            : 'w-4 bg-[var(--hairline-strong)] group-hover:w-6'
                        }`}
                      />
                      <span>{s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="hairline my-10" />

              <div className="space-y-2 text-sm">
                <a href="mailto:shivampan98@gmail.com" className="block text-muted-foreground hover:text-foreground">
                  shivampan98@gmail.com
                </a>
                <a href="https://linkedin.com/in/shivam-sot" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground">
                  LinkedIn ↗
                </a>
                <a href="https://x.com/ShivamPandiya3" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground">
                  Twitter ↗
                </a>
              </div>
            </div>
          </aside>

          {/* Body */}
          <div className="col-span-12 lg:col-span-9">
            {/* Masthead */}
            <header className="r-block mb-20">
              <p className="eyebrow mb-6">Curriculum vitae · 2026</p>
              <h1 className="display-xl text-foreground">
                Shivam <em className="serif text-accent">Pandiya</em>.
              </h1>
              <p className="mt-6 text-muted-foreground max-w-[44ch]">
                Product manager · Protocol-layer focus · Chandigarh, IN
              </p>
            </header>

            {/* Summary */}
            <section id="summary" className="r-block mb-24 scroll-mt-32">
              <SectionTitle index="01" label="Summary" />
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-[68ch]">
                {summary}
              </p>
            </section>

            {/* Experience */}
            <section id="experience" className="r-block mb-24 scroll-mt-32">
              <SectionTitle index="02" label="Experience" />
              <ul className="space-y-12 md:space-y-16">
                {experiences.map((exp) => (
                  <li key={exp.company} className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {exp.duration}
                      </p>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">
                        {exp.location}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <h3 className="text-2xl md:text-3xl text-foreground tracking-tight">
                        {exp.position}
                        <span className="block text-muted-foreground text-base font-mono uppercase tracking-wider mt-2">
                          {exp.company}
                        </span>
                      </h3>
                      <ul className="mt-6 space-y-3">
                        {exp.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex gap-4 text-foreground/80 leading-relaxed text-[15px] md:text-base max-w-[64ch]"
                          >
                            <span className="font-mono text-xs text-muted-foreground mt-2 shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Projects */}
            <section id="projects" className="r-block mb-24 scroll-mt-32">
              <SectionTitle index="03" label="Projects" />
              <ul className="divide-y divide-[var(--hairline)]">
                {projects.map((p) => (
                  <li key={p.name} className="py-8 md:py-10">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-4">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-baseline gap-2 text-xl md:text-2xl text-foreground"
                        >
                          {p.name}
                          {p.link && p.link !== '#' && (
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                          )}
                        </a>
                        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          {p.description}
                        </p>
                      </div>
                      <ul className="col-span-12 md:col-span-8 space-y-2 text-foreground/80 leading-relaxed text-[15px] md:text-base max-w-[60ch]">
                        {p.features.map((f, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-muted-foreground">—</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section id="skills" className="r-block mb-24 scroll-mt-32">
              <SectionTitle index="04" label="Skills" />
              <div className="space-y-10 md:space-y-12">
                {skills.map((group) => (
                  <div key={group.category}>
                    <div className="flex items-baseline gap-4 mb-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {group.category}
                      </p>
                      <span className="hairline flex-1" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
                        {String(group.items.length).padStart(2, '0')} items
                      </p>
                    </div>
                    <div className="flex flex-wrap">
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="border border-[var(--hairline)] -ml-px -mt-px px-4 py-2.5 text-[13px] md:text-sm text-foreground/85 font-mono tracking-wide hover:bg-[rgba(255,255,255,0.025)] hover:border-[var(--hairline-strong)] transition-colors duration-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section id="certifications" className="r-block mb-24 scroll-mt-32">
              <SectionTitle index="05" label="Certifications" />
              <ul className="divide-y divide-[var(--hairline)]">
                {certifications.map((c) => (
                  <li key={c.name} className="py-5 grid grid-cols-12 gap-6 items-baseline">
                    <span className="col-span-12 md:col-span-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {c.tag}
                    </span>
                    <span className="col-span-12 md:col-span-7 text-foreground/90 text-base">
                      {c.name}
                    </span>
                    <span className="col-span-12 md:col-span-3 md:text-right text-sm text-muted-foreground">
                      {c.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Education */}
            <section id="education" className="r-block mb-24 scroll-mt-32">
              <SectionTitle index="06" label="Education" />
              <ul className="divide-y divide-[var(--hairline)]">
                {education.map((e) => (
                  <li key={e.degree} className="py-5 grid grid-cols-12 gap-6 items-baseline">
                    <span className="col-span-12 md:col-span-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {e.year}
                    </span>
                    <span className="col-span-12 md:col-span-6 text-foreground/90 text-base">
                      {e.degree}
                    </span>
                    <span className="col-span-12 md:col-span-3 md:text-right text-sm text-muted-foreground">
                      {e.institution} · {e.location}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* End */}
            <div className="r-block pt-12 border-t border-[var(--hairline)] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span>End of document</span>
              <a href={resumePDF} download="Shivam_Pandiya_Resume.pdf" className="accent-link">
                Download PDF ↓
              </a>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

const SectionTitle = ({ index, label }) => (
  <div className="flex items-end justify-between mb-10 md:mb-12">
    <h2 className="display-lg text-foreground">
      <span className="font-serif italic text-accent text-[0.6em] align-baseline mr-3">{index}</span>
      {label}
    </h2>
    <span className="hairline flex-1 ml-8 mb-3" />
  </div>
);

export default ResumePage;
