import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, Button, Card, CardContent, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/logo.png'; 

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/inexpen_api/get_sales.php') // Adjust if using a different file name or endpoint
      .then(response => setSalesData(response.data))
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);
  
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="The Inexpen Pharma Logo" style={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h6" color="white">The Inexpen Pharma</Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={() => navigate('/view-buy-medicines')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>Go to Profile</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Vendor Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '20px' }}>
          Manage your products, view sales reports, and track inventory.
        </Typography>

        {/* Quick Actions */}
        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'all 0.2s ease-in-out' } }}>
                <CardContent>
                  <Typography variant="h6" color="primary">Add New Product</Typography>
                  <Typography variant="body2" color="textSecondary">Easily add new products to your inventory.</Typography>
                  <Button variant="contained" color="secondary" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/add-product')}>
                    Add Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'all 0.2s ease-in-out' } }}>
                <CardContent>
                  <Typography variant="h6" color="primary">Sales Reports</Typography>
                  <Typography variant="body2" color="textSecondary">View your sales performance and trends.</Typography>
                  <Button variant="contained" color="secondary" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/sales-reports')}>
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* New Quick Actions for Order and Stock Management */}
        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'all 0.2s ease-in-out' } }}>
                <CardContent>
                  <Typography variant="h6" color="primary">Order Management</Typography>
                  <Typography variant="body2" color="textSecondary">Manage and track customer orders.</Typography>
                  <Button variant="contained" color="secondary" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/vendor-orders')}>
                    View Orders
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'all 0.2s ease-in-out' } }}>
                <CardContent>
                  <Typography variant="h6" color="primary">Stock Management</Typography>
                  <Typography variant="body2" color="textSecondary">Manage your inventory levels.</Typography>
                  <Button variant="contained" color="secondary" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/vendor-stock')}>
                    View Stock
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Sales Overview */}
        <Box mt={6}>
          <Typography variant="h5" color="secondary" gutterBottom>
            Sales Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">Sales Data for October</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Sales: {salesData ? `₹${salesData.total}` : 'Loading...'}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button variant="outlined" color="primary" onClick={() => navigate('/sales-details')} sx={{ marginRight: 2 }}>
                    View Detailed Sales
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => navigate('/vendor-communication-sales')}>
                    Communicate & Exchange Stock
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default VendorDashboard;
