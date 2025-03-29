import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import handDrawnCircle from '../assets/liness.svg';
import castingImage from '../assets/cast.png';
import { useNavigate } from 'react-router-dom';

const CastingSection = styled.section`
  min-height: 100vh;
  padding: 60px 2rem;
  background: linear-gradient(
    rgba(10, 10, 10, 0.85), 
    rgba(10, 10, 10, 0.95)
  ),
  url('/images/casting-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(10, 10, 10, 0.5) 0%,
      rgba(10, 10, 10, 0.8) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 40px 1rem;
    min-height: auto;
    background-attachment: scroll;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  padding: 0 20px;

  span.highlight {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    -webkit-text-fill-color: #f3d250;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    display: inline-block;
    transform: rotate(-2deg);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: rotate(2deg) scale(1.05);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 90%;
    left: 85%;
    width: calc(10% + 80px);
    height: calc(10% + 40px);
    transform: translate(-50%, -50%);
    background: url(${handDrawnCircle}) no-repeat center;
    background-size: contain;
    z-index: -1;
    filter: drop-shadow(0 0 5px rgba(207, 198, 74, 0.1));
    opacity: 0.8;
    mix-blend-mode: overlay;
    animation: scrambleIn 1s ease-out forwards;
    transform-origin: center;

    @media (max-width: 768px) {
      top: 80%;
      left: 70%;
      width: calc(15% + 60px);
      height: calc(15% + 30px);
      transform: translate(-50%, -50%) rotate(-15deg);
    }

    @media (max-width: 480px) {
      top: 95%;
      left: 55%;
      width: calc(20% + 40px);
      height: calc(20% + 20px);
      transform: translate(-50%, -50%) rotate(-10deg);
    }
  }

  @keyframes scrambleIn {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }
  }
`;

const Description = styled.p`
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  margin: 0 auto 2rem;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NewsletterButton = styled(motion.button)`
  display: inline-block;
  padding: 1.2rem 3rem;
  background: rgba(207, 198, 74, 0.1);
  color: #fff;
  border: 1px solid rgba(207, 198, 74, 0.2);
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(207, 198, 74, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(207, 198, 74, 0.2);
  }

  @media (max-width: 480px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
  }
`;

const CastingImage = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  height: 300px;
  margin: 1.5rem auto;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    height: 200px;
    margin: 1rem auto;
  }
`;

function Casting() {
  const navigate = useNavigate();

  return (
    <CastingSection>
      <Container>
        <Title>Want to Feature on <span className="highlight">Cruise</span>?</Title>
        <Description>
          Check out which shows we're currently casting for and shoot your shot!
        </Description>
        
        <CastingImage
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={castingImage}
            alt="Cruise TV Casting" 
          />
        </CastingImage>

        <NewsletterButton 
          onClick={() => navigate('/casting')}
        >
          Apply Now
        </NewsletterButton>
      </Container>
    </CastingSection>
  );
}

export default Casting; 