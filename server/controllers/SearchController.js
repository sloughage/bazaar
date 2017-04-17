const express = require('express')
const router = express.Router()
const path = require('path')
// const Listing = require('../models/Listing')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'search.html'))
})

module.exports = router