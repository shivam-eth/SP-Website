import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

/* An external link carries a small arrow as an icon. It is never appended to
   the link text. */
export function ExternalIcon() {
  return (
    <svg className="ext" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <path d="M3 1.5h5.5V7M8.5 1.5 1.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function External({ href, children, className = 'link' }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalIcon />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

export function SiteHeader({ children }) {
  const scrolled = useScrolled();
  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="wrap site-header__inner">
        <Link to="/" className="site-header__name">
          Shivam Pandiya
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          {children}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const updated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner meta">
        <span>© {new Date().getFullYear()} Shivam Pandiya</span>
        <span>Last updated {updated}</span>
      </div>
    </footer>
  );
}

/* A claim, and the evidence that proves it. Hovering or focusing either end
   lights the marked sentence and the figure beside it. */
export function Claim({ parts, notes, children }) {
  return (
    <div className="claim">
      <div className="claim__text">
        {children ?? (
          <p>
            {parts.map((part, i) =>
              typeof part === 'string' ? part : <mark key={i}>{part.mark}</mark>,
            )}
          </p>
        )}
      </div>
      {notes && notes.length > 0 && (
        <div className="claim__notes">
          {notes.map((n) => (
            <p className="note" key={n.figure || n.plain}>
              <span className={n.plain ? 'note__figure note__figure--plain' : 'note__figure'}>
                {n.figure || n.plain}
              </span>
              <span className="note__label meta">{n.label}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* A decision record, with an optional retrospective behind a disclosure. */
export function Call({ title, body, retro, level = 3 }) {
  const Heading = `h${level}`;
  return (
    <div className="call">
      <Heading className="h3">{title}</Heading>
      {body.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
      {retro && (
        <details className="retro">
          <summary>What I would do differently</summary>
          <p>{retro}</p>
        </details>
      )}
    </div>
  );
}
