import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // To access location state
import { Container, TextField, Box, Button, Typography, Card, CardContent, CardMedia, Divider, AppBar, Toolbar, Grid2, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import logo from '../../assets/logo.png'; // Import logo
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import bImg from '../../assets/backg.jpg';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const EcommercePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook to access navigation
  const [error, setError] = useState(null);  // Define setError
  const [loading, setLoading] = useState(true); 
  // Get the current location to determine the login route
  const location = useLocation();
  const fixedPrices = [5.99, 9.99, 14.99, 19.99, 24.99];
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Assuming user ID is stored in localStorage

  // Sample medicine data (replace this with your API call)
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost/inexpen_api/fetch_products.php');
        console.log("Full API Response:", response.data);  // Log the entire response
        if (Array.isArray(response.data.data)) {
          setMedicines(response.data.data);
          setFilteredMedicines(response.data.data);
        } else {
          throw new Error("Response is not an array");
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setError("Failed to fetch medicines");
        setFilteredMedicines([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchMedicines();
  }, []);
  
  useEffect(() => {
    if (userId) {
        fetch(`http://localhost/inexpen_api/get_cart.php?user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setCartItems(data.data);
                } else {
                    console.error('Failed to load cart');
                }
            })
            .catch(error => console.error('Error fetching cart:', error));
    }
}, [userId]);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterMedicines(term);
  };
  const handleUpdateQuantity = (id, action) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  const calculateSubtotal = () => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
const calculateTax = () => calculateSubtotal() * 0.05; // Assuming 5% tax
const calculateTotal = () => calculateSubtotal() + calculateTax();

  // Filter medicines based on search
  const filterMedicines = (term) => {
    const filtered = medicines.filter(medicine => medicine.name.toLowerCase().includes(term));
    setFilteredMedicines(filtered);
  };

  // Add to cart
  const handleAddToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  
    // Sync with backend
    if (userId) {
      axios.post('http://localhost/inexpen_api/add_to_cart.php', { userId, medicineId: medicine.id, quantity: 1 })
        .then(response => {
          console.log("Item added to cart:", response);
        })
        .catch(error => console.error("Error adding item to cart:", error));
    }
  
    setOpen(true); // Open the popup
  };
  const handleClose = () => {
    setOpen(false); // Close the popup
  };
  
  
  // Handle checkout toggle
  // Example function to navigate to the PaymentPage
const handleCheckout = () => {
    const orderItems = ['Medicine A', 'Medicine B']; // Replace with actual cart items
    const orderNumber = '12345'; // Replace with actual order number
    navigate('/order-confirmation', { state: { orderItems, orderNumber } });
  };
  

  // Handle back to shop
  const handleBackToShop = () => {
    setCheckout(false);
  };

  // Handle checkout submission
  

  // Smooth scroll to the respective section
  const handleScrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  // Format price to Indian Rupee
  // Format price to Indian Rupee
  const formatPrice = (price) => {
    if (typeof price === 'number') {
        return price.toFixed(2); // Format to two decimal places
    } else {
        console.error('Price is not a number:', price); // Debugging line
        return 'N/A'; // Return a default value or error message
    }
};

if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // Determine which dashboard to show based on the route
  const dashboard = location.state && location.state.from === 'vendor' ? 'Vendor Dashboard' : 'Public Dashboard';

  return (
    <Box component="main" sx={{ scrollBehavior: 'smooth', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
      {/* AppBar with Logo and Dashboard Links */}
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and Title */}
          <Box display="flex" alignItems="center">
            <img src={logo} alt="The Inexpen Pharma Logo" style={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h6" component="div">
              The Inexpen Pharma
            </Typography>
          </Box>

          {/* Dashboard Links and Navigation */}
          <Box>
            <Button color="inherit" onClick={() => handleScrollToSection('landing')}>Home</Button>
            <Button color="inherit" onClick={() => handleScrollToSection('shop')}>Explore</Button>
            <Button color="inherit" onClick={() => handleScrollToSection('cart')}>Cart</Button>
            
          
            <Button
                color="inherit"
                onClick={() => {
                    // Navigation to the profile
                    navigate('/profile');
                }}
            >
                Go to Profile
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Landing Section */}
      <Box
  id="landing"
  sx={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${bImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <Container textAlign="center">
    <Typography
      variant="h2"
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      sx={{
        color: '#000',  // Set text color to black
        textShadow: `
          -1px -1px 0 #fff,
           1px -1px 0 #fff,
          -1px  1px 0 #fff,
           1px  1px 0 #fff
        `,  // White outline
      }}
    >
      Welcome to Generic Medicine Store
    </Typography>
    <Typography
      variant="h6"
      color="textSecondary"
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      sx={{
        mt: 2,
        color: '#000',  // Set text color to black
        textShadow: `
          -1px -1px 0 #fff,
           1px -1px 0 #fff,
          -1px  1px 0 #fff,
           1px  1px 0 #fff
        `,  // White outline
      }}
    >
      Your trusted source for affordable generic medicines.
    </Typography>
    <Button onClick={() => handleScrollToSection('shop')} variant="contained" color="primary" sx={{ mt: 4 }}>
      Start Shopping
    </Button>
  </Container>
</Box>


      <Box id="shop" sx={{ py: 4, background: '#fff' }}>
  <Container>
    <Typography variant="h4" component="h2" textAlign="center" sx={{ mb: 2, color: '#00796b' }}>
      Explore Our Medicines
    </Typography>
    <TextField
      label="Search Medicines"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearch}
      sx={{ mb: 4 }}
      component={motion.div}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
    />
    <Grid container spacing={4}>
      {filteredMedicines.length > 0 ? (
        filteredMedicines.map((medicine) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={medicine.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transition: 'box-shadow 0.3s ease-in-out',
                  },
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${medicine.image}`} // Convert base64 string to data URL
                  alt={medicine.name}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary">
                    {medicine.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {medicine.description}
                  </Typography>
                  <Typography variant="h6" color="textPrimary">
                    Price: {formatPrice(medicine.price)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={() => handleAddToCart(medicine)}
                  >
                    Add to Cart
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Item Added to Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The item has been successfully added to your cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
                </CardContent>
                <Box
                  className="glow-effect"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 215, 0, 0.5)', // Gold color glow
                    borderRadius: '8px',
                    opacity: 0,
                    transition: 'opacity 0.5s ease-in-out',
                    zIndex: -1,
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        ))
      ) : (
        <Box textAlign="center" mt={4} width="100%">
          <Typography variant="h6" color="textSecondary">
            No medicines found.
          </Typography>
        </Box>
      )}
    </Grid>
  </Container>
</Box>


      {/* Cart Section */}
      <Box id="cart" sx={{ py: 4, background: '#e0f7fa' }}>
  <Container>
    <Typography variant="h4" component="h2" textAlign="center" sx={{ mb: 2, color: '#00796b' }}>
      Your Cart
    </Typography>
    {cart.length === 0 ? (
      <Typography variant="h6" color="textSecondary" textAlign="center">
        Your cart is empty. Start adding some medicines!
      </Typography>
    ) : (
      cart.map((item) => (
        <Box key={item.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{item.name} (x{item.quantity})</Typography>
          <Box>
            <Button variant="outlined" onClick={() => handleUpdateQuantity(item.id, 'increase')}>+</Button>
            <Button variant="outlined" onClick={() => handleUpdateQuantity(item.id, 'decrease')}>-</Button>
            <Button variant="contained" color="error" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
          </Box>
          <Typography variant="body1">Price: {formatPrice(item.price * item.quantity)}</Typography>
        </Box>
      ))
    )}
    {cart.length > 0 && (
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="h6">Subtotal: {formatPrice(calculateSubtotal())}</Typography>
        <Typography variant="body1">Tax: {formatPrice(calculateTax())}</Typography>
        <Typography variant="h5">Total: {formatPrice(calculateTotal())}</Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </Box>
    )}
  </Container>
</Box>


      {/* Checkout Modal */}
      {checkout && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <Box sx={{
            bgcolor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '300px',
          }}>
            <Typography variant="h6">Confirm Order</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Are you sure you want to place the order?
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="primary" onClick={handleBackToShop}>Cancel</Button>
              <Button 
      variant="contained" 
      color="primary" 
      onClick={() => navigate('/order-confirmation')} // Navigate directly here
    >
      Place Order
    </Button>            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EcommercePage;
