const mongoose = require('mongoose')

module.exports = mongoose.model('Item', new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  username: String,
  status: String,
  // condition: String,
  date: Date,
  title: String,
  // series: String,
  creators: [String],
  // description: String,
  tags: [String],
  price: Number
}))
