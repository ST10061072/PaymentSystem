import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';


const PaymentReceipts = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [error, setError] = useState('');

  /*useEffect(() => {
    const fetchReceipts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to process a payment.');
        navigate('/login');
      } else {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Manually decode the token
          if (!decodedToken.userId) {
            throw new Error('Invalid token');
          }
          const response = await axios.get(`https://localhost:3000/payment-receipts/${decodedToken.userId}`); // Adjust the endpoint accordingly
          setReceipts(response.data);
          console.log(response.data);
        } catch (error) {
          setMessage('Invalid token. Please login again.');
          navigate('/login');
        }
        fetchReceipts();
      }
    }
  }, []);*/

  useEffect(() => {
    console.log("useEffect");
    const fetchReceipts = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Manually decode the token
          if (!decodedToken.userId) {
            throw new Error('Invalid token');
          }
      const response = await axios.get(`https://localhost:3000/payment-receipts/${decodedToken.userId}`); // Adjust the endpoint accordingly
      setReceipts(response.data);

    };
    fetchReceipts();

  }, []);

  const handlePayAgain = (receipt) => {
    // Implement the logic to pay again using receipt details
    console.log(`Paying again for: ${receipt.description}`);
    // You can trigger a payment API call here, based on receipt details.
  };

  return (
    <Container>
    <div style={styles.paymentReceipts}>
      <Typography variant="h4">Payment Receipts</Typography>
      {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
      {receipts.length === 0 ? (
        <Typography>No receipts available.</Typography>
      ) : (
        receipts.map((receipt, index) => (
          <div key={index} style={styles.receipt}>
            <Typography>{`${new Date(receipt.date).toLocaleDateString()} - ${receipt.recipientName} - $${receipt.amount}`}</Typography>
            <button style={styles.payAgainButton} onClick={() => handlePayAgain(receipt)}>
              Pay again
            </button>
          </div>
        ))
      )}
    </div>
  </Container>
  );
};

const styles = {
  paymentReceipts: {
    border: '2px dashed blue',
    padding: '10px',
  },
  receipt: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  payAgainButton: {
    padding: '5px 10px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
};
 
export default PaymentReceipts;