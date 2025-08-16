// controllers/orders.js
const orderRouter = require('express').Router()
const Order = require('../models/order')

// ✅ Fixed spelling: use correct import
const { calculateProductTotal } = require('../utils/order_helper')
const { userExtractor } = require('../utils/middleware')

// GET all orders
orderRouter.get('/', userExtractor, async (request, response, next) => {
  try {
    console.log('--- GET /api/orders invoked ---')
    console.log('AUTH HEADER:', request.get('authorization'))
    console.log(
      'REQ.USER:',
      request.user ? { id: request.user._id, isAdmin: request.user.isAdmin } : null
    )
    console.log('Query params:', request.query)

    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    let query = { user: request.user._id }

    // Admin view
    if (request.user.isAdmin && request.query.type === 'admin') {
      query = {}
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('user', { name: 1, username: 1 })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: { name: 1, price: 1, imagePath: 1 },
        },
      })

    console.log(`Found ${orders.length} orders for query`, query)
    response.json(orders)
  } catch (err) {
    console.error('Error in GET /api/orders:', err)
    next(err)
  }
})

// POST create new order
orderRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const { products, phone, address } = request.body

    if (!products || !Array.isArray(products) || products.length === 0) {
      return response.status(400).json({ error: 'No products provided' })
    }

    const transformedProducts = products.map(p => ({
      product: p.id,
      quantity: p.quantity,
    }))

    // ✅ Correct function usage
    const amount = await calculateProductTotal(products)

    const newOrder = new Order({
      user: request.user._id,
      products: transformedProducts,
      amount,
      phone,
      address,
    })
    const returnedOrder = await newOrder.save()

    response.status(201).json(returnedOrder)
  } catch (err) {
    console.error('Error in POST /api/orders:', err)
    next(err)
  }
})

// DELETE order by id
orderRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const id = request.params.id
    const order = await Order.findById(id)
    if (!order) return response.status(404).json({ error: 'order not found' })

    // Only admin or owner can delete
    if (!request.user.isAdmin && order.user.toString() !== request.user._id.toString()) {
      return response.status(403).json({ error: 'forbidden' })
    }

    await Order.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) {
    console.error('Error in DELETE /api/orders/:id', err)
    next(err)
  }
})

// For development only: clear all orders
orderRouter.get('/temp/clear', async (request, response, next) => {
  try {
    await Order.deleteMany({})
    response.json({ message: 'cleared all orders' })
  } catch (err) {
    next(err)
  }
})

module.exports = orderRouter
