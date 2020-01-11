const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true
  }
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
