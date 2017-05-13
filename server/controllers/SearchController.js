const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res) => {
  Item.find()
  .then(items => {
    res.render('search', {
      isLoggedIn: req.session.isLoggedIn,
      items: items,
      query: req.query
    })
  })
})

module.exports = router