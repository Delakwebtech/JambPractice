const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  examinationNumber: String,
  subjects: [String],
  scores: [Number],
});

module.exports = mongoose.model('Result', resultSchema);
