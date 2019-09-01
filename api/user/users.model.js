const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        unique: true,
        type: String,
        required: true,
        lowercase: true,
        match: /\S+@\S+\.\S+/
    },

    password: {
        required: true,
        type: String,
        unique: true,
        minlength: 8
    },

    username: {
        required: true,
        type: String,
        unique: true,
        minlength: 4
    }

    updated: {
      type: Date,
      default: Date.now
    }
});

module.exports = userSchema;
