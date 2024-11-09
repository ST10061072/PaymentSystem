const mongoose = require('mongoose');

// Define the Transaction schema
const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to the User model
    required: true
  },

  recipientAccountNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  recipientName: {
    type: String,
    required: true
  },
  recipientBank: {
    type: String,
    required: true
  },
  swiftCode: {
    type: String,
    required: true
  },
  status:{
    type: String,
    //enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  }
});

// Create the Transaction model if it doesn't already exist
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

// Export the model
module.exports = Transaction;