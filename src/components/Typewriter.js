import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const TypewriterText = styled.span`
  display: inline-block;
  position: relative;
  text-align: center;
  
  &::after {
    content: '|';
    position: absolute;
    right: -4px;
    width: 1px;
    animation: blink 1s step-start infinite;
    height: 100%;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const Typewriter = ({ text, speed = 100, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Create audio context and oscillator
  const playTypeSound = useCallback(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set sound properties
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // Lower volume

    // Very short beep
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.02);

    // Clean up
    setTimeout(() => {
      gainNode.disconnect();
      oscillator.disconnect();
    }, 100);
  }, []);

  useEffect(() => {
    let timeout;
    
    if (!isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
    }

    if (isTyping && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
        // Play sound for each character
        if (text[displayText.length] !== ' ') {
          playTypeSound();
        }
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text, speed, delay, playTypeSound]);

  // Initialize audio context on first user interaction
  const handleClick = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume();
  };

  return (
    <TypewriterText onClick={handleClick}>
      {displayText}
    </TypewriterText>
  );
};

export default Typewriter; 