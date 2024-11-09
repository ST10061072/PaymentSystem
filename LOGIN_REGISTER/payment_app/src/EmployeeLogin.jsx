import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import DOMPurify from 'dompurify';
import { set } from 'mongoose';

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
                navigate("/transactionVerification"); // Navigate to the transaction page
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
        <div className="login-container">
            <h2 className="employee-header">Employee Portal</h2>
            <form onSubmit={handleLogin} className ="employee-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/login">Are you a Customer?</Link>
        </div>
    );
};

export default EmployeeLogin;