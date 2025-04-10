import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as ProjectsIcon } from '../assets/projects.svg';
import { ReactComponent as TeamIcon } from '../assets/team.svg';
import { ReactComponent as InfoIcon } from '../assets/info.svg';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Logo = styled(motion.div)`
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 1001;

  img {
    height: 40px;
    width: auto;
  }

  @media (max-width: 768px) {
    img {
      height: 32px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 100px 30px 30px;
    overflow-y: auto;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const HamburgerButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1001;
    padding: 0;

    span {
      width: 30px;
      height: 3px;
      background: white;
      transition: all 0.3s ease;
      position: relative;
      transform-origin: 1px;

      &:first-child {
        transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      }

      &:nth-child(2) {
        opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
        transform: ${({ isOpen }) => isOpen ? 'translateX(20px)' : 'translateX(0)'};
      }

      &:last-child {
        transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
  }
`;

const MobileNavItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(10px);
  }
`;

const MobileNavText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
`;

const NavItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const RouterNavItem = styled(RouterLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const NavText = styled.span`
  @media (max-width: 768px) {
    display: none;
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
    transition: { duration: 0.2 }
  }
};

function Navbar({ showTeamLink = true, isTeamPage = false }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (to) => {
    if (isTeamPage) {
      navigate('/', { state: { scrollTo: to } });
    }
    setIsOpen(false);
  };

  return (
    <>
      <NavContainer>
        <Logo
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <RouterLink to="/" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="Cruise TV Logo" />
          </RouterLink>
        </Logo>

        <NavLinks>
          <NavItem
            as={isTeamPage ? 'button' : ScrollLink}
            to="home"
            spy={!isTeamPage}
            smooth={!isTeamPage}
            offset={0}
            duration={500}
            onClick={() => isTeamPage && handleNavClick('home')}
          >
            <HomeIcon />
            <NavText>Home</NavText>
          </NavItem>
          
          <RouterNavItem to="/casting">
            <ProjectsIcon />
            <NavText>Casting</NavText>
          </RouterNavItem>
          
          {showTeamLink && (
            <RouterNavItem to="/team">
              <TeamIcon />
              <NavText>Team</NavText>
            </RouterNavItem>
          )}

          <RouterNavItem to="/about">
            <InfoIcon />
            <NavText>About Us</NavText>
          </RouterNavItem>
        </NavLinks>

        <HamburgerButton 
          onClick={() => setIsOpen(!isOpen)} 
          isOpen={isOpen}
        >
          <span />
          <span />
          <span />
        </HamburgerButton>
      </NavContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
            <MobileNavLinks>
              <MobileNavItem
                as={isTeamPage ? 'button' : ScrollLink}
                to="home"
                onClick={() => handleNavClick('home')}
                whileHover={{ x: 10 }}
              >
                <HomeIcon />
                <MobileNavText>Home</MobileNavText>
              </MobileNavItem>
              
              <MobileNavItem
                as={RouterLink}
                to="/casting"
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 10 }}
              >
                <ProjectsIcon />
                <MobileNavText>Casting</MobileNavText>
              </MobileNavItem>
              
              {showTeamLink && (
                <MobileNavItem
                  as={RouterLink}
                  to="/team"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 10 }}
                >
                  <TeamIcon />
                  <MobileNavText>Team</MobileNavText>
                </MobileNavItem>
              )}

              <MobileNavItem
                as={RouterLink}
                to="/about"
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 10 }}
              >
                <InfoIcon />
                <MobileNavText>About Us</MobileNavText>
              </MobileNavItem>
            </MobileNavLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar; 