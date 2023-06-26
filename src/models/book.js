const mongoose = require('mongoose');
const { Schema } = mongoose;

const Author = new Schema({
    name: String,
    email: String
});

const Book = new Schema({
    title: String,
    author: [Author],
    publishedDate: Date,
    price: Number,
    tags: [String],
    createdAt: {
        type: Date,
        dafault: Date.now
    }
});

module.exports = mongoose.model('Book', Book);