import React from 'react';
import { Box,Button, Typography, Card, CardContent, Divider, AppBar, Toolbar, Grid2, TextField 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png'; 

const PublicDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="The Inexpen Pharma Logo" style={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h6" component="div">The Inexpen Pharma</Typography>
          </Box>

          <Box>
            <Button color="inherit" onClick={() => navigate('/view-buy-medicines')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>Go to Profile</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box mb={3} sx={{ px: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#4a4a4a' }}>
          Manage your orders, browse medicines, and access saved items easily.
        </Typography>
      </Box>

      <Box mb={4} sx={{ px: 2 }}>
        <TextField 
          variant="outlined" 
          placeholder="Search for medicines..." 
          sx={{ width: '100%' }} 
        />
      </Box>

      <Box sx={{ backgroundColor: '#ffeb3b', padding: '10px', borderRadius: '5px', mb: 4, px: 2 }}>
        <Typography variant="body1" color="black">
          🎉 Get 20% off on your first purchase! Use code: FIRST20
        </Typography>
      </Box>

      <Box mb={4} sx={{ px: 2 }}>
        <Typography variant="h5" sx={{ color: '#ff6f00', fontWeight: 'bold' }}>
          Your Statistics
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Total Orders</Typography>
                <Typography variant="body2">5</Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Total Savings</Typography>
                <Typography variant="body2">₹200</Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Recent Views</Typography>
                <Typography variant="body2">3 Medicines</Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Upcoming Deliveries</Typography>
                <Typography variant="body2">2 Orders</Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>

      <Box mt={4} sx={{ px: 2 }}>
        <Typography variant="h5" sx={{ color: '#ff6f00', fontWeight: 'bold', mb: 2 }}>
          Featured Medicines & Offers
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" color="primary" fontWeight="bold">Exclusive Offers</Typography>
                <Typography variant="body2" color="textSecondary">Get 20% off on your first purchase!</Typography>
                <Button variant="contained" color="secondary" sx={{ mt: 2, width: '100%', borderRadius: '8px' }} onClick={() => navigate('/buy-medicine')}>
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" color="primary" fontWeight="bold">Recently Viewed</Typography>
                <Typography variant="body2" color="textSecondary">Paracetamol, Ibuprofen, Vitamin C</Typography>
                <Button variant="contained" color="secondary" sx={{ mt: 2, width: '100%', borderRadius: '8px' }} onClick={() => navigate('/buy-medicine')}>
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" color="primary" fontWeight="bold">Saved for Later</Typography>
                <Typography variant="body2" color="textSecondary">Check your saved items for future purchase.</Typography>
                <Button variant="contained" color="secondary" sx={{ mt: 2, width: '100%', borderRadius: '8px' }} onClick={() => navigate('/saved-items')}>
                  View Saved Items
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>

      <Box mt={6} sx={{ px: 2 }}>
        <Typography variant="h5" sx={{ color: '#ff6f00', fontWeight: 'bold', mb: 2 }}>
          Recent Orders
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 item xs={12}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" color="primary" fontWeight="bold">Order #12345</Typography>
                <Typography variant="body2" color="textSecondary">3 items - Delivered on 12th October</Typography>
                <Divider sx={{ my: 2 }} />
                <Button variant="outlined" color="primary" sx={{ borderRadius: '8px' }} onClick={() => navigate('/orders')}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>

      <Box mt={6} sx={{ px: 2 }}>
        <Typography variant="h5" sx={{ color: '#ff6f00', fontWeight: 'bold', mb: 2 }}>
          Quick Links
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/track-order')}>Track Order</Button>
          <Button variant="outlined" color="primary" onClick={() => navigate('/customer-support')}>Customer Support</Button>
        </Box>
      </Box>

      <Box mt={6} sx={{ textAlign: 'center', color: '#777' }}>
        <Typography variant="body2">&copy; {new Date().getFullYear()} The Inexpen Pharma. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default PublicDashboard;
