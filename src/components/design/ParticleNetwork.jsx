import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const GlowEffect = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: radial-gradient(
    ellipse at center bottom,
    rgba(0, 210, 150, 0.35) 0%,
    rgba(0, 210, 150, 0.2) 30%,
    rgba(0, 210, 150, 0) 70%
  );
  z-index: 0;
  pointer-events: none;
`;

const ParticleNetwork = ({ 
  particleColor = 'rgba(0, 210, 150, 0.7)', 
  lineColor = 'rgba(0, 210, 150, 0.25)', 
  particleCount = 80, 
  connectionDistance = 100,
  repelStrength = 0.05,
  particleSize = { min: 1.5, max: 3 }, 
  particleSpeed = 0.8 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const particlesRef = useRef([]);
  const glowHeightRef = useRef(250); 
  const lastMouseMoveRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height - glowHeightRef.current),
          vx: (Math.random() - 0.5) * particleSpeed, 
          vy: (Math.random() - 0.5) * particleSpeed, 
          radius: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
          color: particleColor
        });
      }
    };

    resizeCanvas();
    initParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseMoveRef.current < 16) return; 
      lastMouseMoveRef.current = now;
      
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleColor, particleSize, particleSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        particle.vx *= 0.98; 
        particle.vy *= 0.98; 
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
        if (particle.y < 0) particle.vy = -particle.vy;
        
        if (particle.y > canvas.height - glowHeightRef.current) {
          particle.vy = -Math.abs(particle.vy); 
          particle.y = canvas.height - glowHeightRef.current - 2; 
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {  
            const forceX = -dx * repelStrength / (dist || 1);
            const forceY = -dy * repelStrength / (dist || 1);
            particle.vx += forceX;
            particle.vy += forceY;
          }
        }
      });
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5 * (1 - dist / connectionDistance);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [lineColor, mousePosition, connectionDistance, repelStrength]);

  return (
    <>
      <CanvasContainer ref={containerRef}>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
      <GlowEffect />
    </>
  );
};

export default ParticleNetwork;
