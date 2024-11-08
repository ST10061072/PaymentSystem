import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  // Handle logout, clear token, and redirect to login
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/employeeLogin', { replace: true });
  }, [navigate]);

  // Navigate to user transactions only if a valid token exists
  const handleViewTransactions = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/TransactionVerification');
    } else {
      handleLogout();
    }
  };

  // Check for token on component mount; if no token, redirect to login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleLogout();
    }

    // Event listener to detect the back button press
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to the Employee Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here you can view user transactions and perform administrative tasks.
          </Typography>
          {/* Button to navigate to user transactions only if token exists */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewTransactions}
            sx={{ mt: 2 }}
          >
            View User Transactions
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default EmployeeDashboard;