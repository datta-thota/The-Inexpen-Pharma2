import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Box, Button, Typography, Card, CardContent, Divider, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/medical-background-light.jpg';
import React, { useState } from 'react';

const VendorLogin = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async ({ email, password }, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await fetch("http://localhost/inexpen_api/vlogin.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
    
            if (result.status === 'success') {
                navigate('/vendor-dashboard'); 
            } else {
                setErrorMessage(result.message); 
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred. Please try again.');
        } finally {
            setSubmitting(false); 
        }
    };
    

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 1,
                }}
            />

            <Container maxWidth="sm" sx={{ zIndex: 2 }}>
                <Box mt={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card
                            sx={{
                                boxShadow: 4,
                                transition: '0.3s',
                                '&:hover': { boxShadow: 8 },
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    gutterBottom
                                    color="primary"
                                    sx={{ fontWeight: 700, color: '#333' }}
                                >
                                    Vendor Login
                                </Typography>
                                <Divider variant="middle" sx={{ mb: 2 }} />

                                {errorMessage && (
                                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                                        {errorMessage}
                                    </Typography>
                                )}

                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={Yup.object({
                                        email: Yup.string().email('Invalid email').required('Required'),
                                        password: Yup.string().required('Required'),
                                    })}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <Box mb={3}>
                                                <Field
                                                    name="email"
                                                    as={TextField}
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="secondary"
                                                />
                                                <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
                                            </Box>
                                            <Box mb={3}>
                                                <Field
                                                    name="password"
                                                    as={TextField}
                                                    label="Password"
                                                    type="password"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="secondary"
                                                />
                                                <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '0.8em' }} />
                                            </Box>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                fullWidth
                                                sx={{
                                                    py: 1.5,
                                                    backgroundColor: '#333',
                                                    '&:hover': {
                                                        backgroundColor: '#555',
                                                    },
                                                }}
                                            >
                                                {isSubmitting ? 'Logging in...' : 'Login'}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>

                                <Divider sx={{ my: 2 }} />

                                <Box mt={2} textAlign="center">
                                    <Typography variant="body1" sx={{ color: '#333' }}>
                                        New here?
                                    </Typography>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        onClick={() => navigate('/vregister')}
                                        sx={{
                                            color: '#1976d2',
                                            '&:hover': {
                                                color: '#1565c0',
                                            },
                                        }}
                                    >
                                        Create an Account
                                    </Button>
                                </Box>

                                <Box mt={2} textAlign="center">
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: '#333',
                                            borderColor: '#333',
                                            px: 3,
                                            py: 1,
                                            '&:hover': {
                                                color: '#555',
                                                borderColor: '#555',
                                                boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.4)',
                                                transition: 'all 0.3s ease-in-out',
                                            },
                                        }}
                                        component={Link}
                                        to="/help"
                                    >
                                        Need Help?
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};

export default VendorLogin;
