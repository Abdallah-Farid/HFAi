import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  padding: 5rem 1rem;
  position: relative;
  z-index: 2;
  overflow: hidden;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const SectionContainer = styled.div`
  max-width: var(--container-width);
  width: var(--container-percentage);
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const SectionHeader = styled.div`
  max-width: 900px;
  margin: 0 auto 5rem;
  text-align: center;
  position: relative;
  
  @media (max-width: 768px) {
    margin: 0 auto 4rem;
  }
  
  @media (max-width: 480px) {
    margin: 0 auto 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1.25rem;
  text-align: center;
  font-family: var(--font-heading);
  letter-spacing: var(--title-letter-spacing);
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
  
  .highlight {
    color: var(--neon-teal);
    text-shadow: none;
  }
`;

const SectionDescription = styled.p`
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 4.5rem;
  text-align: center;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.65;
  font-family: var(--font-body);
  font-weight: 400;
  
  @media (max-width: 768px) {
    margin-bottom: 3.5rem;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2.5rem;
    font-size: 0.95rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr; // Single column for small screens
    gap: 1.5rem;
    width: 100%;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 2.75rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.35s ease;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25),
    0 0 18px rgba(120, 60, 220, 0.15);
    
  @media (max-width: 768px) {
    padding: 2.25rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.75rem;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(120, 60, 220, 0) 0%, 
      rgba(120, 60, 220, 0.5) 50%,
      rgba(120, 60, 220, 0) 100%);
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3),
      0 0 22px rgba(120, 60, 220, 0.2);
    border-color: rgba(120, 60, 220, 0.25);
    
    &:before {
      opacity: 0.8;
      background: linear-gradient(90deg, rgba(120, 60, 220, 0) 0%, rgba(120, 60, 220, 0.7) 50%, rgba(120, 60, 220, 0) 100%);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.75rem;
  margin-bottom: 1.75rem;
  background: linear-gradient(135deg, rgba(120, 60, 220, 1), rgba(210, 40, 180, 0.9));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 12px rgba(120, 60, 220, 0.35));
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.25rem;
    margin-bottom: 1.25rem;
  }
  
  ${FeatureCard}:hover & {
    transform: scale(1.05);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: white;
  font-family: var(--font-display);
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
  
  .highlight {
    color: rgba(255, 255, 255, 0.95);
    font-weight: 700;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  font-weight: 400;
  font-family: var(--font-body);
  letter-spacing: 0.01em;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const cardData = [
  { 
    title: 'Pioneers in Egyptian AI', 
    text: 'We were among the first to adopt generative AI tools like ChatGPT, DALL-E, and Midjourney, leading the way in Egypt.', 
    icon: '🚀'
  },
  { 
    title: 'Creative AI Solutions', 
    text: 'We offer a wide range of services, from video and image generation to custom AI agents, empowering creatives and businesses.', 
    icon: '💡'
  },
  { 
    title: 'Expert Team with a Human Touch', 
    text: 'Led by Hatem Farid, our team blends creative vision with technical expertise for personalized, high-quality results.', 
    icon: '👥'
  },
];

function WhyHFAI() {
  const [ref, inView] = useInView({ 
    triggerOnce: false, 
    threshold: 0.1,
    rootMargin: '-100px 0px'
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <Section id="why-hfai" ref={ref}>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why <span className="highlight">HF AI</span>?
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transforming businesses across Egypt with cutting-edge AI technology, innovative solutions, and personalized service that combines technical expertise with creative vision.
          </SectionDescription>
        </SectionHeader>
        
        <CardGrid>
          {cardData.map((card, index) => (
            <FeatureCard
              key={index}
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <FeatureIcon>
                {card.icon}
              </FeatureIcon>
              <FeatureTitle>
                {card.title.split(' ').map((word, i) => 
                  i === 0 || word === 'AI' ? 
                    <span key={i} className="highlight">{word} </span> : 
                    <span key={i}>{word} </span>
                )}
              </FeatureTitle>
              <FeatureDescription>{card.text}</FeatureDescription>
            </FeatureCard>
          ))}
        </CardGrid>
      </SectionContainer>
    </Section>
  );
}

export default WhyHFAI;
