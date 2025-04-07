import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterSection = styled.section`
  position: relative;
  overflow: hidden;
`;

const FooterContainer = styled.footer`
  background: linear-gradient(to bottom, rgba(10, 15, 31, 0.9), rgba(10, 15, 31, 1));
  padding: 5rem 0 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    padding: 4rem 0 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 0 1.5rem;
  }
`;

const FooterContent = styled.div`
  max-width: var(--container-width);
  width: var(--container-percentage);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem 2rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem 1.5rem;
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 0 1.25rem;
  }
`;

const BrandContainer = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const ColumnTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  font-family: var(--font-display);
  
  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const LogoText = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  font-family: var(--font-heading);
  letter-spacing: var(--title-letter-spacing);
  color: white;
  margin: 0;
  
  span {
    background: linear-gradient(135deg, rgba(0, 210, 150, 1), rgba(30, 144, 255, 0.95));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-right: 3px;
    text-shadow: 0 0 10px rgba(0, 210, 150, 0.3);
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
  }
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 400;
  font-family: var(--font-display);
  position: relative;
  letter-spacing: 0.01em;
  
  &:hover {
    color: white;
    
    &::after {
      width: 100%;
      opacity: 1;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: linear-gradient(90deg, rgba(0, 210, 150, 0.9), rgba(30, 144, 255, 0.5));
    transition: all 0.2s ease-out;
    opacity: 0;
    border-radius: 1px;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.05rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  
  &:hover {
    color: white;
    background: rgba(0, 210, 150, 0.08);
    box-shadow: 0 0 10px rgba(0, 210, 150, 0.15);
  }
`;

const FooterDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 20rem;
  
  @media (max-width: 480px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.25rem;
  }
`;

const BottomBar = styled.div`
  max-width: var(--container-width);
  width: var(--container-percentage);
  margin: 2rem auto 0;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
  margin: 0;
  font-family: var(--font-body);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const LegalLink = styled.a`
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  position: relative;
  font-family: var(--font-body);
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
    transition: width 0.2s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

function Footer() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <FooterSection id="contact">
      <FooterContainer>
        <FooterContent>
          <BrandContainer
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.4 }}
          >
            <LogoText><span>HF</span>AI</LogoText>
          </BrandContainer>
          
          <NavLinks
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <FooterLink href="#home">Home</FooterLink>
            <FooterLink href="#why-hfai">Why HFAI</FooterLink>
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#roadmap">Roadmap</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
          </NavLinks>
          

        </FooterContent>
        
        <BottomBar>
          <Copyright>
            &copy; 2025 HFAI. All rights reserved.
          </Copyright>
          <LegalLinks>
            <LegalLink href="#">Privacy</LegalLink>
            <LegalLink href="#">Terms</LegalLink>
            <LegalLink href="#">Cookies</LegalLink>
          </LegalLinks>
        </BottomBar>
      </FooterContainer>
    </FooterSection>
  );
}

export default Footer;
