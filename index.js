const express = require('express')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const data = require('./data')
const app = express() // invoke express in order to create an instance

const PORT = process.env.PORT || 3000

// JSON and form parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use(morgan('dev'))

// Set view engine
app.set('view engine', 'ejs')

// Set static folder
app.use(express.static('public'))

// ROUTES
// Welcome 
app.get('/', (req, res) => {
  res.render('pages/home')
})

// Get all users
app.get('/users', (req, res) => {
  res.render('pages/users', {
    users: data.users
  })
})

// Get all schedules
app.get('/schedules', (req, res) => {
  res.render('pages/schedules', {
    schedules: data.schedules
  })
})

// Get new user
app.get('/users/new', (req, res) => {
  res.render('pages/new-user')
})

//Get new schedule
app.get('/schedules/new', (req, res) => {
  res.render('pages/new-schedule')
})

// Get individual user
app.get('/users/:id', (req, res) => {
  res.render('pages/user',{
    id:req.params.id,
    users : data.users
  })
})


//Get user's schedules
app.get('/schedules/:id', (req,res) => {
  const uschedule = data.schedules.filter(schedule => schedule.user_id == Number(req.params.id))
  res.render('pages/schedule',{
    id:req.params.id,
    schedules : uschedule
  })
      
})

// Create new schedules
app.post('/schedules', (req, res) => {
  // TODO: Validate data


  //Add new schedules to all schedules
  data.schedules.push(req.body)
  res.redirect('/schedules')
})

// Create new user
app.post('/users', (req, res) => {

  
  // Using bcryptjs
  const password = req.body.password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  req.body.password = hash
  data.users.push(req.body)
  res.redirect('/users')
})

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})