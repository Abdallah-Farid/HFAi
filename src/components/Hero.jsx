import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ParticleNetwork from './design/ParticleNetwork';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 7rem 1rem 4rem;
    min-height: 85vh; // Slightly reduce minimum height on mobile
  }
  
  @media (max-width: 480px) {
    padding: 6rem 1rem 3rem;
  }
`;

const HeroContent = styled.div`
  max-width: var(--container-width);
  width: var(--container-percentage);
  z-index: 5;
  text-align: center;
  position: relative;
  margin: 0 auto;
  padding: 0 1rem;
  pointer-events: auto; /* Ensure clicks work */
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.75rem);
  font-weight: 700;
  line-height: 1.05;
  margin-bottom: 1.75rem;
  text-transform: none;
  letter-spacing: var(--title-letter-spacing);
  font-family: var(--font-heading);
  
  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
    br {
      display: none; // Remove line breaks on very small screens for better flow
    }
  }
  
  .keyword {
    background: linear-gradient(135deg, rgba(0, 210, 150, 1), rgba(0, 180, 150, 0.9));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: none;
  }
`;

const HeroTagline = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.45rem);
  margin-bottom: 2.75rem;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.95); /* Increased opacity slightly */
  line-height: 1.65;
  font-weight: 400;
  letter-spacing: 0.01em;
  
  @media (max-width: 768px) {
    margin-bottom: 2.25rem;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
  
  .highlight {
    color: var(--neon-teal);
    text-shadow: var(--text-glow-teal);
    font-weight: 500;
  }
  
  .highlight-interactive {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1.25rem;
  }
`;

const HeroButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2.35rem;
  border-radius: 8px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.05rem;
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0.02em;
  /* Refined transition: focus on color/border, let Framer Motion handle transform/scale */
  transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  background: rgba(0, 210, 150, 0.1);
  color: white;
  border: 1px solid rgba(0, 210, 150, 0.3);
  box-shadow: var(--neon-glow-teal);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0.85rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 250px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.75rem;
    font-size: 0.95rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 210, 150, 0.2), rgba(0, 210, 150, 0.05));
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), 0 0 18px rgba(0, 210, 150, 0.25);
    border-color: rgba(0, 210, 150, 0.6);
    color: var(--neon-teal);
  }
  
  svg {
    margin-left: 0.75rem;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const SecondaryButton = styled(HeroButton)`
  background: rgba(30, 144, 255, 0.1);
  color: white;
  border: 1px solid rgba(30, 144, 255, 0.3);
  box-shadow: var(--neon-glow-blue);
  
  &::before {
    background: linear-gradient(135deg, rgba(30, 144, 255, 0.2), rgba(30, 144, 255, 0.05));
  }
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), 0 0 18px rgba(30, 144, 255, 0.25);
    border-color: rgba(30, 144, 255, 0.6);
    color: var(--neon-blue);
  }
`;

function Hero() {
  // Check if device is mobile or tablet
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);
  
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth <= 992);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return (
    <HeroSection id="home">
      {/* Only render ParticleNetwork on desktop */}
      {!isMobileOrTablet && (
        <ParticleNetwork 
          particleCount={130} 
          particleColor="rgba(0, 210, 150, 0.35)" 
          lineColor="rgba(0, 210, 150, 0.25)" 
          connectionDistance={180}
          repelStrength={0.015}
          particleSize={{ min: 1, max: 2 }}
          particleSpeed={0.15}
        />
      )}
      <HeroContent>
        <HeroTitle 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Unleash the Power of <span className="keyword">AI</span> <br /> for Your Creative Vision
        </HeroTitle>
        
        <HeroTagline
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        >
          Egypt's premier <span className="highlight highlight-interactive">AI studio</span> delivering revolutionary <span className="highlight highlight-interactive">image</span>, <span className="highlight highlight-interactive">video</span>, 
          <span className="highlight highlight-interactive">text</span>, and <span className="highlight highlight-interactive">audio</span> generation services. We transform your ideas into stunning digital realities with our custom AI solutions.
        </HeroTagline>
        
        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <HeroButton
            href="#services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Services
          </HeroButton>
          
          <SecondaryButton
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
          </SecondaryButton>
        </ButtonContainer>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero;
