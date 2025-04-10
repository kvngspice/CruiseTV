import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import handDrawnCircle from '../assets/liness.svg';
import Navbar from './Navbar';

const AboutUsSection = styled.section`
  min-height: 100vh;
  padding: 100px 2rem 120px;
  background: linear-gradient(
    rgba(10, 10, 10, 0.95), 
    rgba(10, 10, 10, 0.85)
  ),
  url('/images/about-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  
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
    padding: 80px 1rem 100px;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
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
    top: 50%;
    left: 65%;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    background: url(${handDrawnCircle}) no-repeat center;
    background-size: contain;
    z-index: -1;
    filter: drop-shadow(0 0 5px rgba(207, 198, 74, 0.1));
    opacity: 0.8;
    mix-blend-mode: overlay;
    animation: scrambleIn 1s ease-out forwards;
    transform-origin: center;
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

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContentSection = styled(motion.div)`
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: #f3d250;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ddd;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ValuesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem;
`;

const ValueItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ddd;
  margin-bottom: 1rem;
  padding-left: 30px;
  position: relative;

  &::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: #f3d250;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

function AboutUs() {
  return (
    <>
      <Navbar showTeamLink={true} isTeamPage={true} />
      <AboutUsSection>
        <Container>
          <Title>About <span className="highlight">Cruise</span></Title>
          
          <ContentSection
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>Our Story</SectionTitle>
            <Paragraph>
              Cruise TV was founded in 2022 with a simple mission: to create authentic, engaging content that resonates with real people. What started as a small passion project among friends has grown into a dynamic platform for storytelling, entertainment, and community building.
            </Paragraph>
            <Paragraph>
              Our journey began when a group of filmmakers, writers, and creative minds came together with the shared belief that entertainment should be both accessible and meaningful. We wanted to create shows that reflect diverse experiences and perspectives, giving voice to stories that often go untold in mainstream media.
            </Paragraph>
            <Paragraph>
              Today, Cruise TV continues to grow, pushing boundaries and exploring new formats while staying true to our original vision. We're proud of how far we've come and excited about where we're headed next.
            </Paragraph>
          </ContentSection>
          
          <ContentSection
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle>Our Mission</SectionTitle>
            <Paragraph>
              At Cruise TV, we believe in the power of authentic storytelling to connect, inspire, and transform. Our mission is to create content that not only entertains but also challenges perspectives, sparks conversations, and builds community.
            </Paragraph>
            <Paragraph>
              We're committed to amplifying diverse voices and providing a platform for emerging talent. Through our shows, we aim to explore the full spectrum of human experience, from the everyday to the extraordinary, always with honesty, empathy, and a touch of humor.
            </Paragraph>
          </ContentSection>
          
          <ContentSection
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle>Our Values</SectionTitle>
            <ValuesList>
              <ValueItem>
                <strong>Authenticity:</strong> We believe in keeping it real. Our content reflects genuine experiences and emotions, never manufactured or contrived.
              </ValueItem>
              <ValueItem>
                <strong>Inclusivity:</strong> We celebrate diversity in all its forms and are committed to representing a wide range of perspectives and experiences.
              </ValueItem>
              <ValueItem>
                <strong>Creativity:</strong> We push creative boundaries, experimenting with new formats and approaches to storytelling.
              </ValueItem>
              <ValueItem>
                <strong>Community:</strong> We value the connections we build with our audience and strive to create content that brings people together.
              </ValueItem>
              <ValueItem>
                <strong>Quality:</strong> We maintain high standards in everything we do, from production values to the integrity of our storytelling.
              </ValueItem>
            </ValuesList>
          </ContentSection>
          
          <ContentSection
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle>Join Our Journey</SectionTitle>
            <Paragraph>
              Cruise TV is more than just a platform—it's a community. We invite you to be part of our story by watching our shows, participating in our casting calls, following us on social media, and sharing your feedback.
            </Paragraph>
            <Paragraph>
              Whether you're a viewer, a creator, or someone who shares our passion for authentic storytelling, there's a place for you in the Cruise TV family. Together, we're creating entertainment that matters.
            </Paragraph>
          </ContentSection>
        </Container>
      </AboutUsSection>
    </>
  );
}

export default AboutUs; 