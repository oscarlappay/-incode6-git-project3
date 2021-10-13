const express = require('express')
//const bcrypt = require('bcryptjs')
const data = require('./data')
const app = express() // invoke express in order to create an instance

const PORT = process.env.PORT || 3000

// JSON and form parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES
// Welcome
app.get('/', (req, res) => {
  res.send("Welcome to our schedule website")
})

// Get all users
app.get('/users', (req, res) => {
  res.send(data.users)
})

// Get all schedules
app.get('/schedules', (req, res) => {
  res.send(data.schedules)
})

// Get individual user
app.get('/users/:id', (req, res) => {
  // TODO: Validate req.params.id

  const user = data.users[req.params.id]
  res.send(user)
})


app.get('/users/:user_id/schedules', (req,res) => {

  const uschedule = data.schedules[req.params.user_id].filter()
  res.send(uschedule)  
})

// Create new post
app.post('/posts', (req, res) => {
  // TODO: Validate data

  // Add post to all posts
  //data.posts.push(req.body)
  //res.send(req.body)
})

// Create new user
app.post('/users', (req, res) => {
  // Using bcryptjs
  const password = req.body.password
  //const salt = bcrypt.genSaltSync(10)
 //const hash = bcrypt.hashSync(password, salt)

  // TODO: Add hash to user object and then push to user array
  res.send(hash)
})



// CRUD -          Create, Read, Update,    Delete
// HTTP METHODS  - post,   get,  put/patch, delete


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})