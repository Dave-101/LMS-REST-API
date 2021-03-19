const mongoose = require("mongoose");
// const validator = require("validator");

// Database Schema

const recordSchema = new mongoose.Schema({
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
    bookissued: {
        type: String,
        minlength: 3,
        required: true
    },
    totalbooks: {
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
    }
})

const Record = new mongoose.model("record", recordSchema);

module.exports = Record;