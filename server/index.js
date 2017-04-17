const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const pug = require('pug')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(session({
  secret: 'secret salt',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use(express.static(path.join(__dirname, 'public')))
// app.use('/', express.static(__dirname + '/server/views/'))
// app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./db/db')

app.use('/u', require('./controllers/UserController'))
// app.use('/l', require('./controllers/ListingController'))
// app.use('/s', require('./controllers/SearchController'))
app.use('/', require('./controllers/HomeController'))

server.listen(3000, () => {
  console.log('server is listening on port 3000')
})
