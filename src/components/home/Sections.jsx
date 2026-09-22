import { useEffect, useRef, useState } from 'react';
import { Claim, External } from '../Chrome';
import { build, contact, index } from '../../data/story';

import cyclingImage from '../../assets/photo_2025-06-0718.12.07.webp';
import trekkingImage from '../../assets/photo_2025-06-0718.11.49.webp';
import readingImage from '../../assets/photo_2025-06-0718.12.04.webp';
import runningImage from '../../assets/marathon-tuffman-2024.webp';
import footballImage from '../../assets/football.webp';
import gallery1 from '../../assets/photo_2025-06-0718.12.06.webp';
import gallery2 from '../../assets/photo_2025-06-0718.12.03.webp';
import gallery3 from '../../assets/photo_2025-06-0718.11.58.webp';
import gallery4 from '../../assets/photo_2025-06-0718.11.56.webp';
import gallery5 from '../../assets/photo_2025-06-0718.11.54.webp';
import gallery6 from '../../assets/puppy-holding.webp';

export function HowIBuild() {
  return (
    <section className="wrap section section--tight" aria-labelledby="build-title">
      <div className="section__head">
        <h2 id="build-title" className="h2">
          How I build
        </h2>
      </div>
      <div className="build">
        {build.map((b, i) => (
          <Claim key={i} parts={b.parts} notes={b.notes} />
        ))}
      </div>
    </section>
  );
}

export function WorkIndex() {
  return (
    <section className="wrap section section--tight" aria-labelledby="index-title">
      <div className="section__head">
        <h2 id="index-title" className="h2">
          Index
        </h2>
        <p className="prose">Every product on this page, and the ones that did not make the story.</p>
      </div>
      <table className="index">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">What I did</th>
            <th scope="col">When</th>
            <th scope="col">
              <span className="visually-hidden">Link</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {index.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.what}</td>
              <td>{row.when || ''}</td>
              <td>
                {row.href && (
                  <External href={row.href} className="link link--quiet">
                    {row.host}
                  </External>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* Content kept as written: the heading, the intro, every activity, stat,
   caption and alt. The numbered plates and frame counters are gone. */
const pursuits = [
  { label: 'Cycling', stat: '100km+ monthly', body: 'Long routes through hill country. Most product clarity arrives mid-ride, two hours in, no inbox.', image: cyclingImage, alt: 'On the road, somewhere outside the city', caption: 'Foothills, weekend route' },
  { label: 'Trekking', stat: '15+ peaks', body: 'Hidden trails over marked ones. Elevation forces a longer time horizon, useful when roadmaps feel cramped.', image: trekkingImage, alt: 'On a ridge, mid-trek', caption: 'Himachal, ridge line' },
  { label: 'Marathons', stat: '10+ finished', body: 'Endurance is a quieter skill than it looks. Pacing a 42k is closer to shipping a mainnet than to a sprint.', image: runningImage, alt: 'Tuffman Chandigarh Half Marathon, mid-race', caption: 'Tuffman Chandigarh, 2024', fit: 'contain' },
  { label: 'Football', stat: 'Weekly matches', body: 'Sunday side, midfield. A reminder that strategy without coordination is a slide deck.', image: footballImage, alt: 'Sunday side, on the pitch', caption: 'Sunday side, midfield' },
  { label: 'Reading', stat: 'Daily ritual', body: 'Self-help on weekdays, rom-coms when the week is heavy. A quiet hour with a book is where most of my long-form thinking actually happens.', image: readingImage, alt: 'Off the grid, with a book', caption: 'Quiet hour, weekday evening', fit: 'contain' },
];

const gallery = [
  { src: gallery1, alt: 'On the bike, somewhere outside the city', fit: 'contain' },
  { src: gallery2, alt: 'Sunday side, on the pitch' },
  { src: gallery3, alt: 'Run training' },
  { src: gallery4, alt: 'Team sport, off the clock' },
  { src: gallery5, alt: 'Outdoor frame' },
  { src: gallery6, alt: 'Holding a puppy, soft afternoon', fit: 'contain' },
];

export function OffTheClock() {
  return (
    <section id="life" className="wrap section" aria-labelledby="life-title">
      <div className="section__head">
        <h2 id="life-title" className="h2">
          What keeps me moving.
        </h2>
        <p className="prose">
          The parts of the week that don’t sit on a Linear board. They shape how I think about
          pacing, coordination, and what’s actually worth pushing through. Long rides, long trails,
          long runs.
        </p>
      </div>
      <ul className="pursuits">
        {pursuits.map((p) => (
          <li className="pursuit" key={p.label}>
            <figure>
              <div className="pursuit__photo">
                <img src={p.image} alt={p.alt} loading="lazy" decoding="async" data-fit={p.fit} />
              </div>
              <div className="pursuit__head">
                <h3 className="h3">{p.label}</h3>
                <span className="pursuit__stat">{p.stat}</span>
              </div>
              <p>{p.body}</p>
              <figcaption className="meta">{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="gallery">
        {gallery.map((g) => (
          <img key={g.alt} src={g.src} alt={g.alt} loading="lazy" decoding="async" data-fit={g.fit} />
        ))}
      </div>
    </section>
  );
}

/* Copy email says what it does, then says it happened. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <button type="button" className="button button--quiet" onClick={copy}>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="wrap section section--close contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="h2">
        Open to roles where the hard part is the product, not the pitch.
      </h2>
      <p className="prose">
        Product and platform roles across AI, fintech, and infrastructure. Enterprise products with
        real users and real constraints. Permanent or contract. Remote, hybrid, or relocate for the
        right team.
      </p>
      <div className="actions">
        <a className="button button--primary" href={`mailto:${contact.email}`}>
          Email me
        </a>
        <CopyEmail />
        <External href={contact.linkedin} className="link link--quiet">
          LinkedIn
        </External>
        <External href={contact.x} className="link link--quiet">
          X
        </External>
      </div>
      <p className="contact__address meta">{contact.email}</p>
    </section>
  );
}
