// AllTransactions.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('https://localhost:3000/transactions', { headers });
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Transactions
        </Typography>
      </Box>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <Card key={transaction.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1">
                {transaction.recipientName} - ${transaction.amount} - Status: {transaction.status}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No transactions found.</Typography>
      )}
    </Container>
  );
};

export default AllTransactions;
