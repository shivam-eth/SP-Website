import React, { useEffect, useRef } from 'react';

const SwirlCursor = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.2;
        this.distance = 0;
        this.maxDistance = Math.random() * 50 + 20;
        
        // Blockchain-themed colors
        const colors = [
          'rgba(0, 212, 255, ', // Cyan
          'rgba(255, 102, 0, ',  // Orange
          'rgba(138, 43, 226, ', // Purple
          'rgba(50, 205, 50, ',  // Green
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Swirl motion
        this.angle += this.angleSpeed;
        this.distance += 0.5;
        
        const swirlX = Math.cos(this.angle) * (this.distance * 0.1);
        const swirlY = Math.sin(this.angle) * (this.distance * 0.1);
        
        this.x += this.speedX + swirlX * 0.1;
        this.y += this.speedY + swirlY * 0.1;
        
        this.life -= this.decay;
        this.size *= 0.99;
      }

      draw(ctx) {
        if (this.life <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.life;
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, this.color + '1)');
        gradient.addColorStop(0.5, this.color + '0.6)');
        gradient.addColorStop(1, this.color + '0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Create new particles
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(
          e.clientX + (Math.random() - 0.5) * 10,
          e.clientY + (Math.random() - 0.5) * 10
        ));
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw(ctx);
        
        // Remove dead particles
        if (particle.life <= 0 || particle.size < 0.1) {
          particles.splice(i, 1);
        }
      }
      
      // Limit particle count for performance
      if (particles.length > 100) {
        particles.splice(0, particles.length - 100);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SwirlCursor;

