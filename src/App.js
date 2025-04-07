import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Element } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LatestEpisodes from './components/About';
import Projects from './components/casting';
import Contact from './components/Contact';
import SocialLinks from './components/SocialLinks';
import GlobalStyle from './styles/GlobalStyle';
import Team from './components/Team';
import CastingPage from './pages/CastingPage';
import AboutUs from './components/AboutUs';
import AdminCastingPage from './pages/AdminCastingPage';

const MotionElement = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  perspective: 1000px;
  
  &:hover {
    z-index: 2;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (min-width: 769px) {
    margin-bottom: 30px;
  }
`;

// Animation variants for page sections
const pageVariants = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.5
    }
  }
};

// Stagger delay for sections
const containerVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

// Update the scroll reveal animation to be more playful
const scrollRevealVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
    rotate: -5
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
      scale: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }
};

// Add a floating animation for elements
const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Add a styled container for the social links section
const SocialSection = styled(motion.section)`
  padding: 60px 2rem;
  background: #0a0a0a;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 40px 1rem;
  }
`;

// Add this new component for playful background
const PlayfulBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    rgba(255,255,255,0.03) 0%,
    rgba(0,0,0,0) 50%);
`;

function MainContent() {
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <motion.div 
      className="App"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      ref={scrollRef}
    >
      <Navbar showTeamLink={true} isTeamPage={false} />
      
      <MotionElement
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Element name="home">
          <Hero />
        </Element>
      </MotionElement>

      <MotionElement
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        animate={floatingAnimation}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Element name="about">
          <LatestEpisodes />
        </Element>
      </MotionElement>

      <MotionElement
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        animate={floatingAnimation}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Element name="projects">
          <Projects />
        </Element>
      </MotionElement>

      <MotionElement
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        animate={floatingAnimation}
        viewport={{ once: true, amount: 0.3 }}
      >
        <SocialSection>
          <SocialLinks />
        </SocialSection>
      </MotionElement>
      <br></br>
      <br></br>
    </motion.div>
  );
}

function TeamPage() {
  return (
    <>
      <Navbar showTeamLink={false} />
      <Team />
    </>
  );
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <GlobalStyle />
        <PlayfulBackground 
          animate={{
            background: [
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 50%)",
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 50%)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/casting" element={<CastingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin/casting" element={<AdminCastingPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
