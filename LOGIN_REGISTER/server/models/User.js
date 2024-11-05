const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
     name: { type: String, required: true },
     surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, required: true },
    accountNumber: { type: String, unique: true },
    transactions: [{
        userid: {type: String},
        recipientName: { type: String },
        recipientBank: { type: String },
        recipientAccountNumber: { type: String },
        amount: { type: Number },
        swiftCode: { type: String },
        date: { type: Date, default: Date.now }
    }]
});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel