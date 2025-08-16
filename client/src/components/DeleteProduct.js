import React, { useState, useEffect } from 'react'
import productService from '../services/products'

const DeleteProduct = ({ product, onDeleted, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    setLoading(false)
  }, [product])

  const closeModal = () => {
    const toggle = document.getElementById('delete-modal-toggle')
    if (toggle) toggle.checked = false
    onClose && onClose()
  }

  const handleDelete = async () => {
    if (!product) return
    const id = product.id || product._id
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return

    setLoading(true)
    setError(null)
    try {
      await productService.remove(id) // no token header
      onDeleted && onDeleted(id)
      closeModal()
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || 'Delete failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* DaisyUI checkbox toggle */}
      <input type="checkbox" id="delete-modal-toggle" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg text-red-600">Confirm Delete</h3>
          {error && <div className="mb-2 text-red-600">{error}</div>}
          <p className="my-4">
            Are you sure you want to delete <strong>{product?.name}</strong>?
          </p>

          <div className="modal-action justify-center">
            {/* IMPORTANT: use a button, not a label with htmlFor */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className={`btn btn-error ${loading ? 'loading' : ''}`}
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Backdrop to close by clicking outside */}
        <label className="modal-backdrop" htmlFor="delete-modal-toggle"></label>
      </div>
    </>
  )
}

export default DeleteProduct
