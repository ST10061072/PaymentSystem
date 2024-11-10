import React, { useState, useEffect } from 'react';
import { Button, Container, Paper, Grid, TextField, Typography, Checkbox, Alert } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { Link } from "react-router-dom";

const TransactionVerification = () => {
  const [transactions, setTransactions] = useState([]);
  const [verifiedFields, setVerifiedFields] = useState({});
  const { transactionId } = useParams(); // Extract the transaction ID from the URL
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const location = useLocation();
  const token = location.state?.token;
  console.log("location state:", location.state)
  const navigate = useNavigate();
  
  //Retrives transactionId from EmployeeDasboard
  useEffect(() => {
    if(!token){
      setError("token not found")
      return;
    }
    const fetchTransaction = async () => {
      console.log("token:",token)
      try {
        const response = await axios.get(`https://localhost:3000/transactionVerification/${transactionId}`,{
          headers: {
            Authorization: `Bearer ${token}`//Attach token
          }
        });
        console.log("Response", response)     
        if (response.data) {
          // Handle the response directly
          if (response.data.transactions && Array.isArray(response.data.transactions)) {
            setTransactions(response.data.transactions);
          } else if (response.data.error) {
            setError(response.data.error);
          } else {
            // Directly check if the response is a single transaction object
            setTransactions([response.data]); 
          }
        } else {
          setError("Empty response from server.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Server error:", error.response);
          setError(`Server error: ${error.response.data.error || "Please try again later."}`);
        } else if (error.request) {
          console.error("Network error:", error.request);
          setError("Network error. Please check your connection and try again.");
        } else {
          console.error("Error:", error.message);
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };
    fetchTransaction();
  }, [transactionId,token]);

  const handleVerifyField = (transactionId, field, isVerified) => {
    setVerifiedFields(prevState => ({
      ...prevState,
      [transactionId]: {
        ...prevState[transactionId],
        [field]: isVerified
      }
    }));
  };

  const isTransactionValid = (transaction) => {
    const requiredFields = ['recipientName', 'recipientBank', 'recipientAccountNumber', 'amount', 'swiftCode'];
    return requiredFields.every(field => transaction[field]);
  };

  const isTransactionFullyVerified = (transactionId) => {
    const transactionVerification = verifiedFields[transactionId];
    return transactionVerification && Object.values(transactionVerification).every(value => value === true);
  };

 //Code for submit button
 const handleSubmitToSwift = async () => {
  const verifiedTransactions = transactions
    .filter(transaction => isTransactionValid(transaction) && isTransactionFullyVerified(transaction._id))
    .map(transaction => ({
      ...transaction,
      verified: verifiedFields[transaction._id]
    }));
  if (verifiedTransactions.length === 0) {
    setError("No transactions are fully verified for submission.");
    return;
  }
  try{
    const response = await axios.post(`https://localhost:3000/transactionVerification/${transactionId}`, {
      status: 'verified'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
      setSuccess(`Transaction ${transactionId} has been rejected.`);
      navigate('/employeeDashboard'); // Redirect to the employee portal
    } else{
    setError("Error rejecting transaction. Please try again later.");
    }
  }catch(error){
    setError("Error verifying transaction. Please try again later.");
  }
};

const handleRejectTransaction = async (transactionId) => {
  
    const response = await axios.post(`https://localhost:3000/transactionVerification/${transactionId}`, {
      status: 'rejected'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
    setSuccess(`Transaction ${transactionId} has been rejected.`);
    navigate('/employeeDashboard'); 
  
};

  return (
    <Container>
      <Paper style={styles.paper}>
        <Typography variant="h4" style={styles.title}>Bank Employee Verification</Typography>

        {error && <Alert severity="error" style={styles.alert}>{error}</Alert>}
        {success && <Alert severity="success" style={styles.alert}>{success}</Alert>}

        {transactions.map(transaction => (
          <form key={transaction._id} style={styles.form}>
            <Typography variant="h6" style={styles.transactionTitle}>Transaction ID: {transaction._id}</Typography>

            <Grid container spacing={3}>
              {['recipientName', 'recipientBank', 'recipientAccountNumber', 'amount', 'swiftCode'].map(field => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    defaultValue={transaction[field]}
                    InputProps={{ readOnly: true }}
                  />
                  <Checkbox
                    checked={verifiedFields[transaction._id]?.[field] || false}
                    onChange={() => handleVerifyField(transaction._id, field, !verifiedFields[transaction._id]?.[field])}
                    color="primary"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerifyField(transaction._id, field, true)}
                    style={{ marginLeft: '10px' }}
                  >
                    Verified
                  </Button>
                </Grid>
              ))}
            </Grid>
          </form>
        ))}

        <Grid container spacing={3} style={styles.buttonContainer}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              style={styles.submitButton}
              onClick={handleSubmitToSwift}
              fullWidth
            >
              Submit to SWIFT
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => transactions.forEach(transaction => handleRejectTransaction(transaction._id))}
              fullWidth
            >
              Reject
            </Button>
          </Grid>
        </Grid>
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
  transactionTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  submitButton: {
    width: '100%',
  },
  alert: {
    marginBottom: '20px',
  },
};

export default TransactionVerification;