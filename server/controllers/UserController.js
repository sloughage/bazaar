const express = require('express')
const router = express.Router()
// const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
  // res.sendfile(path.join(__dirname, '../views', 'register.html'))
  res.sendfile('server/views/register.html')
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

router.get('/login', (req, res) => {
  res.sendfile('server/views/login.html')
})

module.exports = router