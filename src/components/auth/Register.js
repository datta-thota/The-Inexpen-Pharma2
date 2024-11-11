import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Typography, TextField, Box, Card, CardContent, Divider, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleShowPasswordToggle = () => setShowPassword((prev) => !prev);

  return (
    <Container maxWidth="sm">
      <Box mt={6}>
        <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom color="primary">
              Create New Public Account
            </Typography>
            <Divider variant="middle" sx={{ mb: 2 }} />
            {errorMessage && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required('First name is required'),
                lastName: Yup.string().required('Last name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm your password'),
              })}
              onSubmit={(values) => {
                setSubmitting(true);
                fetch("http://localhost/inexpen_api/register.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.status === "success") {
                      console.log("Registration successful");
                      navigate("/view-buy-medicines"); 
                    } else {
                      setErrorMessage(data.message);
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    setErrorMessage("An error occurred during registration.");
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }}
              
            >
              {({ touched, errors }) => (
                <Form>
                  <Box mb={3}>
                    <Field
                      name="firstName"
                      as={TextField}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      name="lastName"
                      as={TextField}
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      name="password"
                      as={TextField}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPasswordToggle} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      name="confirmPassword"
                      as={TextField}
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      mx: 2,
                      px: 4,
                      py: 1,
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      backgroundColor: '#333',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#555',
                      },
                    }}
                    type="submit"
                    disabled={isSubmitting} 
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'REGISTER'}
                  </Button>
                </Form>
              )}
            </Formik>
            <Divider sx={{ my: 2 }} />
            <Box mt={2} textAlign="center">
              <Typography variant="body1">Already have an account?</Typography>
              <Button
                variant="text"
                color="secondary"
                onClick={() => navigate('/public-login')}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
