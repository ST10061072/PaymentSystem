// AllTransactions.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('https://localhost:3000/allTransactions', { headers });
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
        <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Back
        </Button>
      </Box>
      {transactions.length > 0 ? (
        <Stack spacing={2}>
          {transactions.map((transaction) => (
            <Card key={transaction.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Recipient: {transaction.recipientName} ({transaction.recipientAccountNumber})
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Bank: {transaction.recipientBank}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  SWIFT Code: {transaction.swiftCode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: ${transaction.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(transaction.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {transaction.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography align="center" variant="h6" color="text.secondary">
          No transactions found.
        </Typography>
      )}
    </Container>
  );
};

export default AllTransactions;
