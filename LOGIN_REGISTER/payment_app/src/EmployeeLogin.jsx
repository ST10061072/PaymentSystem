import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, Typography, TextField, Paper } from '@mui/material';
import DOMPurify from 'dompurify';
import { blue, grey } from '@mui/material/colors';

const EmployeeLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Define a regex pattern for allowed characters
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/;

    // Validate the input
    const validateInput = (input, pattern) => pattern.test(input);

    // Handle login logic
    const handleLogin = (e) => {
        e.preventDefault();

        if (!validateInput(username, usernamePattern)) {
            setError('Invalid username. Use alphanumeric characters, 3-20 characters.');
            return;
        }
        if (!validateInput(password, passwordPattern)) {
            setError('Invalid password. Use alphanumeric and !@#$%^&*()_+, 6-20 characters.');
            return;
        }
        setError('');

        const cleanUsername = DOMPurify.sanitize(username);
        const cleanPassword = DOMPurify.sanitize(password);

        axios.post('https://localhost:3000/employeeLogin', {
            username: cleanUsername,
            password: cleanPassword
        })
        .then(result => {
            const token = result.data.token;
            if (token) {
                localStorage.setItem('token', token);
                navigate('/employeeDashboard');
            } else {
                setError('Login failed: No token received.');
            }
        })
        .catch(err => setError(`An error occurred: ${err.message}`));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ padding: 4, bgcolor: blue[50], borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom sx={{ color: blue[700] }}>
                    Employee Portal
                </Typography>
                <Typography variant="body2" align="center" color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ textAlign: 'center' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 3, bgcolor: grey[100] }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 3, bgcolor: grey[100] }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ bgcolor: blue[500], color: 'white', mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
                <Typography variant="body2" align="center" sx={{ color: blue[500] }}>
                    <Link to="/login" style={{ textDecoration: 'none', color: blue[500] }}>
                        Are you a Customer?
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default EmployeeLogin;