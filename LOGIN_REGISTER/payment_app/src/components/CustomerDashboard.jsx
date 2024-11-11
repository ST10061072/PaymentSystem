import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import Menu from './Menu';
import BankingDetails from './BankingDetails';
import PaymentReceipts from './PaymentReceipts';
import { Button, Container, Box } from '@mui/material';
import axios from "axios";

const CustomerDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const token = localStorage.getItem('token');

  const handleLocalPayment = () => {
    // Check if the token is available
    if (!token) {
        // Redirect to login or show an error message
        navigate('/login'); // Or any other action you want to take
        return; // Exit the function to prevent further execution
    }
    
    // Proceed with navigation if the token is present
    navigate('/payment-process', { state: { type: 'local', token: token } });
};

const handleInternationalPayment = () => {
    // Check if the token is available
    if (!token) {
        // Redirect to login or show an error message
        navigate('/login'); // Or any other action you want to take
        return; // Exit the function to prevent further execution
    }
    
    // Proceed with navigation if the token is present
    navigate('/payment-process', { state: { type: 'international', token: token } });
};

  return (
    <Container>
      <h2>Welcome  Customer </h2>

      <div style={styles.paymentOptions}>
        <Button 
          variant="contained" 
          color="primary" 
          style={styles.button} 
          onClick={handleLocalPayment}
        >
          Make Local Payment
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          style={styles.button} 
          onClick={handleInternationalPayment}
        >
          Make International Payment
        </Button>
      </div>

      <div style={styles.content}>
        <Menu />
        <div style={styles.details}>
          <BankingDetails />
          <PaymentReceipts />
          
        </div>
      </div>
    </Container>
  );
};

const styles = {
  paymentOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    flex: 1, // Make buttons take equal space
    marginRight: '10px', // Space between buttons
    padding: '15px', // Increased padding for larger buttons
    fontSize: '16px', // Increased font size
  },
  content: {
    display: 'flex',
  },
  details: {
    marginLeft: '20px',
    flex: 1,
  },
};

export default CustomerDashboard;