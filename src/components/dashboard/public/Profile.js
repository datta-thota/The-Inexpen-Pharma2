import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Divider, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const location = useLocation();
  const from = location.state?.from; 

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserDetails({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '', 
      });
    }
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component={motion.h1}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        gutterBottom
        color="primary"
        align="center"
      >
        Your Profile
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" color="secondary">
              Personal Information
            </Typography>
            <Box mt={2}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={userDetails.firstName}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={userDetails.lastName}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={userDetails.email}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={userDetails.phoneNumber}
                disabled
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>

          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
          <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} href='/'>
            Log Out
          </Button>

          {/* Conditional Rendering for Dashboard Button */}
          <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" href="/public-dashboard">
                 Dashboard
              </Button>
                     </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
