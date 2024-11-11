import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Container maxWidth="md">
        {/* Page Header */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem' },
            fontWeight: 700,
            textAlign: 'center',
            color: '#333',
            mb: 4,
          }}
        >
          About Us
        </Typography>

        {/* Company Introduction */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem' },
            color: '#555',
            textAlign: 'center',
            lineHeight: '1.8',
            mb: 4,
          }}
        >
          At **The Inexpen Pharma**, we are committed to making healthcare accessible and affordable through a seamless platform that connects customers and vendors for the easy exchange and sale of generic medicines across India.
        </Typography>

        {/* Mission Section */}
        <Box
          sx={{
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600,
              color: '#333',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: '#666',
              textAlign: 'center',
              lineHeight: '1.8',
            }}
          >
            To provide a reliable and cost-effective platform for the sale and distribution of generic medicines, ensuring accessibility to quality healthcare for all.
          </Typography>
        </Box>

        {/* Core Values */}
        <Box
          sx={{
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600,
              color: '#333',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Our Core Values
          </Typography>

          <Box component="ul" sx={{ padding: 0, margin: 0, listStyle: 'none' }}>
            <Typography
              component="li"
              variant="body1"
              sx={{
                fontSize: '1.2rem',
                color: '#555',
                textAlign: 'center',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              ✔️ Accessibility: Ensuring healthcare is within reach for everyone.
            </Typography>
            <Typography
              component="li"
              variant="body1"
              sx={{
                fontSize: '1.2rem',
                color: '#555',
                textAlign: 'center',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              ✔️ Affordability: Delivering high-quality generic medicines at affordable prices.
            </Typography>
            <Typography
              component="li"
              variant="body1"
              sx={{
                fontSize: '1.2rem',
                color: '#555',
                textAlign: 'center',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              ✔️ Trust: Building transparent and reliable relationships with our customers and vendors.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
