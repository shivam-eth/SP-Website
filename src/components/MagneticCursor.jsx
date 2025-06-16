import React, { useEffect, useRef } from 'react';

const MagneticCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Update main cursor position
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;

      // Add to trail
      trailRef.current.push({ x, y, time: Date.now() });
      
      // Keep only recent trail points
      trailRef.current = trailRef.current.filter(
        point => Date.now() - point.time < 500
      );
    };

    const handleMouseEnter = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        cursor.style.transform = 'scale(2)';
        cursor.style.mixBlendMode = 'normal';
        cursor.style.background = 'rgba(0, 212, 255, 0.8)';
      }
    };

    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.mixBlendMode = 'difference';
      cursor.style.background = 'radial-gradient(circle, #00D4FF, #FF6B35)';
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="magnetic-cursor"
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        background: 'radial-gradient(circle, #00D4FF, #FF6B35)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'transform 0.1s ease',
      }}
    />
  );
};

export default MagneticCursor;

