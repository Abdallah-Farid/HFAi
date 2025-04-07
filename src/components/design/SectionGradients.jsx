import React from 'react';
import styled from 'styled-components';

// Base gradient element
const GradientElement = styled.div`
  position: absolute;
  border-radius: ${props => props.borderRadius || '50%'};
  filter: blur(${props => props.blur || '180px'});
  opacity: ${props => props.opacity || '0.4'};
  pointer-events: none;
  z-index: 0;
  background: ${props => props.gradient};
  width: ${props => props.size || '800px'};
  height: ${props => props.height || props.size || '800px'};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  transform: ${props => props.transform || 'none'};
`;

// Empty header gradients
export const HeaderGradients = () => (
  <>
    {/* Removed persistent gradients */}
  </>
);

// Keep Hero gradient as requested
export const HeroGradients = () => (
  <>
    <GradientElement 
      gradient="radial-gradient(circle, rgba(0, 210, 150, 0.6) 0%, rgba(0, 210, 150, 0.3) 40%, rgba(0, 210, 150, 0) 80%)"
      size="1000px"
      top="300px"
      left="calc(50% - 500px)" /* Center horizontally */
      opacity="0.45"
    />
  </>
);

// Empty WhyHFAI gradients - using global background instead
export const WhyHFAIGradients = () => (
  <>
    {/* Using global background from App.jsx instead of section-specific gradients */}
  </>
);

// More creative Services gradients
export const ServicesGradients = () => (
  <>
    {/* Single, large mixed gradient in bottom right */}
    <GradientElement 
      gradient="conic-gradient(from 225deg at 50% 50%, rgba(0, 210, 150, 0.6) 0%, rgba(80, 100, 240, 0.5) 25%, rgba(210, 40, 180, 0.6) 50%, rgba(0, 210, 150, 0.5) 75%, rgba(0, 210, 150, 0.6) 100%)"
      size="1800px"
      borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
      bottom="-900px"
      right="-900px"
      opacity="0.3"
      blur="250px"
    />
  </>
);

// Single, angled gradient for Roadmap
export const RoadmapGradients = () => (
  <>
    {/* Diagonal green gradient */}
    <GradientElement 
      gradient="linear-gradient(135deg, rgba(0, 210, 150, 0.6) 0%, rgba(0, 210, 150, 0.3) 40%, rgba(0, 210, 150, 0) 80%)"
      size="1000px"
      height="1600px"
      borderRadius="20% 80% 50% 50% / 25% 80% 20% 75%"
      top="-200px"
      left="-700px"
      opacity="0.35"
      transform="rotate(25deg)"
      blur="180px"
    />
  </>
);

// Single, distinctive gradient for Footer
export const FooterGradients = () => (
  <>
    {/* Magenta gradient with unique shape */}
    <GradientElement 
      gradient="radial-gradient(circle at 70% 30%, rgba(210, 40, 180, 0.6) 0%, rgba(210, 40, 180, 0.3) 40%, rgba(210, 40, 180, 0) 80%)"
      size="1200px"
      height="1400px"
      borderRadius="70% 30% 50% 50% / 40% 40% 60% 60%"
      bottom="-600px"
      right="-800px"
      opacity="0.3"
      blur="200px"
    />
  </>
);
