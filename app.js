// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
  // res.render('index', { restaurants: restaurantList.results })
})

// routes setting add new function
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  if (!req.body.image) { req.body.image = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg' }
  const newItem = req.body
  return Restaurant.create(newItem)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id == req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })

  res.render('index', { restaurants: restaurants })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})