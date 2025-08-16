import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import productService from '../services/products'
import { BsSearch, BsFillCartPlusFill } from 'react-icons/bs'
import { FiRefreshCw, FiGrid, FiList } from 'react-icons/fi'
import { numberWithCommas } from '../utils'
import { cartActions } from '../store/cart-slice'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)
  const [gridMode, setGridMode] = useState('grid')

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await productService.getAll()
      setProducts(result || [])
    } catch (err) {
      console.error(err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filtered = useMemo(() => {
    let list = [...products]
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        p =>
          (p.name || '').toLowerCase().includes(q) ||
          (p.articleNo || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q)
      )
    }
    const min = parseFloat(minPrice)
    const max = parseFloat(maxPrice)
    if (!Number.isNaN(min)) list = list.filter(p => Number(p.price) >= min)
    if (!Number.isNaN(max)) list = list.filter(p => Number(p.price) <= max)

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => Number(a.price) - Number(b.price))
        break
      case 'price-desc':
        list.sort((a, b) => Number(b.price) - Number(a.price))
        break
      case 'name':
        list.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        break
      default:
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    }
    return list
  }, [products, search, minPrice, maxPrice, sort])

  const visibleProducts = filtered.slice(0, visibleCount)
  const canLoadMore = filtered.length > visibleCount

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-16 py-12">
      {/* Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 sticky top-4 z-10 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1 flex gap-3 items-center">
            <div className="relative flex-1">
              <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setVisibleCount(12) }}
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-white"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name A → Z</option>
            </select>

            <button
              onClick={() => setGridMode(g => (g === 'grid' ? 'list' : 'grid'))}
              className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
              title="Toggle view"
            >
              {gridMode === 'grid' ? <FiGrid /> : <FiList />}
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <input
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="Min ₹"
              type="number"
              className="w-24 px-3 py-2 rounded-lg border bg-white"
            />
            <input
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="Max ₹"
              type="number"
              className="w-24 px-3 py-2 rounded-lg border bg-white"
            />
            <button
              onClick={() => { setMinPrice(''); setMaxPrice(''); setVisibleCount(12) }}
              className="px-4 py-2 rounded-full border bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      {error && (
        <div className="p-6 rounded-lg bg-red-50 text-red-700 border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className={`grid gap-6 ${gridMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
          <button
            onClick={loadProducts}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
          >
            <FiRefreshCw /> Try again
          </button>
        </div>
      ) : (
        <div className={`${gridMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} grid gap-6`}>
          {visibleProducts.map(p => <ProductCard key={p.id || p._id} product={p} gridMode={gridMode} />)}
        </div>
      )}

      {/* Load more */}
      <div className="mt-8 flex justify-center">
        {canLoadMore && !loading && (
          <button
            onClick={() => setVisibleCount(v => v + 12)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition"
          >
            Load more ({Math.max(0, filtered.length - visibleCount)} remaining)
          </button>
        )}
      </div>
    </div>
  )
}

/* ------------------------------ Product Card (price moved, no stock) ------------------------------ */
function ProductCard({ product, gridMode }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [justAdded, setJustAdded] = useState(false)

  const img = Array.isArray(product.images) && product.images.length
    ? product.images[0]
    : product.imagePath || '/placeholder.png'

  const handleClick = () => navigate(`/products/${product.id || product._id}`)

  // stock detection only used to disable Add button; not shown visually
  const inStock = product.inStock !== undefined ? !!product.inStock : (product.stock === undefined ? true : product.stock > 0)
  const addAction = cartActions.add || cartActions.addToCart

  const handleAdd = (e) => {
    e.stopPropagation()
    if (!addAction) {
      console.warn('cartActions.add / addToCart not found')
      return
    }

    const payload = {
      ...product,
      selectedColor: Array.isArray(product.colors) ? product.colors[0] : (product.color || null),
      selectedSize: (Array.isArray(product.sizes) && product.sizes.length) ? (typeof product.sizes[0] === 'string' ? product.sizes[0] : product.sizes[0].name || product.sizes[0].value) : null,
      imagePath: (Array.isArray(product.images) && product.images[0]) || product.imagePath,
      quantity: 1
    }

    dispatch(addAction(payload))
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1200)
  }

  // coin emoji (kept small and decorative)
  const coinEmoji = '🪙'
  const priceNum = Number(product.price || 0)
  const priceText = numberWithCommas(priceNum)

  return (
    <article
      onClick={handleClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg ${gridMode === 'list' ? 'flex gap-6 items-center' : ''} bg-white border border-gray-100`}
    >
      <div className={gridMode === 'list' ? 'w-1/3 flex-shrink-0 relative' : 'relative'}>
        {/* Image box */}
        <div className="w-full h-44 sm:h-52 lg:h-56 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-gray-100 shadow-sm">
          <img
            src={img}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ imageRendering: 'auto' }}
          />
        </div>
      </div>

      <div className={gridMode === 'list' ? 'flex-1' : ''}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="mt-3 text-lg font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
            <p className="text-xs text-gray-400 mt-1 mb-2">{product.articleNo || ''}</p>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{product.description}</p>
          </div>

          <div className="absolute right-3 top-3 z-20">
          <div className="inline-flex items-baseline gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold shadow-lg">
            {/* <span className="text-lg leading-none" aria-hidden>{coinEmoji}</span> */}
            <span className="flex items-baseline gap-1">
              <span className="text-base leading-none">₹</span>
              <span className="text-xl leading-none">{priceText}</span>
            </span>
          </div>
        </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div /> {/* spacer */}

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-transform
                ${inStock ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              title={inStock ? 'Add to cart' : 'Out of stock'}
              aria-disabled={!inStock}
            >
              <BsFillCartPlusFill className="text-base" />
              <span className="hidden sm:inline">{justAdded ? 'Added' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------ Skeleton Loader ------------------------------ */
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl p-4 bg-white border border-gray-100">
      <div className="h-44 bg-gray-200 rounded-xl mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded" />
        <div className="h-8 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export default ProductList
