const mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  // status: String,
  // email: String,
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
  // rating: Number
}))