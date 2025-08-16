// src/components/Admin/ProductsTab.jsx
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

import ProductForm from '../ProductForm'
import ProductEditForm from '../ProductEditForm'
import DeleteProduct from '../DeleteProduct'
import productService from '../../services/products'
import { useSelector } from 'react-redux'
import { numberWithCommas } from '../../utils' // adjust path if needed

// Truncate by words, return short + " ..."
function truncateWords(str = '', maxWords = 2) {
  if (!str) return ''
  const words = str.trim().split(/\s+/)
  if (words.length <= maxWords) return str
  return words.slice(0, maxWords).join(' ') + ' ...'
}

const ProductsTab = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [alert, setAlert] = useState(null)
  const user = useSelector(state => state.user?.user)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await productService.getAll()
        setProducts(res || [])
      } catch (err) {
        console.error('Failed to fetch products', err)
      }
    }

    if (user) {
      if (typeof productService.setToken === 'function') productService.setToken(user.token)
      fetch()
    } else {
      fetch()
    }
  }, [user])

  const handleSave = async (productData, clearForm) => {
    try {
      const newP = await productService.create(productData)
      setProducts(s => [newP, ...s])
      setAlert({ message: 'Product created', type: 'success' })
      clearForm && clearForm()
    } catch (err) {
      setAlert({ message: err?.response?.data?.error || 'Create failed', type: 'error' })
    }
  }

  const handleEditSaved = updatedProduct => {
    const id = updatedProduct.id || updatedProduct._id
    setProducts(prev => prev.map(p => {
      const pid = p.id || p._id
      return pid === id ? { ...p, ...updatedProduct, id } : p
    }))
    const toggle = document.getElementById('edit-modal-toggle')
    if (toggle) toggle.checked = false
    setSelectedProduct(null)
  }

  const handleDeleted = id => {
    setProducts(prev => prev.filter(p => (p.id || p._id) !== id))
    const toggle = document.getElementById('delete-modal-toggle')
    if (toggle) toggle.checked = false
    setSelectedProduct(null)
  }

  return (
    <Fragment>
      {/* top form */}
      <ProductForm onCancel={() => setAlert(null)} onSubmit={handleSave} alert={alert} />

      <div className="mt-6 space-y-4">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          products.map(p => {
            const pid = p.id || p._id
            const shortName = truncateWords(p.name || '', 2)     // show two words
            const shortDesc = truncateWords(p.description || '', 6) // show six words

            return (
              <div
                key={pid}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
              >
                {/* Left: thumbnail */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                    {p?.imagePath ? (
                      <img src={p.imagePath} alt={p.name} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <div className="text-gray-300 text-sm">No image</div>
                    )}
                  </div>
                </div>

                {/* Middle: name + meta + description */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        to={`/products/${pid}`}
                        className="block text-sm font-semibold text-gray-900 hover:text-indigo-600"
                        title={p.name || ''}
                        aria-label={p.name || 'Product link'}
                      >
                        {shortName || 'Untitled product'}
                      </Link>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-gray-400">{p.articleNo || p.sku || '—'}</span>
                        {/* you can put small badges here if needed */}
                      </div>

                      <div className="mt-2 text-sm text-gray-600" title={p.description || ''}>
                        {shortDesc}
                      </div>
                    </div>

                    {/* Right column: price & actions on larger screens */}
                    <div className="flex flex-col items-end justify-center gap-3">
                      <div className="flex items-baseline gap-2">
                        {/* <span className="text-yellow-500 text-lg" aria-hidden>🪙</span> */}
                        <span className="text-sm text-gray-600">₹</span>
                        <span className="text-xl font-extrabold text-gray-900">{numberWithCommas(Number(p.price || 0))}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="edit-modal-toggle"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 cursor-pointer"
                          onMouseDown={() => setSelectedProduct(p)}
                          title={`Edit ${p.name}`}
                          aria-label={`Edit ${p.name}`}
                        >
                          <AiOutlineEdit />
                          <span className="hidden md:inline">Edit</span>
                        </label>

                        <label
                          htmlFor="delete-modal-toggle"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 cursor-pointer"
                          onMouseDown={() => setSelectedProduct(p)}
                          title={`Delete ${p.name}`}
                          aria-label={`Delete ${p.name}`}
                        >
                          <AiOutlineDelete />
                          <span className="hidden md:inline">Delete</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Modals */}
      <ProductEditForm
        product={selectedProduct}
        onSaved={handleEditSaved}
        onClose={() => {
          const toggle = document.getElementById('edit-modal-toggle')
          if (toggle) toggle.checked = false
          setSelectedProduct(null)
        }}
      />

      <DeleteProduct
        product={selectedProduct}
        onDeleted={handleDeleted}
        onClose={() => {
          const toggle = document.getElementById('delete-modal-toggle')
          if (toggle) toggle.checked = false
          setSelectedProduct(null)
        }}
      />
    </Fragment>
  )
}

export default ProductsTab
