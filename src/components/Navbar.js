import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 75px;
  background: rgba(33, 33, 33, 0.25);
  backdrop-filter: blur(25px);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    width: 90%;
    height: 65px;
    padding: 0 10px;
    justify-content: center;
    background: rgba(33, 33, 33, 0.85);
    border-radius: 16px;
    margin-bottom: 15px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 8px;
  height: 50px;

  @media (max-width: 480px) {
    gap: 12px;
    justify-content: center;
    width: 100%;
    max-width: 320px;
    padding: 0 5px;
  }
`;

const NavItem = styled(motion.div)`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: rgba(255, 255, 255, 0.3);
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const IconTitle = styled.span`
  font-size: 10px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  text-align: center;

  ${NavItem}:hover & {
    opacity: 1;
  }

  @media (max-width: 480px) {
    font-size: 9px;
    letter-spacing: 0.3px;
    margin-top: 2px;
  }
`;

// Add SVG icons
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm0 2.691l6 5.4V19h-3v-6H9v6H6v-8.809l6-5.4z"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7l7 4z"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-6l-7 4V7l7 4z"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
  </svg>
);

// Add new TeamIcon
const TeamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

// Update the Icon styled component
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: white;
  transition: color 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  ${NavItem}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

// Update Logo component to keep its original position
const Logo = styled(motion.div)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  cursor: pointer;

  img {
    height: 40px;
    width: auto;
  }

  @media (max-width: 768px) {
    top: 15px;
    left: 15px;
    
    img {
      height: 32px;
    }
  }
`;

const logoVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  hover: {
    scale: 1.05,
    rotate: [-1, 1, -1, 0],
    transition: {
      duration: 0.3,
      rotate: {
        repeat: Infinity,
        duration: 2,
        ease: "linear"
      }
    }
  }
};

// Create a new styled component for the router link
const RouterNavItem = styled(RouterLink)`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    border-radius: 10px;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

function Navbar({ showTeamLink = true, isTeamPage = false }) {
  const navigate = useNavigate();

  const handleNavClick = (to) => {
    if (isTeamPage) {
      navigate('/', { state: { scrollTo: to } });
    }
  };

  return (
    <>
      <Logo
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <RouterLink to="/">
          <img src={logo} alt="Cruise TV Logo" />
        </RouterLink>
      </Logo>
      <NavContainer>
        <NavLinks>
          <NavItem
            as={isTeamPage ? 'button' : ScrollLink}
            to="home"
            spy={!isTeamPage}
            smooth={!isTeamPage}
            offset={0}
            duration={500}
            activeClass="active"
            onClick={() => isTeamPage && handleNavClick('home')}
          >
            <Icon><HomeIcon /></Icon>
            <IconTitle>Home</IconTitle>
          </NavItem>
          <NavItem
            as={isTeamPage ? 'button' : ScrollLink}
            to="about"
            spy={!isTeamPage}
            smooth={!isTeamPage}
            duration={800}
            offset={0}
            activeClass="active"
            onClick={() => isTeamPage && handleNavClick('about')}
          >
            <Icon><VideoIcon /></Icon>
            <IconTitle>Episodes</IconTitle>
          </NavItem>
          <NavItem
            as={isTeamPage ? 'button' : ScrollLink}
            to="projects"
            spy={!isTeamPage}
            smooth={!isTeamPage}
            offset={0}
            duration={500}
            activeClass="active"
            onClick={() => isTeamPage && handleNavClick('projects')}
          >
            <Icon><ProjectsIcon /></Icon>
            <IconTitle>Casting</IconTitle>
          </NavItem>
          
          {showTeamLink && (
            <RouterNavItem to="/team">
              <Icon><TeamIcon /></Icon>
              <IconTitle>Team</IconTitle>
            </RouterNavItem>
          )}
        </NavLinks>
      </NavContainer>
    </>
  );
}

export default Navbar; 