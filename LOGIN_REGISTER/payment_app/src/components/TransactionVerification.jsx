import React, { useState, useEffect } from 'react';
import { Button, Container, Paper, Grid, TextField, Typography, Checkbox, Alert } from '@mui/material';
import axios from 'axios';

const TransactionVerification = () => {
  const [transactions, setTransactions] = useState([]);
  const [verifiedFields, setVerifiedFields] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://localhost:3000/transactions');
        setTransactions(response.data);
      } catch (error) {
        setError("Error fetching transactions. Please try again later.");
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

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
    const requiredFields = ['payeeName', 'payeeBank', 'accountNumber', 'amount', 'swiftCode'];
    return requiredFields.every(field => transaction[field]);
  };

  const isTransactionFullyVerified = (transactionId) => {
    const transactionVerification = verifiedFields[transactionId];
    return transactionVerification && Object.values(transactionVerification).every(value => value === true);
  };

  const handleSubmitToSwift = () => {
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

    axios.post('https://localhost:3000/submitToSwift', { transactions: verifiedTransactions })
      .then(response => {
        setSuccess("Transactions successfully submitted to SWIFT.");
        setError(null);
      })
      .catch(error => {
        setError("Error submitting transactions to SWIFT. Please try again later.");
        setSuccess(null);
      });
  };

  const handleRejectTransaction = (transactionId) => {
    setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
    setSuccess(`Transaction ${transactionId} has been rejected.`);
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
              {['payeeName', 'payeeBank', 'accountNumber', 'amount', 'swiftCode'].map(field => (
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