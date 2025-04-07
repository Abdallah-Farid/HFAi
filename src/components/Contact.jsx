import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactSection = styled.section`
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 2.5rem 0 3rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 40%;
    height: 70%;
    background: radial-gradient(
      circle at center,
      rgba(120, 60, 220, 0.15) 0%,
      rgba(120, 60, 220, 0.05) 40%,
      rgba(120, 60, 220, 0) 70%
    );
    filter: blur(60px);
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -5%;
    width: 40%;
    height: 70%;
    background: radial-gradient(
      circle at center,
      rgba(0, 210, 150, 0.15) 0%,
      rgba(0, 210, 150, 0.05) 40%,
      rgba(0, 210, 150, 0) 70%
    );
    filter: blur(60px);
    z-index: -1;
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 2.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1.25rem;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 700;
  background: linear-gradient(135deg, rgba(0, 210, 150, 1), rgba(120, 60, 220, 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 12px rgba(0, 210, 150, 0.2));
  font-family: var(--font-heading);
  letter-spacing: var(--title-letter-spacing);
  margin-bottom: 1.75rem;
  
  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 3vw, 1.2rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 3rem;
  max-width: 90%;
  font-family: var(--font-body);
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  background: rgba(15, 23, 42, 0.6);
  padding: 2.75rem;
  border-radius: 1rem;
  backdrop-filter: blur(12px);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 2.25rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.75rem;
    gap: 1.25rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.25rem;
    padding: 0.15rem;
    background: linear-gradient(135deg, 
      rgba(0, 210, 150, 0.3), 
      rgba(120, 60, 220, 0.3), 
      rgba(210, 40, 180, 0.3), 
      rgba(0, 210, 150, 0.3));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.3;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 0.5;
  }
  
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.25),
    0 0 18px rgba(0, 210, 150, 0.15),
    0 0 25px rgba(120, 60, 220, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.35rem;
  font-family: var(--font-display);
  letter-spacing: 0.01em;
`;

const Input = styled.input`
  padding: 0.9rem 1.25rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(120, 60, 220, 0.25);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  font-family: var(--font-body);
  transition: all 0.3s ease-out;
  
  &:focus {
    outline: none;
    border-color: rgba(0, 210, 150, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 210, 150, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TextArea = styled.textarea`
  padding: 1.1rem 1.25rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(120, 60, 220, 0.25);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  font-family: var(--font-body);
  resize: vertical;
  min-height: 160px;
  transition: all 0.3s ease-out;
  
  &:focus {
    outline: none;
    border-color: rgba(0, 210, 150, 0.5);
    box-shadow: 0 0 0 2px rgba(0, 210, 150, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SubmitButton = styled.button`
  padding: 1.1rem 2.25rem;
  background: linear-gradient(135deg, 
    rgba(0, 210, 150, 0.15), 
    rgba(120, 60, 220, 0.15));
  color: white;
  border: 1px solid rgba(0, 210, 150, 0.25);
  border-radius: 0.75rem;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-display);
  letter-spacing: 0.01em;
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.9rem 1.75rem;
    width: 100%;
  }
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(0, 210, 150, 0.2), 
      rgba(120, 60, 220, 0.2));
    transform: translateY(-2px);
    box-shadow: 
      0 5px 15px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(0, 210, 150, 0.1);
  }
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  background: linear-gradient(135deg, 
    rgba(0, 210, 150, 0.15), 
    rgba(120, 60, 220, 0.15));
  border-radius: 0.75rem;
  color: var(--neon-teal);
  flex-shrink: 0;
  border: 1px solid rgba(0, 210, 150, 0.15);
  transition: all 0.3s ease-out;
  
  @media (max-width: 480px) {
    width: 2.75rem;
    height: 2.75rem;
  }
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    
    @media (max-width: 480px) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, 
      rgba(0, 210, 150, 0.2), 
      rgba(120, 60, 220, 0.2));
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.35rem;
  font-family: var(--font-display);
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-family: var(--font-body);
  letter-spacing: 0.01em;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the form data to a server
    console.log(formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <ContactSection id="contact" ref={ref}>
      <ContactContainer>
        <ContactInfo 
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </Title>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's connect! Fill out the form below, or reach out via phone or email. We're excited to hear about your project.
          </Description>
          
          <ContactInfoItem>
            <IconWrapper>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
              </svg>
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Call Us</InfoTitle>
              <InfoText>
                <a href="tel:+15551234567">+1 (555) 123-4567</a><br />
                Monday - Friday: 9am - 5pm
              </InfoText>
            </InfoContent>
          </ContactInfoItem>
          
          <ContactInfoItem>
            <IconWrapper>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
              </svg>
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Email Us</InfoTitle>
              <InfoText>
                <a href="mailto:info@hfaihub.com">info@hfaihub.com</a><br />
                We'll respond within 24 hours
              </InfoText>
            </InfoContent>
          </ContactInfoItem>
        </ContactInfo>
        
        <ContactForm
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Your Message</Label>
            <TextArea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </SubmitButton>
          
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#00D1B2"/>
              </svg>
              <span>Message sent successfully!</span>
            </motion.div>
          )}
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  );
}

export default Contact;
