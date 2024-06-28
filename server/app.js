require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

const config = require('./utils/config')
const logger = require('./utils/logger')
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require('./utils/middleware')
const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const orderRouter = require('./controllers/orders')
const contactusRouter = require('./controllers/contact')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(express.static(path.join(__dirname, '../client/build')))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(tokenExtractor)

// API
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', orderRouter)
app.use('/api/contact', contactusRouter)

// app.post('/api/contact',(req, res) => {
//     console.log("hii3")
//     console.log("Received contact request with query parameters:", req.body);

//     const { 'first-name': firstname, 'last-name': lastname, 'company':company, 'email':email, 'phone-number': phonenumber, 'message':message } = req.body;

//     res.send(`Contact information received:
//               First Name: ${firstname}
//               Last Name: ${lastname}
//               Company: ${company}
//               Email: ${email}
//               Phone Number: ${phonenumber}
//               Message: ${message}`);

// })
   

// unknown end point for REST API
app.use('/api/*', unknownEndpoint)

// for client side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
})

app.use(errorHandler)

module.exports = app
