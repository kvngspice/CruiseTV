import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as VideoIcon } from '../assets/video.svg';
import { ReactComponent as ProjectsIcon } from '../assets/projects.svg';
import { ReactComponent as TeamIcon } from '../assets/team.svg';

const iconColors = {
  home: 'rgba(65, 218, 70, 0.6)', // Green
  episodes: 'rgba(33, 150, 243, 0.3)', // Blue
  casting: 'rgba(244, 67, 54, 0.3)', // Red
  team: 'rgba(204, 124, 63, 0.69)', // Green
};

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
  background: ${props => props.bgColor || 'rgba(255, 255, 255, 0.1)'};
  text-decoration: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0;

  &:hover {
    transform: scale(1.1);
    background: ${props => props.bgColor ? props.bgColor.replace('0.3', '0.4') : 'rgba(255, 255, 255, 0.2)'};
  }

  &.active {
    background: ${props => props.bgColor ? props.bgColor.replace('0.3', '0.5') : 'rgba(255, 255, 255, 0.3)'};
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

// Update the Icon styled component to handle SVG styles
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
    color: currentColor;
    transition: all 0.2s ease;
  }

  @media (max-width: 480px) {
    svg {
      width: 20px;
      height: 20px;
    }
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
  background: ${props => props.bgColor || 'rgba(255, 255, 255, 0.1)'};
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    background: ${props => props.bgColor ? props.bgColor.replace('0.3', '0.4') : 'rgba(255, 255, 255, 0.2)'};
  }

  &.active {
    background: ${props => props.bgColor ? props.bgColor.replace('0.3', '0.5') : 'rgba(255, 255, 255, 0.3)'};
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
            bgColor={iconColors.home}
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
            bgColor={iconColors.episodes}
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
            bgColor={iconColors.casting}
          >
            <Icon><ProjectsIcon /></Icon>
            <IconTitle>Casting</IconTitle>
          </NavItem>
          
          {showTeamLink && (
            <RouterNavItem 
              to="/team"
              bgColor={iconColors.team}
            >
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