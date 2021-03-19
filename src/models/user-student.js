const mongoose = require("mongoose");

// Database Schema

const userStudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3    
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    }
})

// Generating Tokens

const UserStudent = new mongoose.model("student", userStudentSchema);

module.exports = UserStudent;