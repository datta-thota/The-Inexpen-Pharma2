import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Snackbar,
  Modal,
  Pagination,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png'; // Import logo
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import axios from 'axios';

const VendorCommunicationAndSales = () => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [stock, setStock] = useState('');
  const [stocksList, setStocksList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor A', stock: 'Paracetamol, Ibuprofen', contact: '1234567890' },
    { id: 2, name: 'Vendor B', stock: 'Cough Syrup, Antacid', contact: '0987654321' },
    { id: 3, name: 'Vendor C', stock: 'Pain Reliever', contact: '1122334455' },
    { id: 4, name: 'Vendor D', stock: 'Cold Medicine', contact: '5566778899' },
    { id: 5, name: 'Vendor E', stock: 'Antibiotics', contact: '9876543210' },
    { id: 6, name: 'Vendor F', stock: 'Allergy Relief', contact: '1231231234' },
  ]);
  
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [medicinesList, setMedicinesList] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [currentVendors, setCurrentVendors] = useState([]);
  
  useEffect(() => {
    fetchMessages();
  }, []);

  // Functions
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: 'You',
      content: newMessage,
    };

    try {
      await axios.post("http://localhost/inexpen_api/chat.php", message);
      setMessages([{ ...message, timestamp: new Date().toLocaleString() }, ...messages]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost/inexpen_api/chat.php");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]); // Set an empty array in case of error

    }
  };

  const handleClearMessages = async () => {
    try {
      await axios.delete("http://localhost/inexpen_api/chat.php");
      setMessages([]);
    } catch (error) {
      console.error("Error clearing messages:", error);
    }
  };


  const handleUpdateStock = () => {
    if (stock.trim()) {
      setStocksList((prevStocks) => [...prevStocks, stock]);
      setStock('');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
 
  const openSellModal = (vendor) => {
    setSelectedVendor(vendor);
    setSellModalOpen(true);
  };

  const closeSellModal = () => {
    setSellModalOpen(false);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleSell = () => {
    const newMedicine = { medicineName, quantity, price };
    setMedicinesList([...medicinesList, newMedicine]);
    setMedicineName('');
    setQuantity(1);
    setPrice('');
    setOpenSnackbar(true);
    closeSellModal();
  };

  const openBuyModal = (vendor) => {
    setSelectedVendor(vendor);
    setBuyModalOpen(true);
  };

  const closeBuyModal = () => {
    setBuyModalOpen(false);
  };

  const handleBuy = () => {
    // Add logic to handle buying medicines
    alert(`Buying medicines from ${selectedVendor.name}`);
    closeBuyModal();
  };

  const handleSubmit = () => {
    // Add logic to handle form submission
    alert('Form submitted successfully');
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const indexOfLastVendor = currentPage * itemsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - itemsPerPage;
    const currentVendorsData = vendors.slice(indexOfFirstVendor, indexOfLastVendor);
    setCurrentVendors(currentVendorsData);
    setTotalPages(Math.ceil(vendors.length / itemsPerPage));
  }, [currentPage, vendors]);

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="The Inexpen Pharma Logo" style={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h6" component="div">
              The Inexpen Pharma
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Button color="inherit" onClick={() => scrollToSection('vendor-chat')}>Vendor Chat</Button>
            <Button color="inherit" onClick={() => scrollToSection('exchange-stock')}>Exchange Stock</Button>
            <Button color="inherit" onClick={() => scrollToSection('available-vendors')}>Available Vendors & Stock</Button>
            <Button color="inherit" onClick={() => scrollToSection('sell-public')}>Sell Medicines to Public</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Title */}
      <Box component={motion.div} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} textAlign="center" my={4}>
        <Typography variant="h2" color="secondary" fontFamily="'Roboto', sans-serif">
          Vendor Communication and Stock Exchange
        </Typography>
        <Typography variant="body1" my={2} fontFamily="'Roboto', sans-serif">
          Connect with other vendors and sell your stock efficiently.
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>

      <Box id="vendor-chat" mb={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom fontFamily="'Roboto', sans-serif">
            Vendor Chat
          </Typography>
          <List sx={{ height: '200px', overflowY: 'auto', backgroundColor: '#f0f0f0', padding: 2, borderRadius: '8px' }}>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ padding: '8px 0' }}>
                <Box sx={{ backgroundColor: msg.sender === 'You' ? '#e0f7fa' : '#ffe0b2', borderRadius: '5px', padding: '8px', maxWidth: '70%', marginLeft: msg.sender === 'You' ? 'auto' : '0' }}>
                  <Typography variant="body2" fontFamily="'Roboto', sans-serif">
                    <strong>{msg.sender}:</strong> {msg.content}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">{msg.timestamp}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box mt={2}>
            <TextField
              variant="outlined"
              label="Type a message"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Button variant="contained" color="primary" onClick={handleSendMessage}>
                Send Message
              </Button>
              <Button variant="outlined" color="error" onClick={handleClearMessages}>
                Clear Chat
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>

      {/* Stock Management Section */}
      <Box id="exchange-stock" mb={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom fontFamily="'Roboto', sans-serif">
              Exchange Stock
            </Typography>
            <TextField
              label="Update Stock"
              variant="outlined"
              fullWidth
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <Button variant="contained" color ="primary" onClick={handleUpdateStock} sx={{ mt: 2 }}>
              Update Stock
            </Button>
            <Snackbar
              open={snackbarOpen}
              onClose={handleSnackbarClose}
              message="Action completed successfully!"
              autoHideDuration={3000}
            />
            <List>
              {stocksList.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Available Vendors Section */}
      <Box id="available-vendors" mb={4}>
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              fontFamily="'Roboto', sans-serif"
            >
              Available Vendors & Stock
            </Typography>
            <TextField
              label="Search Vendors"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Select value={sortOption} onChange={handleSortChange} fullWidth sx={{ mb: 2 }}>
              <MenuItem value="name">Sort by Name</MenuItem>
              <MenuItem value="stock">Sort by Stock</MenuItem>
            </Select>

            {currentVendors.map((vendor) => (
              <Box key={vendor.id} sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, marginBottom: 2 }}>
                <Typography variant="h6" fontFamily="'Roboto', sans-serif">
                  {vendor.name}
                </Typography>
                <Typography variant="body1">Stock: {vendor.stock}</Typography>
                <Typography variant="body2">Contact: {vendor.contact}</Typography>

                {/* Sell Section */}
                <Button variant="contained" color="primary" onClick={() => openSellModal(vendor)} sx={{ mt: 1, mr: 1 }}>
                  <SellIcon /> Sell Medicines
                </Button>

                {/* Buy Section */}
                <Button variant="contained" color="secondary" onClick={() => openBuyModal(vendor)} sx={{ mt: 1 }}>
                  <SellIcon /> Buy Medicines
                </Button>
              </Box>
            ))}

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Sell Medicines Modal */}
      <Modal open={sellModalOpen} onClose={closeSellModal}>
        <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20%', boxShadow: 24 }}>
          <Typography variant="h6" component="h2" mb={2}>
            Sell Medicines to {selectedVendor?.name}
          </Typography>
          <TextField
            label="Medicine Name"
            variant="outlined"
            fullWidth
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSell}>
            Sell
          </Button>
          <IconButton onClick={closeSellModal} sx={{ position: 'absolute', top: 10, right: 10 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>

      {/* Buy Medicines Modal */}
      <Modal open={buyModalOpen} onClose={closeBuyModal}>
        <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20%', boxShadow: 24 }}>
          <Typography variant="h6" component="h2" mb={2}>
            Buy Medicines from {selectedVendor?.name}
          </Typography>
          <TextField
            label="Medicine Name"
            variant="outlined"
            fullWidth
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="secondary" onClick={handleBuy}>
            Buy
          </Button>
          <IconButton onClick={closeBuyModal} sx={{ position: 'absolute', top: 10, right: 10 }}>
            < CloseIcon />
          </IconButton>
        </Box>
      </Modal>

      {/* Sell to Public Section */}
      <Box id="sell-public" mb={4}>
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              fontFamily="'Roboto', sans-serif"
            >
              Sell Medicines to Public
            </Typography>

            <TextField
              label="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price (₹)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Add Medicine
            </Button>

            <List sx={{ mt: 3 }}>
              {medicinesList.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.medicineName} - Qty: ${item.quantity} - Price: ₹${item.price}`}
                  />
                </ListItem>
              ))}
            </List>

            <Snackbar
              open={openSnackbar}
              onClose={() => setOpenSnackbar(false)}
              message="Medicine added successfully!"
              autoHideDuration={3000}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default VendorCommunicationAndSales;