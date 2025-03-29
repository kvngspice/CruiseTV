import React from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 100px 2rem;
  background: #0a0a0a;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: #1e3c72;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  color: #fff;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: #666;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  color: #fff;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: #666;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <ContactSection>
      <Container>
        <Title>Get In Touch</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Input type="text" placeholder="Subject" required />
          <TextArea placeholder="Your Message" required />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
      </Container>
    </ContactSection>
  );
}

export default Contact; 