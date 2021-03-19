const mongoose = require("mongoose");
// const validator = require("validator");

// Database Schema

const userAdminSchema = new mongoose.Schema({
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

const UserAdmin = new mongoose.model("admin", userAdminSchema);

module.exports = UserAdmin;