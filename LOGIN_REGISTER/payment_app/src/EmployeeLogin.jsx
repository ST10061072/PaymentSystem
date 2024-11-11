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

    // Define a regex pattern for allowed characters (e.g., alphanumeric and some special characters)
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/;

    // Validate the input against the pattern
    const validateInput = (input, pattern) => {
        return pattern.test(input);
    };

    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    //Logic when Login button is clicked
    const handleLogin = (e) => {
        e.preventDefault();

        // Validate the username
        if (!validateInput(username, usernamePattern)) {
            setError('Invalid username. Only alphanumeric characters and underscores are allowed, Must be 3-20 characters long.');
            return;
          }
          if (!validateInput(password, passwordPattern)) {
            setError('Invalid password. Only alphanumeric characters and special characters !@#$%^&*()_+ are allowed, Must be 6-20 characters long.');
            return;
          }
          setError('');

        // Sanitize the input
        const cleanUsername = DOMPurify.sanitize(username);
        const cleanPassword = DOMPurify.sanitize(password);

        //Login logic using Parameterized queries for SQL injection prevention
        axios.post('https://localhost:3000/employeeLogin', {
            username: cleanUsername,
            password: cleanPassword })

        //If login is successful, store token in local storage and navigate to employee dashboard
        .then(result => {
            const token = result.data.token;
            if (token) {
                localStorage.setItem("token", token);
                console.log("Login successful, token stored:", token);
                navigate("/employeeDashboard");
            } else {
                console.log("Login failed: No token received.");
            }
        })
        .catch(err => {
            console.error(err);
            console.log(`An error occurred: ${err.message}`);
        });

        //Log the employee ID and password for debugging
        console.log('Username:', username);
        console.log('Password:', password);
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