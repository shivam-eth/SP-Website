import { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)');
    setEnabled(fine.matches);
    const onChange = (e) => setEnabled(e.matches);
    fine.addEventListener('change', onChange);
    return () => fine.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onOver = (e) => {
      const el = e.target;
      if (!el?.closest) return;
      const interactive = el.closest('a, button, [role="button"], input, textarea, label, .cursor-target');
      setHovering(Boolean(interactive));
    };

    let rafId;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 2.4 : 1})`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, [enabled, hovering]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: '#EAE6DD',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          border: '1px solid rgba(234, 230, 221, 0.35)',
          mixBlendMode: 'difference',
          transition: 'width 320ms cubic-bezier(0.16,1,0.3,1), height 320ms cubic-bezier(0.16,1,0.3,1), border-color 320ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </>
  );
};

export default Cursor;
