import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Badge from '../components/Badge'
import OrderProduct from '../components/OrderProduct'
import orderService from '../services/orders'
import { numberWithCommas } from '../utils'

const formatDateTime = iso => {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

export default function Order() {
  const user = useSelector(state => state.user?.user)
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // attach token if present (orderService should format 'Bearer <token>')
      if (user?.token) {
        orderService.setToken(user.token)
      } else {
        orderService.setToken(null)
      }

      const result = await orderService.getAll()
      setOrders(result || [])
    } catch (err) {
      console.error('Failed to load orders:', err)

      const status = err?.response?.status
      if (status === 401) {
        // Friendly message, then redirect to login so the user can re-authenticate
        setError('You are not authorized (session expired). Redirecting to login...')
        // small delay so the user sees message
        setTimeout(() => {
          // clear any client-side auth (if you have a logout action, dispatch it here)
          navigate('/login')
        }, 1200)
      } else {
        setError(err?.response?.data?.error || 'Failed to fetch orders. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [user, navigate])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const renderEmpty = () => (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold text-slate-800">No orders found</h3>
      <p className="mt-2 text-slate-600">You haven’t placed any orders yet.</p>
      <div className="mt-6">
        <Link to="/productslist" className="inline-block px-5 py-2 rounded-full bg-amber-500 text-white font-medium shadow">
          Browse products
        </Link>
      </div>
    </div>
  )

  const calcOrderTotals = products => {
    // products: [{ id, quantity, product: { price, ... } }, ...]
    let subtotal = 0
    for (const p of products) {
      const price = Number((p.product?.price ?? p.price ?? 0))
      subtotal += price * (p.quantity ?? 1)
    }
    return subtotal
  }

  return (
    <div className="min-h-[60vh] w-full max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Your Orders</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={loadOrders}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 hover:shadow-md"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* error */}
      {error && (
        <div className="mb-6 rounded-lg bg-rose-50 border border-rose-100 p-4 text-rose-700">
          {error}
        </div>
      )}

      {/* not logged in */}
      {!user && !loading && (
        <div className="mb-8 rounded-lg bg-amber-50 border border-amber-100 p-6 text-amber-900">
          <p className="mb-3">You must be logged in to see your orders.</p>
          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 bg-amber-500 text-white rounded-full shadow">Login</Link>
            <Link to="/productslist" className="px-4 py-2 border rounded-full">Browse Products</Link>
          </div>
        </div>
      )}

      {/* loading */}
      {loading ? (
        <div className="grid gap-6">
          {[1,2].map(i => (
            <div key={i} className="animate-pulse rounded-2xl p-6 bg-white shadow-sm border border-slate-100">
              <div className="h-4 w-1/3 bg-gray-200 mb-4 rounded" />
              <div className="h-40 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : null}

      {/* orders */}
      {!loading && orders && orders.length > 0 && (
        <div className="flex flex-col gap-6">
          {orders.map(order => {
            const orderId = order.id || order._id || order._id // fallback
            const created = formatDateTime(order.createdAt || order.created)
            const subtotal = calcOrderTotals(order.products || [])
            return (
              <article key={orderId} className="rounded-2xl p-6 bg-white shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">Order #{orderId}</h3>
                      <span className="text-sm text-slate-500">• {created}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">Items: {(order.products || []).length}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge status={order.status} />
                    <span className="text-slate-700 font-semibold">Total: ₹ {numberWithCommas(subtotal)}</span>
                    <Link to={`/orders/${orderId}`} className="text-sm text-amber-600 hover:underline">Details</Link>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4 space-y-3">
                  {(order.products || []).map(item => (
                    <div key={item.id || item.product?.id || Math.random()} className="flex items-center gap-4">
                      {/* If you already have OrderProduct component, use it; fallback rendering below */}
                      {item.product ? (
                        <OrderProduct product={item.product} quantity={item.quantity} />
                      ) : (
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-slate-800">{item.title || item.name || 'Item'}</div>
                              <div className="text-sm text-slate-500">{item.sku || ''}</div>
                            </div>
                            <div className="text-sm text-slate-700">
                              {item.quantity} × ₹{numberWithCommas(item.product?.price ?? item.price ?? 0)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* empty */}
      {!loading && (!orders || orders.length === 0) && !error && renderEmpty()}
    </div>
  )
}
