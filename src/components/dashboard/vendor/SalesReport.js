import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  AppBar,
  Toolbar,
  Box,
  TextField,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/logo.png'; 
const SalesReport = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    axios.get('/api/vendor/sales')
      .then(response => {
        setSalesData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const { start, end } = dateRange;
    const filtered = salesData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= new Date(start) && saleDate <= new Date(end);
    });
    setFilteredData(filtered);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="The Inexpen Pharma Logo" style={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h6" color="white">The Inexpen Pharma</Typography>
          </Box>
          <Button color="inherit" onClick={() => navigate('/vendor-dashboard')}>Back to Dashboard</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Sales Reports
        </Typography>

        <form onSubmit={handleFilterSubmit}>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                name="start"
                value={dateRange.start}
                onChange={handleFilterChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                name="end"
                value={dateRange.end}
                onChange={handleFilterChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Filter
              </Button>
            </Grid>
          </Grid>
        </form>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Quantity Sold</strong></TableCell>
                <TableCell><strong>Total Price (₹)</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((sale, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                    <TableCell>{sale.productName}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>{sale.totalPrice}</TableCell>
                    <TableCell>{sale.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No sales data available for the selected date range.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default SalesReport;
