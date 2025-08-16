const { productDataExtractor } = require('../utils/middleware')
const productsRouter = require('express').Router()
const Product = require('../models/product')

// Get all products
productsRouter.get('/', async (request, response) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .populate('user', {
      username: 1,
      name: 1,
    })
  response.json(products)
})

// Get a product by ID
productsRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
  if (!product) {
    return response.status(404).json({ error: 'product not found' })
  }
  response.json(product)
})

// Add a new product (NO token)
productsRouter.post('/', productDataExtractor, async (request, response) => {
  const newProduct = new Product(request.product)
  const returnProduct = await newProduct.save()
  response.status(201).json(returnProduct)
})

// Update a product
productsRouter.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(updatedProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error updating product' })
  }
})

// Delete a product (NO token)
productsRouter.delete('/:id', async (request, response) => {
  const deletedProduct = await Product.findById(request.params.id)
  if (!deletedProduct) {
    return response.status(404).json({ error: 'invalid product id' })
  }
  await deletedProduct.deleteOne()
  response.status(200).json({ message: 'Product deleted successfully' })
})

// For development only
productsRouter.get('/temp/delete', async (req, res) => {
  await Product.deleteMany({})
  res.status(200).json({ message: 'Deleted All' })
})

module.exports = productsRouter
