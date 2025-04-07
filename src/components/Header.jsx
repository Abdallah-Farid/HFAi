import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderGradients } from './design/SectionGradients';
import logoImage from '../assets/logo.png';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 2rem;
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  background: rgba(10, 15, 31, 0.7);
  
  @media (max-width: 768px) {
    padding: 1.25rem 1.25rem; 
    height: 90px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: var(--container-percentage);
  max-width: 1680px; /* Increased max-width for header */
  margin: 0 auto;
  
  @media (max-width: 992px) {
    justify-content: flex-end;
    padding: 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 50px; 
  width: auto;
  border-radius: 10px; 
  margin-right: 0;
  object-fit: cover;
  transition: all 0.3s ease-out;
  filter: drop-shadow(0 0 6px rgba(0, 210, 150, 0.1)); 

  &:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 10px rgba(0, 210, 150, 0.18));
  }
  
  @media (max-width: 768px) {
    height: 300px;
    width: auto;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1001;
  position: relative;
  
  @media (max-width: 768px) {
    position: absolute;
    left: 1.25rem;
    top: 12px;
    transform: none;
  }
  
  img {
    height: 2.25rem;
    margin-right: 0.75rem;
    
    @media (max-width: 768px) {
      height: 1.85rem; 
    }
  }
  transition: all 0.3s ease-out;
  filter: drop-shadow(0 0 6px rgba(0, 210, 150, 0.1)); 

  &:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 10px rgba(0, 210, 150, 0.18));
  }
`;

const MobileNavToggle = styled.button`
  display: none;
  background: rgba(10, 15, 31, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2); 
  border-radius: 8px;
  width: 48px; 
  height: 48px;
  flex-direction: column;
  gap: 6px; 
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1001; 
  padding: 0;
  transition: all 0.25s ease-out;
  position: fixed;
  top: 15px;
  right: 15px;
  
  &:hover {
    background: rgba(10, 15, 31, 0.9);
    border-color: var(--neon-teal);
  }
  
  @media (max-width: 992px) {
    display: flex; 
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 992px) {
    display: none; 
  }
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.8); 
  text-decoration: none;
  font-weight: 500;
  padding: 0.6rem 1rem; 
  border-radius: 8px;
  transition: all 0.3s ease-out;
  font-size: 0.9rem; 
  letter-spacing: 0.02em;
  font-family: var(--font-display);

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.07); 
  }

  &.active {
    color: var(--neon-teal);
    font-weight: 600; 
    background-color: rgba(0, 210, 150, 0.08); 
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 992px) {
    display: none; 
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg,
    rgba(0, 210, 150, 0.15),
    rgba(120, 60, 220, 0.15));
  color: white;
  border: 1px solid rgba(0, 210, 150, 0.3);
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: var(--font-display);
  
  @media (max-width: 992px) {
    display: flex; 
    width: 100%;
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
    justify-content: center;
  }
`;



const MenuBar = styled(motion.div)`
  width: 22px; 
  height: 2px; 
  background: ${props => props.$isOpen ? 'var(--neon-teal)' : 'white'}; 
  border-radius: 1px;
  transition: all 0.3s ease-out;
  box-shadow: ${props => props.$isOpen ? '0 0 8px rgba(0, 210, 150, 0.5)' : 'none'};
  
  &:nth-child(1) {
    transform: ${props => props.$isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
  }
  
  &:nth-child(2) {
    opacity: ${props => props.$isOpen ? '0' : '1'};
  }
  
  &:nth-child(3) {
    transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)'};
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 992px) {
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 15, 31, 0.98);
    backdrop-filter: blur(10px);
    padding: 0;
    z-index: 1000;
    overflow-y: auto;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem; 
  width: 100%;
  padding: 0 2rem;
`;

const MobileNavLink = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
  text-decoration: none;
  padding: 0.85rem 0;
  text-align: center;
  width: 100%;
  transition: all 0.3s ease;
  font-family: var(--font-display);
  letter-spacing: 0.01em;
  
  &:hover {
    color: var(--neon-teal);
    text-shadow: var(--text-glow-teal);
  }
  
  &.active {
    color: var(--neon-teal);
    text-shadow: var(--text-glow-teal);
  }
`;

const MobileSocial = styled.div`
  display: flex;
  gap: 1.5rem; 
  margin-top: 3rem;
  position: absolute;
  bottom: 3rem;
`;

