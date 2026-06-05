import React, { useEffect, useRef } from 'react';

// Cursor-reactive grid backdrop for the hero.
// Cells light with a radial-gradient stroke as the cursor passes,
// then fade. Recolored to the indigo accent (#5E6AD2 → 94,106,210).
const ACCENT = '94, 106, 210';
const SQUARE = 80;
const MAX_ALPHA = 0.55;
const FADE_DELAY = 500; // ms before a lit cell starts fading
const FADE_STEP = 0.015;

const HeroGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let grid = [];
    let rafId;
    const mouse = { x: -9999, y: -9999 };

    const buildGrid = () => {
      grid = [];
      for (let x = 0; x < width; x += SQUARE) {
        for (let y = 0; y < height; y += SQUARE) {
          grid.push({ x, y, alpha: 0, fading: false, lastTouched: 0 });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const touchAt = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      mouse.x = x;
      mouse.y = y;
      const cell = grid.find(
        (c) => x >= c.x && x < c.x + SQUARE && y >= c.y && y < c.y + SQUARE
      );
      if (cell && cell.alpha === 0) {
        cell.alpha = MAX_ALPHA;
        cell.lastTouched = performance.now();
        cell.fading = false;
      }
    };

    const onMove = (e) => touchAt(e.clientX, e.clientY);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();

      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];

        if (cell.alpha > 0 && !cell.fading && now - cell.lastTouched > FADE_DELAY) {
          cell.fading = true;
        }
        if (cell.fading) {
          cell.alpha -= FADE_STEP;
          if (cell.alpha <= 0) {
            cell.alpha = 0;
            cell.fading = false;
          }
        }
        if (cell.alpha > 0) {
          const cx = cell.x + SQUARE / 2;
          const cy = cell.y + SQUARE / 2;
          const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, SQUARE);
          gradient.addColorStop(0, `rgba(${ACCENT}, ${cell.alpha})`);
          gradient.addColorStop(1, `rgba(${ACCENT}, 0)`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.3;
          ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, SQUARE - 1, SQUARE - 1);
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default HeroGrid;
