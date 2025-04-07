import React, { useEffect } from 'react';
import { VideoBar } from './design/Services';
import { ServicesGradients } from './design/SectionGradients';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxContainer, ParallaxOrb, ParallaxText, ParallaxGrid } from './design/ParallaxElements';

// Import images for proper Vite bundling
import mainCardImg from '../assets/services_/main card.jpeg';
import gptAgentsImg from '../assets/services_/gpt agents.jpeg';
import personalizedLearningImg from '../assets/services_/personlized learning.jpeg';

const ServiceSection = styled.section`
  position: relative;
  padding-top: 5rem;
  padding-bottom: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding-top: 3rem; 
    padding-bottom: 2rem; 
  }
`;

const SectionContainer = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: var(--container-width);
  width: var(--container-percentage);
  
  @media (max-width: 768px) {
    margin-bottom: 1rem; 
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.1rem, 5vw, 3.1rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1.25rem;
  text-align: center;
  position: relative;
  font-family: var(--font-heading);
  letter-spacing: var(--title-letter-spacing);
  
  .highlight {
    color: var(--neon-blue);
    text-shadow: var(--text-glow-blue);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem; 
  }
`;

const SectionDescription = styled.p`
  font-size: clamp(1.05rem, 3vw, 1.2rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 4.5rem;
  text-align: center;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.65;
  font-family: var(--font-body);
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem; 
  }
`;

const MainServiceCard = styled.div`
  height: 36rem;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 1.25rem;
  display: flex;
  position: relative;
  overflow: hidden;
  padding: 3rem 3.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 40px rgba(0, 0, 0, 0.15),
      0 0 20px rgba(0, 210, 150, 0.25);
    border: 1px solid rgba(0, 210, 150, 0.2);
  }
  
  @media (max-width: 768px) {
    height: auto; 
    min-height: 42rem; 
    padding: 0; 
    flex-direction: column; 
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    min-height: 38rem;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(10, 15, 31, 0.1) 0%, 
      rgba(10, 15, 31, 0.3) 50%,
      rgba(10, 15, 31, 0.45) 100%);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    &::after {
      background: linear-gradient(to bottom, 
        rgba(10, 15, 31, 0.3) 0%, 
        rgba(10, 15, 31, 0.5) 40%,
        rgba(10, 15, 31, 0.8) 100%);
    }
  }
`;

const ServiceImage = styled.img`
  width: ${props => props.width ? props.width + 'px' : '100%'};
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: ${props => props.position || 'center'};
  opacity: 1;
  filter: brightness(1.25) contrast(1.45) saturate(1.15);
  transition: transform 0.4s ease-out;
`;

const ServiceContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 24rem;
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin: 0 auto;
    margin-top: auto;
    max-width: 90%; 
    text-align: center;
    background-color: rgba(10, 15, 31, 0.85);
    padding: 2rem 1.5rem;
    border-radius: 0.75rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    max-width: 92%;
    padding: 1.5rem 1rem;
  }
`;

const ServiceTitle = styled.h4`
  font-size: 1.85rem;
  font-weight: 600;
  margin-bottom: 1.75rem;
  background: linear-gradient(135deg, rgba(0, 210, 150, 1), rgba(0, 180, 150, 0.95));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: var(--font-display);
  
  @media (max-width: 768px) {
    font-size: 1.6rem; 
    margin-bottom: 1rem; 
  }
`;

const ServiceList = styled.ul`
  font-size: 1rem;
`;

const ServiceItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 1.25rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.25s ease-out;
  
  &:hover {
    transform: translateX(4px);
    background-color: rgba(255, 255, 255, 0.03); /* Subtle background highlight */
    border-top: 1px solid rgba(0, 210, 150, 0.25);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0; 
    align-items: center; 
  }
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 7px;
  background: rgba(0, 210, 150, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(0, 210, 150, 0.22);
`;

const ServiceText = styled.p`
  margin-left: 1.15rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  letter-spacing: 0.015em;
  line-height: 1.6;
  font-size: 1.05rem;
  
  @media (max-width: 768px) {
    margin-left: 0.75rem; 
    font-size: 0.95rem; 
    text-align: left; 
  }
`;

const ServicesGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.618fr 1fr;
  grid-template-rows: 1.8fr 0.8fr;
  gap: 1rem;
  height: 46rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto; 
    height: auto; 
    gap: 2rem; 
  }
`;

const LeftServiceCard = styled.div`
  position: relative;
  grid-column: 1;
  grid-row: 1;
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Stack image and content vertically */
  border-radius: 1.25rem;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.5); /* Restore original background */
  border: 1px solid rgba(0, 210, 150, 0.1);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 0 15px rgba(0, 210, 150, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 
      0 18px 45px rgba(0, 0, 0, 0.2),
      0 0 25px rgba(0, 210, 150, 0.3);
    border-color: rgba(0, 210, 150, 0.3);
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: auto; 
    flex-direction: column; 
  }
`;

const TopRightServiceCard = styled.div`
  grid-column: 2;
  grid-row: 1;
  position: relative;
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Stack image and content vertically */
  border-radius: 1.25rem;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.5); /* Restore original background */
  border: 1px solid rgba(120, 60, 220, 0.1);
  box-shadow: 
    0 5px 20px rgba(0, 0, 0, 0.1),
    0 0 12px rgba(120, 60, 220, 0.1);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 
      0 18px 45px rgba(0, 0, 0, 0.2),
      0 0 25px rgba(120, 60, 220, 0.3);
    border-color: rgba(120, 60, 220, 0.3);
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: auto;
    height: auto; 
    flex-direction: column; 
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px; /* INCREASED height to push content area down */
  flex-shrink: 0; /* Prevent image container from shrinking */
  overflow: hidden; /* Ensure overlay doesn't spill */
  border-radius: inherit; /* Inherit border-radius from parent card */
  
  &::after { /* Apply overlay here instead of CardContent */
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 15, 31, 0.65) 0%, /* Slightly stronger overlay */
      rgba(10, 15, 31, 0.45) 30%, /* Slightly stronger overlay */
      rgba(10, 15, 31, 0.25) 100% /* Slightly stronger overlay */
    );
    z-index: 1; /* Place overlay above image but below potential content inside */
    pointer-events: none;
    border-radius: inherit;
  }
`;

const HorizontalCardImageContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 40%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  
  @media (max-width: 768px) {
    position: relative; 
    width: 100%;
    height: 15rem; 
  }
`;

const CardContent = styled.div`
  position: relative;
  padding: 1.5rem 2.25rem 1rem; /* DECREASED top padding to allow text lower (desktop) */
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allow content to take remaining vertical space */
  
  @media (max-width: 768px) {
    position: relative; 
    left: auto; 
    padding: 1.5rem 1.5rem 1.5rem; /* Keep mobile padding */
    background-color: transparent; 
    height: auto; 
  }
`;

const HorizontalCardContent = styled.div`
  position: absolute;
  inset: 0;
  left: 40%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Align content to center */
  z-index: 1;
  background-color: rgba(15, 23, 42, 0.75);
  
  @media (max-width: 768px) {
    position: relative; 
    left: auto; 
    padding: 1.5rem; 
    background-color: transparent; 
    height: auto; 
    justify-content: flex-start; /* Mobile: Align content to top */
    &::before { 
      display: none;
    }
  }
`;

const CardTitle = styled.h5`
  font-size: clamp(1.4rem, 4vw, 1.6rem);
  font-weight: 600;
  margin-bottom: 0.85rem;
  background: linear-gradient(135deg, rgba(0, 210, 150, 1), rgba(0, 180, 150, 0.95));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent; /* Add for compatibility */
  font-family: var(--font-display);
  text-align: center; /* Center align title */
  margin-top: auto; /* Push title (and description below it) to bottom */
  text-shadow: 0 0 10px rgba(0, 210, 150, 0.3); /* Restore shadow */
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
    margin-top: 0; /* Reset margin for top alignment on mobile */
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  flex-grow: 1;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
  text-align: center; /* Center align description */
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color || 'var(--neon-teal)'};
  text-shadow: ${props => 
    props.color === 'var(--neon-blue)' ? 'var(--text-glow-blue)' :
    props.color === 'var(--neon-magenta)' ? 'var(--text-glow-magenta)' : 
    'var(--text-glow-teal)'
  };
`;

const FeatureCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, rgba(0, 210, 150, 0.9), rgba(30, 144, 255, 0.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 5px rgba(0, 210, 150, 0.2));
  font-family: var(--font-heading);
  position: relative;
  z-index: 2;
  
  .keyword {
    color: var(--neon-teal);
    text-shadow: var(--text-glow-teal);
    -webkit-text-fill-color: var(--neon-teal);
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`;

const LearnMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${props => props.color || 'var(--neon-teal)'};
  text-shadow: ${props => {
    if (props.color === 'var(--neon-blue)') return 'var(--text-glow-blue)';
    if (props.color === 'var(--neon-magenta)') return 'var(--text-glow-magenta)';
    return 'var(--text-glow-teal)';
  }};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.color || 'var(--neon-teal)'}; /* Change text color on hover */
    svg {
      transform: translateX(3px);
    }
  }
`;

const Services = () => {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.6], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.6], [1, 1.1]);
  
  return (
    <>
      <ServiceSection id="services">
        <ParallaxContainer>
          <ParallaxOrb 
            $size="350px" 
            $gradient="linear-gradient(135deg, rgba(0, 210, 150, 0.15), rgba(30, 144, 255, 0.15))" 
            $blur={90} 
            $opacity={0.4} 
            style={{ top: '15%', right: '10%' }} 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 30, 0],
              rotate: [0, -3, 0]
            }} 
            transition={{ 
              duration: 22, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <ParallaxOrb 
            $size="280px" 
            $gradient="linear-gradient(135deg, rgba(210, 40, 180, 0.15), rgba(120, 60, 220, 0.15))" 
            $blur={75} 
            $opacity={0.35} 
            style={{ bottom: '25%', left: '5%' }} 
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -40, 0],
              rotate: [0, 5, 0]
            }} 
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </ParallaxContainer>
        <ServicesGradients />
        <SectionContainer>
          <div style={{ position: 'relative' }}>
            <ParallaxText scrollFactor={-0.1}>
              <motion.div style={{ y: titleY }}>
                <SectionTitle className="section-title">Our <span className="highlight">Services</span></SectionTitle>
              </motion.div>
            </ParallaxText>
            
            <motion.div style={{ y: cardY }}>
              <MainServiceCard>
              <ImageContainer>
                <motion.div style={{ scale: imageScale }}>
                  <ServiceImage
                    width={920}
                    alt="AI Image Generation"
                    height={730}
                    src={mainCardImg}
                    position="left center"
                  />
                </motion.div>
              </ImageContainer>

              <ServiceContent>
                <ServiceTitle>Bringing Your Ideas to Life</ServiceTitle>
                <ServiceList>
                  <ServiceItem>
                    <IconContainer>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(0, 210, 150, 1)" style={{ width: '1rem', height: '1rem' }}>
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    </IconContainer>
                    <ServiceText>AI Consultation: Strategic guidance to integrate AI effectively into your business workflows.</ServiceText>
                  </ServiceItem>
                  <ServiceItem>
                    <IconContainer>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(0, 210, 150, 1)" style={{ width: '1rem', height: '1rem' }}>
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    </IconContainer>
                    <ServiceText>Image & Video Generation: Create captivating, AI-powered visuals and dynamic video content.</ServiceText>
                  </ServiceItem>
                  <ServiceItem>
                    <IconContainer>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(0, 210, 150, 1)" style={{ width: '1rem', height: '1rem' }}>
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    </IconContainer>
                    <ServiceText>Music & Audio Production: Generate unique, royalty-free music and professional audio using AI.</ServiceText>
                  </ServiceItem>
                </ServiceList>
              </ServiceContent>
            </MainServiceCard>
          </motion.div>
          </div>
        </SectionContainer>
      </ServiceSection>

      <ServiceSection style={{ paddingTop: '0', marginTop: '-3rem', paddingBottom: '0rem' }}>
        <ServicesGradients />
        <SectionContainer>
          <div style={{ position: 'relative', overflow: 'visible' }}>
            <ServicesGrid>
              <LeftServiceCard>
                <CardImageContainer>
                  <ServiceImage
                    src={gptAgentsImg}
                    width={800}
                    height={750}
                    alt="AI Services"
                  />
                </CardImageContainer>

                <CardContent>
                  <CardTitle>Custom AI Agents & Workflows</CardTitle>
                  <CardDescription>
                    Develop bespoke AI agents, from specialized GPTs to fully autonomous systems.
                  </CardDescription>
                </CardContent>
              </LeftServiceCard>

              <TopRightServiceCard>
                <CardImageContainer>
                  <ServiceImage
                    src={personalizedLearningImg}
                    width={650}
                    height={750}
                    alt="Image Generation"
                  />
                </CardImageContainer>

                <CardContent>
                  <CardTitle>Generative AI Training</CardTitle>
                  <CardDescription>
                    Master leading generative AI tools for creative industries with our expert-led courses.
                  </CardDescription>
                </CardContent>
              </TopRightServiceCard>


            </ServicesGrid>
          </div>
        </SectionContainer>
      </ServiceSection>
    </>
  );
}

export default Services;
