import React, { useState, useEffect } from 'react'
import productService from '../services/products'

const ProductEditForm = ({ product, onSaved, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    articleNo: '',
    price: '',
    description: '',
    imagePath: ''
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        articleNo: product.articleNo || '',
        price: product.price || '',
        description: product.description || '',
        imagePath: product.imagePath || ''
      })
    }
  }, [product])

  if (!product) return null

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const updated = await productService.edit(product.id, formData)
      onSaved(updated)
    } catch (err) {
      console.error('Update failed', err)
    }
  }

  return (
    <>
      <input type="checkbox" id="edit-modal-toggle" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Product</h3>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="input input-bordered w-full mb-2"
            />
            <input
              name="articleNo"
              value={formData.articleNo}
              onChange={handleChange}
              placeholder="Article No"
              className="input input-bordered w-full mb-2"
            />
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full mb-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full mb-2"
            />
            <input
              name="imagePath"
              value={formData.imagePath}
              onChange={handleChange}
              placeholder="Image URL"
              className="input input-bordered w-full mb-4"
            />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Save</button>
              <label htmlFor="edit-modal-toggle" className="btn" onClick={onClose}>Cancel</label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProductEditForm
