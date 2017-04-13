const mongoose = require('mongoose')
const connStr = 'mongodb://localhost/bazaar'

mongoose.Promise = global.Promise
mongoose.connect(connStr)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + connStr)
})
mongoose.connection.on('error', err => {
  console.log('Mongoose error: ' + err)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from ' + connStr)
})
