import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box mt={5} py={3} bgcolor="primary.main" color="white">
      <Container>
        <Typography variant="body1" align="center">
          &copy; 2024 Generic Medicine Platform. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
