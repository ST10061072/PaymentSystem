import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentProcess = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    recipientName: '',
    recipientBank: '',
    recipientAccountNumber: '',
    amount: '',
    swiftCode: '',
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to process a payment.');
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  // Validation functions
  const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const isValidBank = (bank) => /^[a-zA-Z\s]+$/.test(bank);
  const isValidAccountNumber = (accountNumber) => /^\d{1,12}$/.test(accountNumber);
  const isValidAmount = (amount) => /^\d+(\.\d{1,2})?$/.test(amount);
  const isValidSwiftCode = (swiftCode) => /^[A-Z0-9]{8,11}$/.test(swiftCode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Token is missing. Please login again.');
      navigate('/login');
      return;
    }

    const { recipientName, recipientBank, recipientAccountNumber, amount, swiftCode } = paymentDetails;

    // Check if all fields are filled using regex
    const isEmpty = (field) => /^\s*$/.test(field);
    if ([recipientName, recipientBank, recipientAccountNumber, amount, swiftCode].some(isEmpty)) {
      setMessage('All fields are required.');
      return;
    }

    // Validate input fields
    if (!isValidName(recipientName)) {
      setMessage('Invalid recipient name.');
      return;
    }
    if (!isValidBank(recipientBank)) {
      setMessage('Invalid recipient bank.');
      return;
    }
    if (!isValidAccountNumber(recipientAccountNumber)) {
      setMessage('Invalid recipient account number.');
      return;
    }
    if (!isValidAmount(amount)) {
      setMessage('Invalid amount.');
      return;
    }
    if (!isValidSwiftCode(swiftCode)) {
      setMessage('Invalid SWIFT code.');
      return;
    }

    try {
      console.log('Token:', token);
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Manually decode the token

      console.log('Decoded Token:', decodedToken);

      const userId = decodedToken.userId; // Extract userId from the token

      console.log('User ID:', userId);

      if (!userId) {
        throw new Error('Invalid token');
      }

      const paymentData = {
        ...paymentDetails,
        userId, // Include userId in the payment details
      };

      const response = await axios.post('https://localhost:3000/payment-process', paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      setPaymentDetails({
        recipientName: '',
        recipientBank: '',
        recipientAccountNumber: '',
        amount: '',
        swiftCode: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing the payment.');
    }
  };

  return (
    <Container>
      <Paper style={styles.paper}>
        <Typography variant="h4" style={styles.title}>Payment Process</Typography>
        <form onSubmit={handleSubmit} style={styles.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Recipient Name"
                name="recipientName"
                placeholder="Enter Recipient Name"
                value={paymentDetails.recipientName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Recipient Bank"
                name="recipientBank"
                placeholder="Enter Recipient Bank"
                value={paymentDetails.recipientBank}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Recipient Account Number"
                name="recipientAccountNumber"
                placeholder="Enter Recipient Account Number"
                value={paymentDetails.recipientAccountNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Amount"
                name="amount"
                placeholder="Enter Amount"
                value={paymentDetails.amount}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="SWIFT Code"
                name="swiftCode"
                placeholder="Enter SWIFT Code"
                value={paymentDetails.swiftCode}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" style={styles.submitButton}>
                Pay Now
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="button" variant="outlined" color="secondary" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
        {message && <Typography variant="body1" color="error">{message}</Typography>}
      </Paper>
    </Container>
  );
};

const styles = {
  paper: {
    padding: '20px',
    marginTop: '20px',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '10px',
  },
  submitButton: {
    width: '100%',
  },
};

export default PaymentProcess;