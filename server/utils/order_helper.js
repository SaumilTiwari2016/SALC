// utils/order_helper.js
const Product = require('../models/product')

const calculateProductTotal = async (data) => {
  if (!Array.isArray(data) || data.length === 0) return 0

  const productIds = data.map(p => p.id)
  const productRecords = await Product.find({ _id: { $in: productIds } })

  const amount = data.reduce((total, p) => {
    const productInDb = productRecords.find(pr => pr._id.toString() === p.id)
    if (!productInDb) return total // skip missing product
    const quantity = Number(p.quantity) || 1 // default to 1 if invalid
    return total + productInDb.price * quantity
  }, 0)

  return amount
}

module.exports = { calculateProductTotal }
