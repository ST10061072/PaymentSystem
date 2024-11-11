import React,{useStateate} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';


const Menu = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (path === '/transactions' || path === '/payments') {
      setMessage('This functionality is not available yet.');
    } else if (path === '/') {
      localStorage.removeItem('token'); // Clear the token for logout
      navigate('/login'); 
    } else {
      setMessage('');
      navigate(path);
    }
  };

  return (
    <Box style={styles.menu}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleNavigate('/CustomerDashboard')}
        style={styles.button}
      >
        Home
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleNavigate('/transactions')}
        style={styles.button}
      >
        Transactions
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleNavigate('/payments')}
        style={styles.button}
      >
        Payments
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleNavigate('/')}
        style={styles.button}
      >
        Logout
      </Button>
    </Box>
  );
};

const styles = {
  menu: {
    border: '2px solid blue', // Solid border
    padding: '10px',
    width: '200px',
    display: 'flex',
    flexDirection: 'column', // Arrange buttons in a column
    gap: '10px', // Space between buttons
  },
  button: {
    width: '100%', // Make buttons take full width
  },
};

export default Menu;