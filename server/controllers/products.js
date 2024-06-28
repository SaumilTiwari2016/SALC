const { productDataExtractor, userExtractor } = require('../utils/middleware')
const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', async (request, response) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .populate('user', {
      username: 1,
      name: 1,
    })
  response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
  if (!product) {
    return response.status(404).json({
      error: 'product not found',
    })
  }
  response.json(product)
})

productsRouter.post(
  '/',
  userExtractor,
  productDataExtractor,
  async (request, response) => {
    const newProduct = new Product(request.product)

    const returnProduct = await newProduct.save()
    response.status(201).json(returnProduct)
  }
)

productsRouter.put(
  '/:id',
  userExtractor,
  productDataExtractor,
  async (request, response) => {
    console.log(request.params.id,
      request.data, "<<<<<<<<<<<<<<<<edit")
    const updatedProduct = await Product.findByIdAndUpdate(
      request.params.id,
      request.data,
      { new: true }
    )

    response.status(200).json(updatedProduct)
  }
)

productsRouter.delete('/:id', userExtractor, async (request, response) => {
  const deleted = await Product.findByIdAndDelete(request.params.id)
  if (!deleted) {
    return response.status(404).json({
      error: 'invalid product id',
    })
  }
  response.status(204).end()
})

// For development only
productsRouter.get('/temp/delete', async (req, res) => {
  await Product.deleteMany({})
  res.status(200).json({
    message: 'Deleted All',
  })
})

module.exports = productsRouter
