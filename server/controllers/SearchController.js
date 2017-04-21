const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res) => {
  console.log(req.query)
  // const query = req.query.split('$')
  // let obj = {
  //   title: str => {

  //   },
  //   creators: str => {

  //   },
  //   tags: str => {

  //   }
  // }


  Item.find()
  .then(items => {
    res.render('search', {
      isLoggedIn: req.session.isLoggedIn,
      items: items
    })
  })
})

module.exports = router