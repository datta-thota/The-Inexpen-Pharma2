import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const Contact = () => {
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
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#666', fontSize: '1.2rem' }}>
          If you have any questions or need assistance, feel free to reach out to us!
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
          Email: <a href="mailto:theinexpenpharma@gmail.com">theinexpenpharma@gmail.com</a>
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: '#333' }}>
          Phone: 9100604721
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            py: 1.5,
            px: 4,
            backgroundColor: '#333',
            '&:hover': {
              backgroundColor: '#555',
            },
          }}
          onClick={() => window.open('mailto:dattathota090@gmail.com')}
        >
          Send an Email
        </Button>

        <Box mt={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => window.history.back()}
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
            Go Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
