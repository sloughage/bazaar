let express = require('express')
let router = express.Router()
let Item = require('../models/Item')
let add = require('./DataController').add

router.get('/new', (req, res) => {
  res.render('new', {
    isLoggedIn: req.session.isLoggedIn
  })
})

router.post('/new', (req, res) => {
  if (req.session.isLoggedIn) {
    Item.create({
      userId: req.session.userId,
      username: req.session.username,
      status: 'active',
      date: Date.now(),
      title: req.body.title,
      creators: req.body.creators.filter(x => x !== ''),
      tags: req.body.tags.filter(x => x !== ''),
      price: Math.round(+req.body.price * 100) / 100
    }).then(item => {
      add(item.username, 'username')
      add(item.title, 'title')
      for (let c of item.creators) {
        add(c, 'creator')
      }
      for (let t of item.tags) {
        add(t, 'tag')
      }
      res.send('/i/' + item.id)
    }).catch(err => {
      res.send(err)
    })
  } else {
    res.send('not logged in')
  }
})

router.get('/:id', (req, res) => {
  Item.findOne({_id: req.params.id})
  .then(item => {
    res.render('item', {
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      item: item
    })
  }).catch(err => {
    res.send(err)
  })
})

router.put('/:id', (req, res) => {
  Item.findById({_id: req.params.id})
  .then(item => {
    item.title = req.body.title
    if (req.body.creators === undefined) {
      item.creators = []
    } else {
      item.creators = req.body.creators.filter(x => x !== '')
    }
    if (req.body.tags === undefined) {
      item.tags = []
    } else {
      item.tags = req.body.tags.filter(x => x !== '')
    }
    item.price = Math.round(+req.body.price * 100) / 100
    return item.save()
  }).then(item => {
    res.send('item updated')
  }).catch(err => {
    res.send(err)
  })
})

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item => {
    return item.remove()
  }).then(() => {
    res.send('deleted')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router