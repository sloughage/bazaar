const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res) => {
  let query = {}
  if (typeof req.query.title === 'string') query.title = req.query.title
  if (typeof req.query.creator === 'string') query.creator = [req.query.creator]
  else if (typeof req.query.creator === 'object') query.creator = req.query.creator
  if (typeof req.query.tag === 'string') query.tag = [req.query.tag]
  else if (typeof req.query.tag === 'object') query.tag = req.query.tag
  if (!isNaN(req.query.min)) query.min = req.query.min
  if (!isNaN(req.query.max)) query.max = req.query.max
  let rarr = []
  if (query.title) rarr.push({title: query.title})
  if (query.creator) {
    for (let c of query.creator) {
      rarr.push({creators: c})
    }
  }
  if (query.tag) {
    for (let t of query.tag) {
      rarr.push({tags: t})
    }
  }
  if (query.min) {
    rarr.push({price: {$gte: +query.min}})
  }
  if (query.max) {
    rarr.push({price: {$lte: +query.max}})
  }
  let robj
  if (rarr.length > 0) robj = {$and: rarr}
  else robj = {}
  Item.find(robj)
  .then(items => {
    res.render('search', {
      isLoggedIn: req.session.isLoggedIn,
      items: items,
      query: query
    })
  })
})

module.exports = router