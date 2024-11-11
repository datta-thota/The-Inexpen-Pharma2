import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, AppBar, Toolbar, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/logo.png'; // Import logo

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null, // Changed to hold the file
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      image: file, // Store the file
    });
  
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  

  const validate = () => {
    const newErrors = {};
    if (!productData.name) newErrors.name = 'Product name is required';
    if (!productData.description) newErrors.description = 'Description is required';
    if (!productData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(productData.price)) {
      newErrors.price = 'Price must be a number';
    }
    if (!productData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(productData.stock)) {
      newErrors.stock = 'Stock must be a number';
    }
    if (!productData.image) newErrors.image = 'Image file is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('image', productData.image); // Append the file directly
  
      axios.post('http://localhost/inexpen_api/add_product.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      })
      .then((response) => {
        setLoading(false);
        setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' });
        setProductData({ name: '', description: '', price: '', stock: '', image: null });
        setImagePreview(null); // Clear image preview
        setTimeout(() => navigate('/vendor-dashboard'), 1500);
      })
      .catch(error => {
        setLoading(false);
        setSnackbar({ open: true, message: 'Error adding product', severity: 'error' });
        console.error('Error adding product:', error);
      });
    }
  };
  

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="The Inexpen Pharma Logo" style={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h6" color="inherit">The Inexpen Pharma</Typography>
          </Box>
          <Button color="inherit" onClick={() => navigate('/vendor-dashboard')}>Back to Dashboard</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                name="name"
                value={productData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                value={productData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price (₹)"
                variant="outlined"
                type="number"
                fullWidth
                name="price"
                value={productData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Quantity"
                variant="outlined"
                type="number"
                fullWidth
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                error={!!errors.stock}
                helperText={errors.stock}
                required
              />
            </Grid>
            <Grid item xs={12}>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    required
  />
  {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
  {imagePreview && (
    <Box mt={2}>
      <img src={imagePreview} alt="Product Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
    </Box>
  )}
</Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Add Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      {/* Snackbar for success or error message */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddProduct;
