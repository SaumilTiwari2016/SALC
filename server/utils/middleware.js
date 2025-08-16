const logger = require('./logger')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

const productDataExtractor = (request, response, next) => {
  console.log(request.body,">>>>>>>>>>>re")
  const { name, description, price, imagePath, articleNo } = request.body
  request.product = {
    name,
    description: description ? description : '',
    price,
    imagePath: imagePath ? imagePath : '',
    user: request.user._id,
    articleNo: articleNo ? articleNo : '',
  }
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const auth = request.get('authorization') || ''
    logger && logger.info && logger.info('userExtractor auth header: ' + auth)
    if (!auth.toLowerCase().startsWith('bearer ')) {
      return response.status(401).json({ error: 'token missing or malformed' })
    }

    const token = auth.substring(7)
    let decoded
    try {
      decoded = jwt.verify(token, process.env.SECRET)
    } catch (err) {
      // clear informative message for expired/invalid tokens
      if (err.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
      }
      return response.status(401).json({ error: 'invalid token' })
    }

    const id = decoded.id || decoded._id
    if (!id) return response.status(401).json({ error: 'invalid token payload' })

    const user = await User.findById(id)
    if (!user) return response.status(401).json({ error: 'user not found' })

    request.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const orderDataExtractor = async (request, response, next) => {
  const { name, description, price, imagePath } = request.body
  request.product = {
    name,
    description: description ? description : '',
    price,
    imagePath: imagePath ? imagePath : '',
    user: request.user._id,
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  productDataExtractor,
  orderDataExtractor,
}
