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
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/logo.png'; // Import logo

const StockManagement = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedStock, setHighlightedStock] = useState(null); // To track which stock was updated

  useEffect(() => {
    axios.get('http://localhost/inexpen_api/get_stock.php') // URL pointing to PHP endpoint
      .then(response => {
        setStocks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      });
  }, []);

  const handleUpdateStock = (productId, newStock) => {
    axios.put(`/api/vendor/stock/${productId}`, { stock: newStock })
      .then(() => {
        setStocks(stocks.map(stock => 
          stock.id === productId ? { ...stock, stock: newStock } : stock
        ));
        setHighlightedStock(productId); // Set the highlighted stock
        setTimeout(() => setHighlightedStock(null), 1000); // Clear highlight after 1 second
      })
      .catch(error => console.error('Error updating stock:', error));
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
          Stock Management
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell><strong>Stock Level</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.length > 0 ? (
                  stocks.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className={highlightedStock === product.id ? 'highlight' : ''}>
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateStock(product.id, product.stock + 1)}
                        >
                          Increase Stock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">No stock data available.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
        <style jsx>{`
          @keyframes highlight {
            0% { background-color: #e0f7fa; }
            50% { background-color: #b2ebf2; }
            100% { background-color: transparent; }
          }

          .highlight {
            animation: highlight 1s ease forwards;
          }
        `}</style>
      </Container>
    </>
  );
};

export default StockManagement;
