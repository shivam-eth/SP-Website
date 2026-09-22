import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const THEME_COLOR = { light: '#edf0eb', dark: '#1b2422' };

const readTheme = () =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

function applyTheme(theme, persist) {
  const root = document.documentElement;
  // Colours must land in one step. Links and figures carry colour transitions
  // for hover, and without this they would fade from the old palette to the
  // new one inside the reveal.
  root.classList.add('theme-switching');
  root.dataset.theme = theme;
  void getComputedStyle(root).color;
  setTimeout(() => root.classList.remove('theme-switching'), 0);
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute('content', THEME_COLOR[theme]);
  }
  if (persist) {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage can be unavailable in private windows. The theme still applies.
    }
  }
}

function hasStoredChoice() {
  try {
    const t = localStorage.getItem('theme');
    return t === 'light' || t === 'dark';
  } catch {
    return false;
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);
  const buttonRef = useRef(null);

  // Follow the system setting until the visitor makes a choice of their own.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (hasStoredChoice()) return;
      const next = e.matches ? 'dark' : 'light';
      applyTheme(next, false);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const commit = () => {
      applyTheme(next, true);
      setTheme(next);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce || !buttonRef.current) {
      commit();
      return;
    }

    // flushSync makes React commit inside the callback, so the new snapshot
    // already carries the new theme and the right icon.
    const transition = document.startViewTransition(() => flushSync(commit));
    try {
      await transition.ready;
    } catch {
      return;
    }

    const r = buttonRef.current.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 620,
        easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      ref={buttonRef}
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <mask id="moon-mask">
            <rect x="0" y="0" width="24" height="24" fill="#fff" />
            <circle className="moon-bite" cx="16.5" cy="8" r="5.2" fill="#000" />
          </mask>
        </defs>
        <circle className="sun-core" cx="12" cy="12" r="4.6" fill="currentColor" mask="url(#moon-mask)" />
        <g className="rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="1.8" x2="12" y2="4.2" />
          <line x1="12" y1="19.8" x2="12" y2="22.2" />
          <line x1="1.8" y1="12" x2="4.2" y2="12" />
          <line x1="19.8" y1="12" x2="22.2" y2="12" />
          <line x1="4.8" y1="4.8" x2="6.5" y2="6.5" />
          <line x1="17.5" y1="17.5" x2="19.2" y2="19.2" />
          <line x1="4.8" y1="19.2" x2="6.5" y2="17.5" />
          <line x1="17.5" y1="6.5" x2="19.2" y2="4.8" />
        </g>
      </svg>
    </button>
  );
}
