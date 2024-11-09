import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const TransactionVerification = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams(); // Capture the transaction ID from the URL

  // Dummy data to simulate transaction details
  const dummyTransaction = {
    id: transactionId,
    recipientName: "Colby",
    recipientBank: "Standard Bank",
    recipientAccountNumber: "123456789",
    amount: 150.75,
    swiftCode: "S786876",
    date: "2023-12-08",
    status: "Pending"
  };

  // Simulate verification action
  const handleVerifyTransaction = () => {
    alert("Transaction verified successfully!");
    navigate('/employeeDashboard'); // Navigate back to the dashboard after verification
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Transaction Verification
        </Typography>
        <Typography variant="body1">
          Verify transaction details before proceeding.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Transaction ID: {dummyTransaction.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Recipient Name:</strong> {dummyTransaction.recipientName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Recipient Bank:</strong> {dummyTransaction.recipientBank}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Account Number:</strong> {dummyTransaction.recipientAccountNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Amount:</strong> ${dummyTransaction.amount}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>SWIFT Code:</strong> {dummyTransaction.swiftCode}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong> {dummyTransaction.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Status:</strong> {dummyTransaction.status}
          </Typography>
        </CardContent>
        <Box textAlign="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyTransaction}
          >
            Verify Transaction
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default TransactionVerification;
 