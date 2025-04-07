import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const CastingPageSection = styled(motion.section)`
  min-height: 100vh;
  padding: 80px 2rem;
  background: rgb(3, 3, 3);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
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

const CastingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CastingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const RoleTitle = styled.h3`
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const RoleDetails = styled.div`
  color: #ddd;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RoleRequirements = styled.ul`
  color: #bbb;
  font-size: 0.9rem;
  margin: 1rem 0;
  padding-left: 1.2rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-top: 1rem;
  background: ${props => props.open ? 'rgba(46, 196, 84, 0.2)' : 'rgba(255, 59, 59, 0.2)'};
  color: ${props => props.open ? '#2ec454' : '#ff3b3b'};
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  background: rgb(20, 20, 20);
  border-radius: 20px;
  padding: 2rem;
  z-index: 1100;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
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

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const ExternalLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(46, 196, 84, 0.2);
  color: #2ec454;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(46, 196, 84, 0.3);
  }
`;

const DeadlineText = styled.div`
  color: #888;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '📅';
    font-size: 1rem;
  }
`;

function CastingPage() {
  const [castingOpportunities, setCastingOpportunities] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCastingOpportunities();
  }, []);

  const fetchCastingOpportunities = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/castings/');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch opportunities');
      }
      const data = await response.json();
      setCastingOpportunities(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching castings:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('http://localhost:8000/api/applications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          casting: selectedRole.id,
          full_name: formData.get('full_name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          social_media_links: formData.get('social_media_links'),
          role_fit: formData.get('role_fit'),
          experience: formData.get('experience'),
        }),
      });

      if (!response.ok) throw new Error('Failed to submit application');
      
      // Show success message
      alert('Application submitted successfully!');
      setShowModal(false);
    } catch (err) {
      alert('Failed to submit application: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <Title>Available Casting Opportunities</Title>
          <CastingGrid>
            {castingOpportunities.map((role) => (
              <CastingCard
                key={role.id}
                onClick={() => handleRoleClick(role)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RoleTitle>{role.title}</RoleTitle>
                <RoleDetails>{role.description}</RoleDetails>
                <RoleRequirements>
                  {role.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </RoleRequirements>
                <DeadlineText>
                  Deadline: {new Date(role.deadline).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </DeadlineText>
                {role.external_link && (
                  <ExternalLink 
                    href={role.external_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View More Details
                  </ExternalLink>
                )}
                <StatusBadge open={role.status === 'open'}>
                  {role.status === 'open' ? 'Open' : 'Closed'}
                </StatusBadge>
              </CastingCard>
            ))}
          </CastingGrid>
        </Container>

        <AnimatePresence>
          {showModal && (
            <>
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
              />
              <Modal
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
                <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>
                  Apply for: {selectedRole?.title}
                </h2>
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
                    <Label>Why are you perfect for this role?</Label>
                    <TextArea required />
                  </FormGroup>
                  <FormGroup>
                    <Label>Previous Experience</Label>
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
              </Modal>
            </>
          )}
        </AnimatePresence>
      </CastingPageSection>
    </>
  );
}

export default CastingPage; 