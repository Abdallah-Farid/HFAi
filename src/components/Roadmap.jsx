import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RoadmapGradients } from './design/SectionGradients';
import { ParallaxContainer, ParallaxOrb, ParallaxText, ParallaxGrid } from './design/ParallaxElements';

// Import images
import image1 from '../assets/roadmap/card 1.jpeg';
import image2 from '../assets/roadmap/hfhub.jpeg';
import image3 from '../assets/roadmap/learning.jpeg';
import image4 from '../assets/roadmap/ar-vr.jpeg';

const RoadmapSection = styled.section`
  position: relative;
  padding: 0rem 0 5rem;
  margin-top: -12rem;
  overflow: visible;
  width: 100%;
  
  @media (max-width: 992px) {
    margin-top: -8rem; // Less aggressive negative margin on tablets
    padding-top: 2rem; // Added top padding for tablets
  }
  
  @media (max-width: 768px) {
    margin-top: -6rem; // Even less on mobile
    padding: 3rem 0 4rem; // Added substantial top padding
  }
  
  @media (max-width: 480px) {
    margin-top: -3rem; // Minimal negative margin on small phones
    padding: 4rem 0 3rem; // Even more top padding on small phones
  }
`;

const Container = styled.div`
  max-width: var(--container-width);
  width: var(--container-percentage);
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Subtitle = styled.div`
  color: rgba(0, 210, 150, 0.95);
  margin-bottom: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-family: var(--font-display);
  text-shadow: 0 0 12px rgba(0, 210, 150, 0.35);
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 5vw, 3.1rem);
  font-weight: 700;
  background: linear-gradient(135deg, rgba(0, 210, 150, 1), rgba(30, 144, 255, 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 12px rgba(0, 210, 150, 0.2));
  font-family: var(--font-heading);
  letter-spacing: var(--title-letter-spacing);
  margin-bottom: 0.5rem;
`;

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(0, 210, 150, 0.3), 
      rgba(30, 144, 255, 0.3), 
      rgba(0, 220, 255, 0.3));
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    box-shadow: 
      0 0 15px rgba(0, 210, 150, 0.1),
      0 0 30px rgba(120, 60, 220, 0.1);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const RoadmapGrid = styled.div`
  position: relative;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 7rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem; // Consistent spacing between cards on mobile
  }
