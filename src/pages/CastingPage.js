import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const CastingPageSection = styled(motion.section)`
  min-height: 100vh;
  padding: 80px 2rem;
  background: rgb(3, 3, 3);
  position: relative;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #fff;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

function CastingPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <>
      <Navbar />
      <CastingPageSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <Title>Join The Cruise</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Full Name</Label>
              <Input type="text" required />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" required />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input type="tel" />
            </FormGroup>
            <FormGroup>
              <Label>Social Media Links</Label>
              <Input type="text" placeholder="Instagram, TikTok, etc." />
            </FormGroup>
            <FormGroup>
              <Label>Tell us about yourself</Label>
              <TextArea required />
            </FormGroup>
            <FormGroup>
              <Label>Why do you want to join The Cruise?</Label>
              <TextArea required />
            </FormGroup>
            <SubmitButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
            >
              Submit Application
            </SubmitButton>
          </Form>
        </Container>
      </CastingPageSection>
    </>
  );
}

export default CastingPage; 