const mongoose = require("mongoose");
const validator = require("validator");

// Database Schema

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3    
    },
    subject: {
        type: String,
        required: true,
        minlength: 3,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    author: {
        type: String,
        required: true,
        minlength: 3,
    },
    isbn: {
        type: Number,
        unique: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Book = new mongoose.model("Book", bookSchema);

module.exports = Book;