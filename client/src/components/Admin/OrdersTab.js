import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import orderService from '../../services/orders'
import Badge from '../Badge'
import { numberWithCommas } from '../../utils' // adjust path if needed
import { FiPhone, FiMapPin, FiHash } from 'react-icons/fi'

const AdminOrderProduct = ({ product = {}, quantity = 1 }) => {
  const price = Number(product?.price || 0)
  const lineTotal = price * (quantity || 1)

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        {product?.imagePath ? (
          <img
            src={product.imagePath}
            alt={product.name}
            className="w-14 h-14 object-contain rounded-md bg-white border"
          />
        ) : (
          <div className="w-14 h-14 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 border">
            📦
          </div>
        )}

        <div className="min-w-0">
          <div className="font-medium text-gray-800 truncate">{product?.name || 'Unknown'}</div>
          <div className="text-xs text-gray-400 mt-0.5 truncate">
            {product?.articleNo || product?.sku || ''}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end text-right min-w-[140px]">
        <div className="text-sm text-gray-600">
          ₹{numberWithCommas(price.toFixed(2))} × {quantity || 1}
        </div>
        <div className="font-semibold text-gray-800 mt-1">
          ₹{numberWithCommas(lineTotal.toFixed(2))}
        </div>
      </div>
    </div>
  )
}

const OrdersTab = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector(state => state.user.user)

  const getInitialData = async () => {
    if (!user?.token) return
    try {
      orderService.setToken(user.token)
      const result = await orderService.getAll('admin')
      setOrders(result || [])
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      setOrders([])
    }
  }

  useEffect(() => {
    getInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="space-y-4">
      {orders.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No orders found
        </div>
      )}

      {orders.map(order => {
        const {
          _id,
          user: orderUser,
          products = [],
          amount = 0,
          address = '',
          phone = '',
          status = 'pending',
          createdAt,
        } = order

        const created = createdAt ? new Date(createdAt) : null
        const createdText = created ? created.toLocaleString() : ''

        return (
          <div
            key={_id}
            className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Header: user + order meta */}
            <div className="p-4 border-b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                {/* left: user */}
                <div className="md:col-span-2 flex items-start gap-3">
                  <Badge status={status} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-gray-900 truncate">{orderUser?.name || 'Unknown'}</div>
                      <div className="text-xs text-gray-400 truncate">@{orderUser?.username || 'unknown'}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{orderUser?.email || ''}</div>
                  </div>
                </div>

                {/* right: meta (stable column) */}
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <FiHash className="text-gray-400" />
                    <span className="font-medium text-gray-700">Order:</span>
                    <span className="text-sm text-gray-600 break-all">{_id}</span>
                  </div>

                  {createdText && (
                    <div className="text-xs text-gray-400">{createdText}</div>
                  )}

                  <div className="text-sm text-gray-700 font-semibold">
                    Total: <span className="text-primary">₹{Number(amount || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address block */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiMapPin />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-gray-700 font-medium">Shipping address</div>
                    <div className="text-sm text-gray-600 mt-1 break-words">{address || 'Unknown'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPhone />
                    <div className="text-sm">{phone || '—'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products list */}
            <div className="divide-y divide-gray-100 p-4">
              {products.length === 0 ? (
                <div className="py-4 text-gray-500">No products in this order</div>
              ) : (
                products.map((p, idx) => (
                  <AdminOrderProduct
                    key={p._id || p.id || `${_id}-${idx}`}
                    product={p.product || p}
                    quantity={p.quantity || 1}
                  />
                ))
              )}
            </div>

            {/* Footer / status selector */}
            <div className="p-4">
              <label className="block text-gray-600 mb-2 text-sm">Update status (coming soon)</label>
              <div className="flex items-center gap-3">
                <select
                  className="select select-bordered w-full max-w-xs"
                  disabled
                  value={status}
                  onChange={() => {}}
                >
                  <option>pending</option>
                  <option>delivered</option>
                  <option>cancelled</option>
                </select>

                <div className="text-sm text-gray-500">Amount: <span className="font-medium text-gray-700">₹{Number(amount || 0).toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrdersTab
