const express = require('express')
const router = express.Router()
const path = require('path')
// const Listing = require('../models/Listing')

router.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '../views', 'home.html'))
})

module.exports = router