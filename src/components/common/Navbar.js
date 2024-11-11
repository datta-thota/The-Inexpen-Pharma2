import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Generic Medicine Platform
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/public-login">
          Public Login
        </Button>
        <Button color="inherit" component={Link} to="/vendor-login">
          Vendor Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
