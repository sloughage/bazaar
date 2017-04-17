const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
  res.render('register', {
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username
  })
})

router.post('/register', (req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      return bcrypt.genSalt(10)
    }).then(salt => {
      return bcrypt.hash(req.body.password, salt)
    }).then(hash => {
      return User.create({
        username: req.body.username,
        password: hash
      })
    }).then(user => {
      req.session.username = user.username
      req.session.userId = user.id
      req.session.isLoggedIn = true
      res.redirect('/')
    }).catch(err => {
      res.send(err)
    })
})

router.post('/login', (req, res) => {
  let tuser
  User.findOne({username: req.body.username})
    .then(user => {
      tuser = user
      return bcrypt.compare(req.body.password, tuser.password)
    }).then(isMatch => {
      if (isMatch) {
        req.session.username = tuser.username
        req.session.userId = tuser.id
        req.session.isLoggedIn = true
        res.send('logged in')
      } else {
        res.send('username/password incorrect')
      }
    }).catch(err => {
      res.send(err)
    })
})

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.send(err)
    } else {
      res.send('logged out')
    }
  })
})

router.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.render('users', {users: users})
    }).catch(err => {
      res.send(err)
    })
})

module.exports = router