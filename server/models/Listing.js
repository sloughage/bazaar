const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
  user: Schema.Types.ObjectId,
  status: String,
  date: Date,
  description: String,
  title: String,
  creators: [String],
  condition: String,
  tags: [String]
})

module.exports = mongoose.model('Listing', ListingSchema)