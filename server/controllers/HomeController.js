const express = require('express')
const router = express.Router()
const path = require('path')
// const Listing = require('../models/Listing')

router.get('/', (req, res) => {
  res.render('home', {
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username,
    cat: 'meow'
  })
})

module.exports = router