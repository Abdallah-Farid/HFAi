import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Parallax container that tracks scroll position
export const ParallaxContainer = ({ children, className }) => {
  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

// Floating element with parallax effect
export const FloatingElement = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  z-index: ${props => props.$zIndex || 0};
  filter: blur(${props => props.$blur || 0}px);
  opacity: ${props => props.$opacity || 0.5};
  mix-blend-mode: ${props => props.$blendMode || 'normal'};
  will-change: transform;
`;

// Parallax section that applies effects to its children
export const ParallaxSection = ({ children, intensity = 0.1 }) => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't apply parallax effects on mobile
  if (isMobile) {
    return <>{children}</>;
  }
  
  return (
    <div style={{ position: 'relative' }}>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        
        // Apply different parallax effects based on element position
        const yOffset = useTransform(
          scrollYProgress, 
          [0, 1], 
          [0, i % 2 === 0 ? 100 * intensity : -100 * intensity]
        );
        
        const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
        const yOffsetSpring = useSpring(yOffset, springConfig);
        
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            y: yOffsetSpring
          }
        });
      })}
    </div>
  );
};

// Parallax background element
export const ParallaxBackground = ({ children, scrollFactor = 0.15 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${scrollFactor * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + (scrollFactor * 0.2)]);
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        y,
        scale
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating orbs that move with parallax effect
export const ParallaxOrb = styled(FloatingElement)`
  width: ${props => props.$size || '150px'};
  height: ${props => props.$size || '150px'};
  border-radius: 50%;
  background: ${props => props.$gradient || 'linear-gradient(135deg, rgba(0, 210, 150, 0.2), rgba(120, 60, 220, 0.2))'};
  box-shadow: 0 0 80px ${props => props.$glow || 'rgba(0, 210, 150, 0.3)'};
`;

// Parallax text that moves at a different rate than the background
export const ParallaxText = ({ children, scrollFactor = 0.1, ...props }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${scrollFactor * 100}%`]);
  
  return (
    <motion.div
      style={{
        y,
        position: 'relative',
        zIndex: 2
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Parallax grid that creates a subtle depth effect
export const ParallaxGrid = ({ children, columns = 2, intensity = 0.05 }) => {
  const { scrollYProgress } = useScroll();
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '2rem',
      position: 'relative'
    }}>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        
        const yOffset = useTransform(
          scrollYProgress, 
          [0, 1], 
          [0, (i % 2 === 0 ? 1 : -1) * 50 * intensity]
        );
        
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            y: yOffset
          }
        });
      })}
    </div>
  );
};

// Animated gradient background with parallax effect
export const ParallaxGradient = styled(motion.div)`
  position: absolute;
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '100%'};
  background: ${props => props.$gradient || 'linear-gradient(135deg, rgba(0, 210, 150, 0.15), rgba(120, 60, 220, 0.15))'};
  border-radius: ${props => props.$radius || '50%'};
  filter: blur(${props => props.$blur || '80px'});
  opacity: ${props => props.$opacity || 0.5};
  z-index: ${props => props.$zIndex || 0};
  transform-origin: center;
  will-change: transform;
`;
