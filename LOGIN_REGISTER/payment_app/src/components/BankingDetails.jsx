import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BankingDetails = () => {
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: '',
    availableBalance: 0,
  });

  useEffect(() => {
    // Fetch user banking details
    const fetchBankingDetails = async () => {
      try {
        const response = await axios.get('/api/user/banking-details'); // Adjust the endpoint accordingly
        setAccountDetails(response.data);
      } catch (error) {
        console.error('Error fetching banking details', error);
      }
    };

    fetchBankingDetails();
  }, []);

  return (
    <div style={styles.bankDetails}>
      <h3>Banking Details</h3>
      <p>
        <strong>Current Acc No:</strong> {accountDetails.accountNumber} <br />
        <strong>Available Bal:</strong> ${accountDetails.availableBalance}
      </p>
    </div>
  );
};

const styles = {
  bankDetails: {
    border: '2px dashed blue',
    padding: '10px',
    marginBottom: '20px',
  },
};

export default BankingDetails;