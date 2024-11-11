import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, Snackbar, Select, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

// Alert component for the Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentGateway = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderItems, orderNumber, totalAmount = 1000 } = location.state || { orderItems: [], orderNumber: '12345', totalAmount: 1000 };

  const [open, setOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('creditCard');
  const [billingAddress, setBillingAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handlePayment = async () => {
    setPaymentProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (selectedMethod === 'creditCard' && (!cardNumber || !cardHolderName || !expirationDate || !cvv)) {
        alert("Please fill in all credit card details.");
        return;
      }

      if (selectedMethod === 'upi' && !upiId) {
        alert("Please enter UPI ID.");
        return;
      }

      if (selectedMethod === 'netBanking' && !bank) {
        alert("Please select a bank.");
        return;
      }

      if (!billingAddress || !city || !state || !zipCode) {
        alert("Please fill in all billing address details.");
        return;
      }

      setOpen(true);
      setTimeout(() => {
        navigate('/order-confirmation');
      }, 2000);
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(to right, #e0f7fa, #80deea)', // Medical blue shades
        padding: { xs: 2, sm: 4 },
      }}
    >
      {/* Header Section */}
      <Typography variant="h4" sx={{ mb: 4, color: '#00796b', fontWeight: 'bold' }}>
        Payment Gateway
      </Typography>

      {/* Order Summary Card */}
      <Card sx={{ width: { xs: '90%', sm: 600 }, maxWidth: '600px', marginBottom: 4, padding: 3, backgroundColor: '#e0f2f1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#004d40', mb: 2, textAlign: 'center' }}>
          Order Summary
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#00796b', mb: 1 }}>
            Order Number: {orderNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: '#00796b', mb: 1 }}>
            Items Ordered: {orderItems.join(', ')}
          </Typography>
          <Typography variant="h6" sx={{ color: '#004d40', mt: 2 }}>
            Total: ₹{totalAmount}
          </Typography>
        </Box>
      </Card>

      {/* Payment Method and Billing Section */}
      <Box sx={{ width: '100%', maxWidth: '500px', mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#00796b' }}>Select Payment Method</Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              fullWidth
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-root': { backgroundColor: '#b2dfdb' }
              }}
            >
              <MenuItem value="creditCard">Credit/Debit Card</MenuItem>
              <MenuItem value="upi">UPI</MenuItem>
              <MenuItem value="netBanking">Net Banking</MenuItem>
            </Select>
          </Grid>

          {/* Credit Card Form */}
          {selectedMethod === 'creditCard' && (
            <Grid item xs={12}>
              <TextField fullWidth label="Card Number" variant="outlined" margin="normal" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <TextField fullWidth label="Card Holder Name" variant="outlined" margin="normal" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <TextField fullWidth label="Expiration Date" placeholder="MM/YY" variant="outlined" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                <TextField fullWidth label="CVV" variant="outlined" type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </Box>
            </Grid>
          )}

          {/* UPI Payment */}
          {selectedMethod === 'upi' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter UPI ID"
                variant="outlined"
                margin="normal"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                sx={{ backgroundColor: '#b2dfdb', borderRadius: 2 }}
              />
            </Grid>
          )}

          {/* Net Banking Payment */}
          {selectedMethod === 'netBanking' && (
            <Grid item xs={12}>
              <Select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                displayEmpty
                fullWidth
                sx={{
                  backgroundColor: '#b2dfdb',
                  borderRadius: 2,
                  '& .MuiSelect-select': { borderRadius: 2 },
                }}
              >
                <MenuItem value="">Select Bank</MenuItem>
                <MenuItem value="SBI">State Bank of India</MenuItem>
                <MenuItem value="HDFC">HDFC Bank</MenuItem>
                <MenuItem value="ICICI">ICICI Bank</MenuItem>
                <MenuItem value="Axis">Axis Bank</MenuItem>
              </Select>
            </Grid>
          )}
        </Grid>

        {/* Billing Address Card */}
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2, backgroundColor: '#e0f7fa' }}>
          <Typography variant="h6" sx={{ color: '#004d40' }}>Billing Address</Typography>
          <TextField fullWidth label="Address" variant="outlined" margin="normal" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
          <TextField fullWidth label="City" variant="outlined" margin="normal" value={city} onChange={(e) => setCity(e.target.value)} />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField fullWidth label="State" variant="outlined" value={state} onChange={(e) => setState(e.target.value)} />
            <TextField fullWidth label="ZIP Code" variant="outlined" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </Box>
        </Card>
      </Box>

      {/* Pay Now Button */}
      <Button
        variant="contained"
        sx={{
          width: '100%',
          maxWidth: '500px',
          py: 2,
          borderRadius: 3,
          backgroundColor: '#00796b',
          color: '#ffffff',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': { backgroundColor: '#004d40' },
        }}
        onClick={handlePayment}
        disabled={paymentProcessing}
      >
        {paymentProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
      
      {/* Success Snackbar */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Payment Successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentGateway;
