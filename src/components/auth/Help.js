import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f5',
        padding: '20px',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
          How can we help you?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#666', fontSize: '1.2rem' }}>
          If you're experiencing issues or have any questions, feel free to contact our support team.
          We are here to help you navigate through your experience.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/contact')}
          sx={{
            py: 1.5,
            px: 4,
            backgroundColor: '#333',
            '&:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          Contact Support
        </Button>

        <Box mt={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/public-login')}
            sx={{
              mt: 2,
              color: '#333',
              borderColor: '#333',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                borderColor: '#333',
              },
            }}
          >
            Back to Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Help;