`;

const RoadmapCardWrapper = styled(motion.div)`
  display: flex;
  transform: ${props => props.$isOdd ? 'translateY(7rem)' : 'none'};
  padding: 0.15rem;
  border-radius: 1.25rem;
  background: linear-gradient(135deg, 
    rgba(0, 210, 150, 0.1), 
    rgba(30, 144, 255, 0.1), 
    rgba(0, 220, 255, 0.1));
  position: relative;
  transition: all 0.4s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 0 15px rgba(0, 210, 150, 0.05),
    0 0 25px rgba(120, 60, 220, 0.03);
  
  &:hover {
    transform: ${props => props.$isOdd ? 'translateY(7rem) scale(1.02)' : 'scale(1.02)'};
    background: linear-gradient(135deg, 
      rgba(0, 210, 150, 0.15), 
      rgba(30, 144, 255, 0.15), 
      rgba(0, 220, 255, 0.15));
    box-shadow: 
      0 15px 40px rgba(0, 0, 0, 0.15),
      0 0 20px rgba(0, 210, 150, 0.1),
      0 0 30px rgba(30, 144, 255, 0.08),
      0 0 40px rgba(0, 220, 255, 0.05);
  }
  
  @media (max-width: 768px) {
    transform: none !important; /* Remove vertical offset on mobile */
    margin-bottom: 0; /* Ensure consistent spacing between cards */
    
    &:hover {
      transform: scale(1.02) !important; /* Consistent hover effect */
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: ${props => props.$isDone ? 'rgba(0, 210, 150, 0.9)' : 'rgba(30, 144, 255, 0.9)'};
    border-radius: 50%;
    top: 2.5rem;
    left: ${props => props.$isOdd ? 'auto' : '-8px'};
    right: ${props => props.$isOdd ? '-8px' : 'auto'};
    z-index: 2;
    box-shadow: 
      0 0 15px ${props => props.$isDone ? 'rgba(0, 210, 150, 0.5)' : 'rgba(30, 144, 255, 0.5)'},
      0 0 30px ${props => props.$isDone ? 'rgba(0, 210, 150, 0.3)' : 'rgba(30, 144, 255, 0.3)'};
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.25rem;
    padding: 0.15rem;
    background: linear-gradient(135deg, 
      rgba(0, 210, 150, 0.3), 
      rgba(30, 144, 255, 0.3), 
      rgba(0, 220, 255, 0.3), 
      rgba(0, 210, 150, 0.3));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.3;
    transition: opacity 0.4s ease;
    z-index: 0;
  }
  
  &:hover::after {
    opacity: 0.6;
  }
`;

const RoadmapCard = styled.div`
  position: relative;
  padding: 2.75rem;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 1rem;
  overflow: hidden;
  backdrop-filter: blur(12px);
  width: 100%;
  min-height: 700px; // Slightly reduced min-height for tighter look
  transition: all 0.35s ease, box-shadow 0.4s ease; /* Added transition for box-shadow */
  position: relative; // Ensure z-index works for pseudo-elements
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 0 15px rgba(0, 210, 150, 0.05),
    0 0 25px rgba(30, 144, 255, 0.03);
  
  ${RoadmapCardWrapper}:hover & {
    box-shadow: inset 0 0 25px 5px rgba(0, 210, 150, 0.08); 
  }
  
  &::after { // Faded edge effect for images
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(15, 23, 42, 0) 0%, 
      rgba(15, 23, 42, 0.7) 90%, 
      rgba(15, 23, 42, 0.9) 100%);
    z-index: 1;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  order: 1;
`;

const CardDate = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  background: linear-gradient(135deg, rgba(0, 210, 150, 0.8), rgba(30, 144, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 5px rgba(0, 210, 150, 0.2));
`;

const CardStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: var(--font-display);
  letter-spacing: 0.01em;
  background: ${props => props.$isDone ? 
    'linear-gradient(135deg, rgba(0, 210, 150, 0.15), rgba(0, 210, 150, 0.3))' : 
    'linear-gradient(135deg, rgba(30, 144, 255, 0.15), rgba(30, 144, 255, 0.3))'};
  color: ${props => props.$isDone ? 'rgba(0, 210, 150, 1)' : 'rgba(30, 144, 255, 1)'};
  box-shadow: 0 0 10px ${props => props.$isDone ? 'rgba(0, 210, 150, 0.2)' : 'rgba(30, 144, 255, 0.2)'};
  position: relative;
  z-index: 2;
  
  svg {
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.35rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  background: linear-gradient(135deg, rgba(0, 210, 150, 0.8), rgba(30, 144, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 5px rgba(0, 210, 150, 0.2));
  position: relative;
  z-index: 2;
  order: 3;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1.75rem;
  position: relative;
  z-index: 2;
  order: 4;
  font-family: var(--font-body);
  letter-spacing: 0.01em;
`;

const ImageContainer = styled.div`
  margin: 0.5rem 0 1.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  order: 2;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(15, 23, 42, 0) 0%, 
      rgba(15, 23, 42, 0.7) 90%, 
      rgba(15, 23, 42, 0.9) 100%);
    z-index: 1;
  }
`;

const CardImage = styled.div`
  position: relative;
  overflow: hidden;
  height: 500px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    opacity: 1;
    filter: brightness(1.15) contrast(1.4) saturate(1.15);
    transition: transform 0.5s ease;
  }
  
  ${RoadmapCardWrapper}:hover & img {
    transform: scale(1.05);
  }
