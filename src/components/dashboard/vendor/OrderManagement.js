import React, { useState, useEffect } from 'react';
import {Container,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button,AppBar,Toolbar,Box,Grid,CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/logo.png'; 

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/vendor/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  const handleUpdateOrder = (orderId) => {
    axios.put(`/api/vendor/orders/${orderId}`, { status: 'Shipped' })
      .then(() => {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: 'Shipped' } : order
        ));
      })
      .catch(error => console.error('Error updating order:', error));
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
          Order Management
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Order ID</strong></TableCell>
                  <TableCell><strong>Customer Name</strong></TableCell>
                  <TableCell><strong>Total Amount (₹)</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.totalAmount}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateOrder(order.id)}
                          disabled={order.status === 'Shipped'}
                        >
                          {order.status === 'Shipped' ? 'Shipped' : 'Mark as Shipped'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No orders available.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default OrderManagement;
