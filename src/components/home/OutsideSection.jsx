import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import cyclingImage from '../../assets/photo_2025-06-0718.12.07.jpeg';
import trekkingImage from '../../assets/photo_2025-06-0718.11.49.jpeg';
import readingImage from '../../assets/photo_2025-06-0718.12.04.jpeg';
import runningImage from '../../assets/marathon-tuffman-2024.jpeg';
import footballImage from '../../assets/football.png';

import gallery1 from '../../assets/photo_2025-06-0718.12.06.jpeg';
import gallery2 from '../../assets/photo_2025-06-0718.12.03.jpeg';
import gallery3 from '../../assets/photo_2025-06-0718.11.58.jpeg';
import gallery4 from '../../assets/photo_2025-06-0718.11.56.jpeg';
import gallery5 from '../../assets/photo_2025-06-0718.11.54.jpeg';
import gallery6 from '../../assets/puppy holding.png';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    n: 'i.',
    label: 'Cycling',
    stat: '50km+',
    unit: 'monthly',
    body: 'Long routes through hill country. Most product clarity arrives mid-ride, two hours in, no inbox.',
    image: cyclingImage,
    alt: 'On the road, somewhere outside the city',
    caption: 'Foothills · weekend route',
  },
  {
    n: 'ii.',
    label: 'Trekking',
    stat: '15+',
    unit: 'peaks',
    body: 'Hidden trails over marked ones. Elevation forces a longer time horizon — useful when roadmaps feel cramped.',
    image: trekkingImage,
    alt: 'On a ridge, mid-trek',
    caption: 'Himachal · ridge line',
  },
  {
    n: 'iii.',
    label: 'Marathons',
    stat: '12+',
    unit: 'finished',
    body: 'Endurance is a quieter skill than it looks. Pacing a 42k is closer to shipping a mainnet than to a sprint.',
    image: runningImage,
    alt: 'Tuffman Chandigarh Half Marathon, mid-race',
    caption: 'Tuffman Chandigarh · 2024',
    fit: 'contain',
  },
  {
    n: 'iv.',
    label: 'Football',
    stat: 'Weekly',
    unit: 'matches',
    body: 'Sunday side, midfield. A reminder that strategy without coordination is a slide deck.',
    image: footballImage,
    alt: 'Sunday side, on the pitch',
    caption: 'Sunday side · midfield',
  },
  {
    n: 'v.',
    label: 'Reading',
    stat: 'Daily',
    unit: 'ritual',
    body: 'Self-help on weekdays, rom-coms when the week is heavy. A quiet hour with a book is where most of my long-form thinking actually happens.',
    image: readingImage,
    alt: 'Off the grid, with a book',
    caption: 'Quiet hour · weekday evening',
    fit: 'contain',
  },
];

const fieldNotes = [
  { src: gallery1, alt: 'On the bike, somewhere outside the city', tag: 'Cycling · 01', fit: 'contain' },
  { src: gallery2, alt: 'Sunday side, on the pitch', tag: 'Pitch · 02' },
  { src: gallery3, alt: 'Run training', tag: 'Run · 03' },
  { src: gallery4, alt: 'Team sport, off the clock', tag: 'Match · 04' },
  { src: gallery5, alt: 'Outdoor frame', tag: 'Field · 05' },
  { src: gallery6, alt: 'Holding a puppy, soft afternoon', tag: 'Puppy · 06', fit: 'contain' },
];

const OutsideSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.outside-line', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });

      gsap.utils.toArray('.outside-row').forEach((row) => {
        gsap.from(row, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
        });
      });

      gsap.from('.field-frame', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.field-grid', start: 'top 85%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="outside" ref={ref} className="relative py-14 md:py-20">
      <div className="container-edge">
        {/* Heading */}
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <p className="eyebrow col-span-12 md:col-span-2 outside-line">Life, lately</p>
          <div className="col-span-12 md:col-span-9 md:col-start-3">
            <h2 className="display-lg text-foreground max-w-[20ch] outside-line">
              What keeps me <em className="serif text-accent">moving</em>.
            </h2>
            <p className="mt-8 text-muted-foreground max-w-[58ch] text-lg leading-relaxed outside-line">
              The parts of the week that don't sit on a Linear board. They shape how I think about pacing,
              coordination, and what's actually worth pushing through — long rides, long trails, long runs.
            </p>
          </div>
        </div>

        {/* Alternating activity rows */}
        <div className="space-y-16 md:space-y-20">
          {activities.map((a, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={a.label} className="outside-row grid grid-cols-12 gap-6 md:gap-10 items-center">
                <figure
                  className={`col-span-12 md:col-span-6 ${
                    reversed ? 'md:order-2 md:col-start-7' : 'md:col-start-1'
                  }`}
                >
                  <div className="activity-frame relative overflow-hidden border border-[var(--hairline)] bg-[#0A0A0C]">
                    <img
                      src={a.image}
                      alt={a.alt}
                      loading="lazy"
                      className={`block w-full h-[420px] md:h-[520px] ${
                        a.fit === 'contain' ? 'object-contain' : 'object-cover'
                      }`}
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between font-mono text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-foreground/60">
                    <span>{a.caption}</span>
                    <span>Plate · {String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>

                <div
                  className={`col-span-12 md:col-span-5 ${
                    reversed ? 'md:order-1 md:col-start-2' : 'md:col-start-8'
                  }`}
                >
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="font-serif italic text-accent text-2xl">{a.n}</span>
                    <span className="hairline flex-1" />
                  </div>
                  <div className="flex items-baseline justify-between gap-6 mb-5">
                    <h3 className="text-2xl md:text-3xl text-foreground tracking-tight">
                      {a.label}
                    </h3>
                    <p className="leading-none whitespace-nowrap">
                      <span className="font-serif italic text-accent text-3xl md:text-4xl">
                        {a.stat}
                      </span>
                      <span className="ml-2 font-mono text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-foreground/60">
                        {a.unit}
                      </span>
                    </p>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-[15px] md:text-base max-w-[42ch]">
                    {a.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Field notes — contact sheet */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-12 gap-6 mb-10 md:mb-12">
            <p className="eyebrow col-span-6 md:col-span-3 outside-line">Field notes</p>
            <p className="col-span-12 md:col-span-6 md:col-start-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-[52ch] outside-line">
              A contact sheet from the last few months. Trails, race mornings, side projects on Sundays.
            </p>
            <p className="hidden md:block col-span-3 text-right eyebrow text-muted-foreground/70 outside-line">
              06 frames
            </p>
          </div>

          <div className="hairline mb-6" />

          <div className="field-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {fieldNotes.map((f, i) => (
              <figure key={i} className="field-frame relative overflow-hidden">
                <div className="relative border border-[var(--hairline)] overflow-hidden bg-[#0A0A0C]">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className={`block w-full h-48 md:h-64 ${
                      f.fit === 'contain' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-foreground/60">
                  <span>{f.tag}</span>
                  <span className="text-muted-foreground/50">2025</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutsideSection;
