const mongoose = require('mongoose');

const BookShema = new mongoose.Schema({
  author: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const BookUserScema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,
   
  },
  date: {
    type: Date,
    default: Date.now
  }
  , books  : [BookShema]
});

const BookUser = mongoose.model('BookUser', BookUserScema);
module.exports = BookUser;

