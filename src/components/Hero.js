import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import Typewriter from './Typewriter';
import cruiseVideo from '../assets/cruise.mp4';

const HeroSection = styled.section`
  min-height: 100vh;
  padding: 80px 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 1rem;
    min-height: auto;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.7); // Dark overlay
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  color: white;
  position: relative;
  z-index: 2;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 85px);

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  margin-bottom: 1rem;
  line-height: 1.1;
  background: linear-gradient(90deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    font-size: clamp(2rem, 6vw, 2.5rem);
  }
`;

const Subtitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-3px);
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const TypewriterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 60vh;
  text-align: center;
  width: 100%;

  span {
    display: block;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 300;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    min-height: 40vh;
    
    span {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
    }
  }
`;

const TypewriterText = styled.span`
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  
  &::after {
    color: #fff;
  }
`;

function Hero() {
  return (
    <HeroSection>
      <VideoBackground autoPlay muted loop playsInline>
        <source 
          src={cruiseVideo}
          type="video/mp4" 
        />
      </VideoBackground>
      <Overlay />
      <HeroContent>
        <Title></Title>
        <Subtitle>
          <TypewriterContainer>
            <Typewriter 
              text="Real people,
              Real Conversations,
              Real connections." 
              speed={80} 
              delay={500}
            />
            
          </TypewriterContainer>
        </Subtitle>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero; 