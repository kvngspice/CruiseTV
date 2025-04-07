import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const TeamSection = styled(motion.section)`
  min-height: 100vh;
  padding: 100px 2rem;
  background: #0a0a0a;
  position: relative;

  @media (max-width: 768px) {
    padding: 80px 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(90deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
  max-width: 1000px;
  margin: 0 auto;
`;

const WindowControls = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
`;

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.close {
    background: #ff5f57;
    border: 1px solid #e0443e;
  }

  &.minimize {
    background: #febc2e;
    border: 1px solid #e1a116;
  }

  &.maximize {
    background: #28c840;
    border: 1px solid #17ac2c;
  }
`;

const TeamMember = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);

    ${WindowControls} {
      opacity: 1;
    }
  }
`;

const MemberImage = styled.div`
  width: 120px;
  height: 150px;
  border-radius: 12px;
  margin: 0 auto 1.2rem;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 10px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const MemberName = styled.h3`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  letter-spacing: 0.5px;
`;

const MemberRole = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.3px;
`;

const teamMembers = [
  {
    name: "DAYO",
    role: "CEO & FOUNDER",
    image: "/images/dayo.png"
  },
  {
    name: "AYOMIDE",
    role: "PRODUCER",
    image: "/images/ayomide.png"
  }
  ,
  {
    name: "SAMUEL",
    role: "LEAD EDITOR",
    image: "/images/samuel.png"
  },
  {
    name: "MELODY",
    role: "CASTING DIRECTOR",
    image: "/images/melody.png"
  },
  {
    name: "GLORY",
    role: "SOCIAL MEDIA MANAGER",
    image: "/images/glory.png"
  },
  {
    name: "PASHEDA",
    role: "PARTNERSHIP MANAGER",
    image: "/images/pasheda.png"
  },
  {
    name: "WOYE",
    role: "SENIOR EDITOR",
    image: "/images/woye.png"
  },
  {
    name: "IRORO",
    role: "AUDIO ENGINEER",
    image: "/images/iroro.png"
  },
  {
    name: "FEMI",
    role: "SHORTS EDITOR",
    image: "/images/femi.png"
  },
  {
    name: "FADE",
    role: "JUNIOR EDITOR",
    image: "/images/fade.png"
  }
  // Add more team members here
];

// Add page transition variants
const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

// Add item animation variants
const itemAnimation = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

function Team() {
  return (
    <>
      <Navbar showTeamLink={false} isTeamPage={true} />
      <TeamSection
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Container>
          <Title variants={itemAnimation}>
            Our Team
          </Title>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                variants={itemAnimation}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
              >
                <WindowControls>
                  <WindowButton className="close" />
                  <WindowButton className="minimize" />
                  <WindowButton className="maximize" />
                </WindowControls>
                <MemberImage>
                  <motion.img 
                    src={member.image} 
                    alt={member.name}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  />
                </MemberImage>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </TeamMember>
            ))}
          </TeamGrid>
        </Container>
      </TeamSection>
    </>
  );
}

export default Team; 