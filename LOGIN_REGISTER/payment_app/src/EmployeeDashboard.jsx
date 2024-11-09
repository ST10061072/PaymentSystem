import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, Card, CardContent, CardActions , Grid } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  // Dummy data for pending transactions with additional details
  const [pendingTransactions] = useState([
    { recipientAccNumber: 2182798712, recipientName: 'Nyasha', amount: 150.75, Date: '01 January 2024', RecipientBank: 'StandardBank', swiftCode: '2378728' },
    { recipientAccNumber: 2182798712, recipientName: 'Nabeel', amount: 300.00, Date: '01 January 2024', RecipientBank: 'StandardBank', swiftCode: '2378728' },
    { recipientAccNumber: 2182798712, recipientName: 'Nabeel', amount: 300.00, Date: '01 January 2024', RecipientBank: 'StandardBank', swiftCode: '2378728' },
    { recipientAccNumber: 2182798712, recipientName: 'Nabeel', amount: 300.00, Date: '01 January 2024', RecipientBank: 'StandardBank', swiftCode: '2378728' },
  ]);

  // Handle logout, clear token, and redirect to login
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/employeeLogin', { replace: true });
  }, [navigate]);

  // Navigate to transaction verification page
  const handleViewTransactions = () => {
    navigate(`/TransactionVerification/`);
  };

  // Navigate to all transactions page
  const handleViewAllTransactions = () => {
    navigate(`/allTransactions`);
  };

  // Check for token if no token, redirect to login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleLogout();
    }

    // Event listener for the back button press
    const handlePopState = () => {
      handleLogout(); // Log out when back button is pressed
    };

    // Add the event for back button so user logs out if back button is pressed 
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleLogout]);

  return (
    <div>
      <AppBar position="fixed" sx={{ bgcolor: blue[500] }}>
  <Toolbar>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Employee Dashboard
    </Typography>
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  </Toolbar>
</AppBar>
<Container maxWidth="lg" sx={{ mt: 10, pb: 6 }}>
        
        {/* Welcome Message Box */}
        <Box sx={{ textAlign: 'center', mb: 4, p: 3, border: `1px solid ${blue[600]}`, borderRadius: 1, bgcolor: blue[50] }}>
          <Typography variant="h5" gutterBottom>
            Welcome to the Employee Dashboard
          </Typography>
          <Typography variant="body1">
            Review and manage user transactions below.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Pending Transactions
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewAllTransactions}
          >
            View All Transactions
          </Button>
        </Box>

        {/* Display transaction cards in 2s */}
        <Grid container spacing={4} justifyContent="center">
          {pendingTransactions.length > 0 ? (
            pendingTransactions.map((transaction, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ bgcolor: blue[50], borderColor: blue[500], borderWidth: 1, borderStyle: 'solid', p: 3, borderRadius: 1, boxShadow: 3 }}>
                  <CardContent>
                    {/* Boxed transaction data */}
                    <Box sx={{ border: `1px solid ${grey[400]}`, p: 2, borderRadius: 1, bgcolor: blue[100] }}>
                      <Typography variant="body1" sx={{ mb: 3 }}><strong>Recipient:</strong> {transaction.recipientName}</Typography>  {/* Added extra spacing here */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}><strong>Account Number:</strong> {transaction.recipientAccNumber}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}><strong>Amount:</strong> ${transaction.amount}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}><strong>Date:</strong> {transaction.Date}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}><strong>Bank:</strong> {transaction.RecipientBank}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>SWIFT Code:</strong> {transaction.swiftCode}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewTransactions(index)}
                    >
                      Verify
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No pending transactions.</Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default EmployeeDashboard;
