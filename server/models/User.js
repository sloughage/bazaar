const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  status: String,
  email: String,
  listings: [Schema.Types.ObjectId],
  rating: Number
})

module.exports = mongoose.model('User', UserSchema)