const mongoose = require("mongoose");

// Database Schema

const paymentSchema = new mongoose.Schema({
    studentname: {
        type: String,
        required: true,
        minlength: 3    
    },
    studentemail: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    totalbooksissued: {
        type: Number,
        min: 1,
        max: 5
    },
    dateofissue: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateofreturn: {
        type: Date,
        required: true,
        default: Date.now
    },
    fine: {
        type: Number
    }
})

const Payment = new mongoose.model("payment", paymentSchema);

module.exports = Payment;