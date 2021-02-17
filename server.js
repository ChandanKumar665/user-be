const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const mongoose = require('mongoose')

const server = http.createServer(app)

// cors middleware.
app.use(cors())
dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '10kb' })) // Body limit is 10

// step 1
const PORT = process.env.PORT || 4000
// db config
const devDB = require('./config/keys')

const user = require('./route/api/v1/user')
const login = require('./route/api/v1/login')

app.use('/api/v1/user', user)
app.use('/api/v1/login', login)
console.log('p', process.env.DB_STRING)
mongoose
  .connect(process.env.MONGODB_URI || devDB.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log('Mongo Err')
    console.log(err)
  })

// serve static assets if it's in production
// set static folder
app.use(express.static('.'))
// checking the url host
// * means all are allowed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')) // relative path
})

server.listen(PORT, () => console.log(`server is started at the ${PORT}`))