const SocialIcon = styled.a`
  width: 50px; 
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05); 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem; 
  transition: all 0.3s ease-out;
  
  &:hover {
    color: var(--neon-teal);
    background: rgba(0, 210, 150, 0.1); 
    border-color: rgba(0, 210, 150, 0.3); 
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(0, 210, 150, 0.2);
  }
`;

const ProgressBar = styled(motion.div)`
  position: fixed;
  bottom: 0; 
  left: 0;
  right: 0;
  height: 4px; 
  background: var(--neon-teal);
  transform-origin: 0%;
  z-index: 101;
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(offset / height, 1) : 0; 
      setScrollProgress(progress || 0);

      const sections = ['home', 'why-hfai', 'services', 'roadmap', 'contact']; 

      let currentSection = 'home';
      const scrollY = window.pageYOffset;
      const viewportHeight = window.innerHeight;

      for (const section of sections.reverse()) { 
        const el = document.getElementById(section);
        if (el) {
          const rect = el.offsetTop;
          const elementHeight = el.offsetHeight;
          if (scrollY >= rect - viewportHeight * 0.5) { 
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);

    if (isMenuOpen) {
      toggleMenu(); 
    }

    if (section) {
      const headerHeight = 80; 
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <HeaderGradients />
      <HeaderContainer
        scrolled={scrolled}
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <NavContainer>
          <LogoContainer>
            <Logo href="#" onClick={(e) => scrollToSection(e, 'home')}>
              <LogoImg src={logoImage} alt="HF AI Logo" style={{width: '55px', height: 'auto'}} />
            </Logo>
          </LogoContainer>

          <NavLinks>
            <NavLink
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className={activeSection === 'home' ? 'active' : ''}
            >
              Home
            </NavLink>
            <NavLink
              href="#why-hfai"
              onClick={(e) => scrollToSection(e, 'why-hfai')}
              className={activeSection === 'why-hfai' ? 'active' : ''}
            >
              Why HFAI
            </NavLink>
            <NavLink
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className={activeSection === 'services' ? 'active' : ''}
            >
              Services
            </NavLink>
            <NavLink
              href="#roadmap"
              onClick={(e) => scrollToSection(e, 'roadmap')}
              className={activeSection === 'roadmap' ? 'active' : ''}
            >
              Roadmap
            </NavLink>
          </NavLinks>
          <ButtonGroup>
            <PrimaryButton
              href="/#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Contact Us
            </PrimaryButton>
          </ButtonGroup>
          {/* Mobile nav toggle is now fixed position */}
        </NavContainer>

        <AnimatePresence>
          <MobileNavToggle 
            onClick={toggleMenu} 
            $isOpen={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            <MenuBar $isOpen={isMenuOpen} />
            <MenuBar $isOpen={isMenuOpen} />
            <MenuBar $isOpen={isMenuOpen} />
          </MobileNavToggle>
          
          {isMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MobileNavLinks>
                <MobileNavLink
                  href="#home"
                  onClick={(e) => scrollToSection(e, 'home')}
                  className={activeSection === 'home' ? 'active' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink
                  href="#why-hfai"
                  onClick={(e) => scrollToSection(e, 'why-hfai')}
                  className={activeSection === 'why-hfai' ? 'active' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Why HFAI
                </MobileNavLink>
                <MobileNavLink
                  href="#services"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className={activeSection === 'services' ? 'active' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Services
                </MobileNavLink>
                <MobileNavLink
                  href="#roadmap"
                  onClick={(e) => scrollToSection(e, 'roadmap')}
                  className={activeSection === 'roadmap' ? 'active' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  Roadmap
                </MobileNavLink>
                <MobileNavLink
                  href="/#contact"
                  onClick={(e) => { 
                    scrollToSection(e, 'contact');
                    setIsMenuOpen(false); 
                  }}
                  className={activeSection === 'contact' ? 'active' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    color: 'var(--neon-teal)',
                    textShadow: 'var(--text-glow-teal)'
                  }}
                >
                  Contact Us
                </MobileNavLink>
              </MobileNavLinks>
            </MobileMenu>
          )}
        </AnimatePresence>

        <ProgressBar
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </HeaderContainer>
    </>
  );
}

export default Header;
