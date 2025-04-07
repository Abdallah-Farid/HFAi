import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyHFAI from './components/WhyHFAI';
import Services from './components/Services';
import Roadmap from './components/Roadmap';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background: #0A0F1F; /* Updated to match design system */
  width: 100%;
  scroll-behavior: smooth; /* Add smooth scrolling */
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  
  /* Add more vertical spacing between sections */
  & > * {
    margin-bottom: 3rem;
  }
  
  /* Add extra space after specific sections */
  & > *:nth-child(3),
  & > *:nth-child(5) {
    margin-bottom: 6rem;
  }
  
  /* Adjust spacing for mobile devices */
  @media (max-width: 768px) {
    & > * {
      margin-bottom: 2rem;
    }
    
    & > *:nth-child(3),
    & > *:nth-child(5) {
      margin-bottom: 4rem;
    }
  }
  
  @media (max-width: 480px) {
    & > * {
      margin-bottom: 1.5rem;
    }
    
    & > *:nth-child(3),
    & > *:nth-child(5) {
      margin-bottom: 3rem;
    }
  }
`;

function App() {
  useEffect(() => {
    // Apply smooth scrolling to the HTML element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle direct hash navigation (e.g., when page loads with a hash in URL)
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure proper scrolling after page load
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <AppContainer>
      <ContentWrapper>
        <Header />
        <Hero />
        <WhyHFAI />
        <Services />
        <Roadmap />
        <Contact />
        <Footer />
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
