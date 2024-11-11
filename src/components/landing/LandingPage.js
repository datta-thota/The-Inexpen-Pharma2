import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll';
import backgroundImage from '../../assets/medical-background.jpg';
import logo from '../../assets/logo.png';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


const LandingPage = () => {
  const scrollToSection = (id) => {
    scroll.scrollTo(document.getElementById(id).offsetTop - 70, {
      smooth: true,
      duration: 1000,
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        {/* Header Links */}
        <Box sx={{ position: 'absolute', top: '20px', right: '20px', zIndex: 3, display: 'flex', gap: 2 }}>
  <Button
    variant="contained"
    onClick={() => scrollToSection('services')}
    sx={{
      backgroundColor: '#808080',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#555',
      },
    }}
  >
    Our Services
  </Button>
  <Button
    variant="contained"
    onClick={() => scrollToSection('testimonials')}
    sx={{
      backgroundColor: '#808080',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#555',
      },
    }}
  >
    Testimonials
  </Button>
  <Button
    variant="contained"
    onClick={() => scrollToSection('contact')}
    sx={{
      backgroundColor: '#808080',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#555',
      },
    }}
  >
    Contact Us
  </Button>
  <Button
    variant="contained"
    component={Link}
    to="/about-us"
    sx={{
      backgroundColor: '#808080',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#555',
      },
    }}
  >
    About Us
  </Button>
</Box>


        {/* Logo and Title */}
        <Container sx={{ textAlign: 'center', zIndex: 2 }}>
          <Box component={motion.div} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <img src={logo} alt="The Inexpen Pharma Logo" style={{ width: '150px' }} />
            <Typography variant="h1" color="primary" sx={{ fontSize: { xs: '2.5rem', sm: '4rem' }, color: '#333', fontWeight: 700 }}>
              The Inexpen Pharma
            </Typography>
            <Typography variant="h5" color="textSecondary">Buy and Sell Generic Medicines Across India.</Typography>
          </Box>
        </Container>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
          }}
          component={motion.div}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mx: 2,
              px: 4,
              py: 1,
              fontSize: '1.2rem',
              fontWeight: 600,
              backgroundColor: '#333', // Dark button background
              color: '#fff',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
            component={Link}
            to="/public-login"
          >
            Public Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              mx: 2,
              px: 4,
              py: 1,
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#333', // Dark border and text
              borderColor: '#333',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: '#333',
              },
            }}
            component={Link}
            to="/vendor-login"
          >
            Vendor Login
          </Button>
        </Box>
      </Box>

         
      {/* Generic Medicines Awareness Section */}
{/* Generic Medicines Awareness Section */}
<Box id="generic-medicines" sx={{ py: 10, backgroundColor: '#f0f8ff', textAlign: 'center' }}>
  <Typography variant="h3" sx={{ mb: 5, fontWeight: 700, color: '#2c3e50' }}>
    Why Choose Generic Medicines?
  </Typography>
  <Container maxWidth="md">
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          color: '#34495e',
          mb: 3,
          px: 2,
          maxWidth: '800px',
          lineHeight: 1.6,
        }}
      >
        Generic medicines offer the <strong>same quality, safety, and effectiveness</strong> as brand-name drugs but at a fraction of the cost.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.1rem',
          color: '#555',
          mb: 4,
          lineHeight: 1.8,
          maxWidth: '800px',
        }}
      >
        These medicines contain the same active ingredients as their brand-name counterparts and are approved by health authorities to ensure high standards. By choosing generics, you can get the treatment you need without the high costs.
      </Typography>
    </Box>

    {/* Highlighted Benefits */}
    <Grid container spacing={4} sx={{ mt: 5 }}>
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 4, backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#00796b' }}>
            Affordable Healthcare
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#455a64' }}>
            Generic medicines make healthcare accessible to everyone, reducing the burden of medical expenses.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 4, backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#00796b' }}>
            Safe & Effective
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#455a64' }}>
            Approved by regulatory authorities, generics undergo strict testing to ensure the same safety and quality as branded medicines.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 4, backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#00796b' }}>
            Widespread Accessibility
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#455a64' }}>
            With generics, more people have access to essential medicines, supporting public health and well-being.
          </Typography>
        </Box>
      </Grid>
    </Grid>

    {/* Call to Action */}
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: '1.2rem',
          color: '#2c3e50',
          fontWeight: 600,
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}
      >
        Choosing generics helps make healthcare affordable and accessible for everyone. Next time you need a prescription, ask your healthcare provider about generics!
      </Typography>
      <Link to="/generic" style={{ textDecoration: 'none' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 4,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          backgroundColor: '#00796b',
          '&:hover': { backgroundColor: '#004d40' },
        }}
      >
        Learn More About Generic Medicines
      </Button>
    </Link>
    </Box>
  </Container>
</Box>

{/* Our Services Section */}
<Box id="services" sx={{ py: 8, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Our Services</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <LocalPharmacyIcon sx={{ fontSize: '3rem', color: '#1976d2', mb: 2 }} />
              <Typography variant="h6">Wide Range of Medicines</Typography>
              <Typography>Access a broad selection of affordable, quality medicines.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <PaymentIcon sx={{ fontSize: '3rem', color: '#1976d2', mb: 2 }} />
              <Typography variant="h6">Secure Payments</Typography>
              <Typography>Seamless, secure payment options for safe transactions.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <SupportAgentIcon sx={{ fontSize: '3rem', color: '#1976d2', mb: 2 }} />
              <Typography variant="h6">24/7 Support</Typography>
              <Typography>Our customer service team is always available to help.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Testimonials Section */}
      <Box id="testimonials" sx={{ py: 8, backgroundColor: '#fff', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Testimonials</Typography>
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="body1" sx={{ mb: 1, fontStyle: 'italic' }}>"Inexpen Pharma has made medicine purchase so easy!" - Satisfied Customer</Typography>
          <Typography variant="body1" sx={{ mb: 1, fontStyle: 'italic' }}>"Excellent customer service and quick delivery." - Regular User</Typography>
        </Box>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 8, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Contact Us</Typography>
        <Typography>For any inquiries, reach us at theinexpenpharma@gmail.com or call us at 9100604721 </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
