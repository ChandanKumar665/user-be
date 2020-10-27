const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const mongoose = require('mongoose')

const server = http.createServer(app)

// cors middleware
app.use(cors())
dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '10kb' })) // Body limit is 10
app.use(cookieParser())

// step 1
const PORT = process.env.PORT || 4000

// app.use('/api/v1/transaction', auth, routes.transaction)

mongoose
  .connect(process.env.MONGODB_URI || devDB.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => console.log(err))

// serve static assets if it's in production
// set static folder
app.use(express.static('.'))
// checking the url host
// * means all are allowed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')) // relative path
})

server.listen(PORT, () => console.log(`server is started at the ${PORT}`))