`;



const roadmapItems = [
  {
    date: 'Q1 2025',
    status: 'done',
    title: 'Custom AI Models for Creative Industries',
    text: 'We develop custom AI models tailored for creative industries, enabling artists, designers, and content creators to enhance their work with AI-powered tools.',
    imageUrl: image1
  },
  {
    date: 'Q2 2025',
    status: 'in-progress',
    title: 'HFAI Hub: All-in-One AI Platform',
    text: 'Coming soon: HFAI Hub, our comprehensive platform for AI agents, GPTs, and generative AI tools. Currently in development, this unified ecosystem will provide seamless integration, enhanced productivity, and innovative solutions for businesses and creators.',
    imageUrl: image2
  },
  {
    date: 'Q4 2025',
    status: 'in-progress',
    title: 'Immersive AI Worlds in AR/VR',
    text: 'Step into the future with AI-generated virtual environments that you can explore in augmented or virtual reality for gaming, education, or creative projects.',
    imageUrl: image4
  },
  {
    date: 'Q2 2026',
    status: 'planned',
    title: 'Advanced Neural Interfaces',
    text: 'Our next-generation AI systems will feature enhanced neural interfaces for more intuitive human-AI collaboration, enabling deeper integration between creative vision and AI capabilities.',
    imageUrl: image3
  }
];

const Roadmap = () => {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -15]);
  
  return (
  <RoadmapSection id="roadmap">
    <ParallaxContainer>
      <ParallaxOrb 
        $size="300px" 
        $gradient="linear-gradient(135deg, rgba(0, 210, 150, 0.15), rgba(30, 144, 255, 0.15))" 
        $blur={80} 
        $opacity={0.4} 
        style={{ top: '10%', left: '5%' }} 
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
          rotate: [0, 5, 0]
        }} 
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <ParallaxOrb 
        $size="250px" 
        $gradient="linear-gradient(135deg, rgba(120, 60, 220, 0.15), rgba(210, 40, 180, 0.15))" 
        $blur={70} 
        $opacity={0.35} 
        style={{ bottom: '20%', right: '8%' }} 
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 40, 0],
          rotate: [0, -5, 0]
        }} 
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
    </ParallaxContainer>
    <RoadmapGradients />
    <Container>
      <HeaderContainer>
        <motion.div style={{ y: subtitleY }}>
          <Subtitle>Our Vision</Subtitle>
        </motion.div>
        <motion.div style={{ y: titleY }}>
          <Title className="section-title">Development Roadmap</Title>
        </motion.div>
      </HeaderContainer>

      <Timeline>
        <RoadmapGrid>
          {roadmapItems.map((item, index) => {
            const getStatus = (status) => {
              if (status === "done") return "Done";
              if (status === "in-progress") return "In progress";
              return "Planned";
            };
            const status = getStatus(item.status);
            const isDone = item.status === "done";
            const isOdd = index % 2 === 1;

            return (
              <RoadmapCardWrapper 
                key={`roadmap-item-${index}`} 
                $isOdd={isOdd} 
                $isDone={isDone}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1, 
                  y: window.innerWidth <= 768 ? 0 : (isOdd ? 7*16 : 0)
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RoadmapCard>
                  <CardContent>
                    <CardHeader>
                      <CardDate>{item.date}</CardDate>

                      <CardStatus $isDone={isDone}>
                        {item.status === "done" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : item.status === "in-progress" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span>{status}</span>
                      </CardStatus>
                    </CardHeader>

                    <ImageContainer>
                      <CardImage>
                        <img
                          src={item.imageUrl}
                          width={628}
                          height={426}
                          alt={item.title}
                        />
                      </CardImage>
                    </ImageContainer>
                    
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.text}</CardDescription>
                  </CardContent>
                </RoadmapCard>
              </RoadmapCardWrapper>
            );
          })}
        </RoadmapGrid>
      </Timeline>


    </Container>
  </RoadmapSection>
  );
};

export default Roadmap;
