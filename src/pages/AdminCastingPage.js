import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const AdminPageSection = styled(motion.section)`
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

const AdminGrid = styled.div`
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
`;

const AddButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: rgba(46, 196, 84, 0.2);
  border: none;
  border-radius: 12px;
  color: #2ec454;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(46, 196, 84, 0.3);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  background: ${props => props.variant === 'delete' ? 'rgba(255, 59, 59, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.variant === 'delete' ? '#ff3b3b' : '#fff'};

  &:hover {
    background: ${props => props.variant === 'delete' ? 'rgba(255, 59, 59, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  background: rgb(20, 20, 20);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;

const ExternalLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: #2ec454;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

function AdminCastingPage() {
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCasting, setEditingCasting] = useState(null);

  useEffect(() => {
    fetchCastings();
  }, []);

  const fetchCastings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/castings/', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch opportunities');
      }
      
      const data = await response.json();
      setCastings(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching castings:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requirements = formData.get('requirements').split('\n').filter(req => req.trim());

    const castingData = {
      title: formData.get('title'),
      description: formData.get('description'),
      requirements: requirements,
      external_link: formData.get('external_link'),
      deadline: formData.get('deadline'),
      status: 'open'
    };

    try {
      const url = editingCasting.id 
        ? `http://localhost:8000/api/castings/${editingCasting.id}/`
        : 'http://localhost:8000/api/castings/';

      const response = await fetch(url, {
        method: editingCasting.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(castingData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save casting');
      }
      
      await fetchCastings();
      setEditingCasting(null);
    } catch (err) {
      console.error('Error:', err);
      alert('Error saving casting: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this casting?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/castings/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete casting');
      
      fetchCastings();
    } catch (err) {
      alert('Error deleting casting: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <AdminPageSection>
        <Container>
          <Title>Manage Casting Opportunities</Title>
          
          <AddButton
            onClick={() => setEditingCasting({})}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            + Add New Casting
          </AddButton>

          <AdminGrid>
            {castings.map(casting => (
              <CastingCard key={casting.id}>
                <h3>{casting.title}</h3>
                <p>{casting.description}</p>
                {casting.external_link && (
                  <ExternalLink 
                    href={casting.external_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View External Link
                  </ExternalLink>
                )}
                <ButtonGroup>
                  <Button onClick={() => setEditingCasting(casting)}>Edit</Button>
                  <Button 
                    variant="delete" 
                    onClick={() => handleDelete(casting.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CastingCard>
            ))}
          </AdminGrid>

          <AnimatePresence>
            {editingCasting && (
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingCasting(null)}
              >
                <ModalContainer
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <CloseButton onClick={() => setEditingCasting(null)}>×</CloseButton>
                  <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>
                    {editingCasting.id ? 'Edit Casting' : 'New Casting'}
                  </h2>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label>Title</Label>
                      <Input 
                        name="title" 
                        defaultValue={editingCasting.title} 
                        required 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Description</Label>
                      <TextArea 
                        name="description" 
                        defaultValue={editingCasting.description} 
                        required 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Requirements (one per line)</Label>
                      <TextArea 
                        name="requirements" 
                        defaultValue={editingCasting.requirements?.join('\n')} 
                        required 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>External Link (Optional)</Label>
                      <Input 
                        name="external_link" 
                        type="url"
                        placeholder="https://example.com"
                        defaultValue={editingCasting.external_link} 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Deadline</Label>
                      <Input 
                        type="date" 
                        name="deadline" 
                        defaultValue={editingCasting.deadline} 
                        required 
                      />
                    </FormGroup>
                    <ButtonGroup>
                      <Button type="submit">Save</Button>
                      <Button 
                        type="button" 
                        variant="delete" 
                        onClick={() => setEditingCasting(null)}
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </Form>
                </ModalContainer>
              </Overlay>
            )}
          </AnimatePresence>
        </Container>
      </AdminPageSection>
    </>
  );
}

export default AdminCastingPage; 