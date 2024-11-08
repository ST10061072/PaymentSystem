const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
