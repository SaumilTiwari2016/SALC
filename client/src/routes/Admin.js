// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react'
import OrdersTab from '../components/Admin/OrdersTab'
import ProductsTab from '../components/Admin/ProductsTab'
import { motion, AnimatePresence } from 'framer-motion'
import { FiClipboard, FiShoppingCart, FiUsers, FiBarChart } from 'react-icons/fi'
import { useSelector } from 'react-redux'

// Services (adjust paths if different)
import orderService from '../services/orders'
import productService from '../services/products'

const Admin = () => {
  const [tabState, setTabState] = useState(1) // default to Orders
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    uniqueCustomers: 0,
    totalRevenue: 0,
  })
  const [loadingStats, setLoadingStats] = useState(false)
  const user = useSelector(state => state.user?.user)

  const tabs = [
    { title: 'Products', element: <ProductsTab /> },
    { title: 'Orders', element: <OrdersTab /> },
  ]

  useEffect(() => {
    const loadStats = async () => {
      if (!user?.token) return
      setLoadingStats(true)
      try {
        if (typeof orderService.setToken === 'function') orderService.setToken(user.token)
        if (typeof productService.setToken === 'function') productService.setToken(user.token)

        const orders = (await orderService.getAll('admin')) || []
        const products = (await productService.getAll()) || []

        const totalOrders = orders.length
        const pendingOrders = orders.filter(o => (o.status || '').toLowerCase() === 'pending').length
        const uniqueCustomers = new Set(orders.map(o => (o.user && (o.user._id || o.user.id)) || o.user)).size
        const totalProducts = products.length
        const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0)

        setStats({ totalOrders, pendingOrders, totalProducts, uniqueCustomers, totalRevenue })
      } catch (err) {
        console.error('Failed to load admin stats', err)
      } finally {
        setLoadingStats(false)
      }
    }

    loadStats()
  }, [user])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage products, orders and settings</p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white shadow-sm border text-sm text-gray-700 hover:shadow">
              <FiClipboard /> Reports
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">
              Export
            </button>
          </div>
        </div>

        {/* Layout: main + right rail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content (tabs) */}
          <div className="lg:col-span-2">
            {/* Tabs header */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  {tabs.map((tab, index) => {
                    const isActive = index === tabState
                    return (
                      <button
                        key={index}
                        onClick={() => setTabState(index)}
                        className={`relative px-5 py-2 rounded-full text-sm font-medium transition ${
                          isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:text-indigo-600'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {tab.title}
                      </button>
                    )
                  })}
                </div>

                <div className="text-sm text-gray-500">Viewing: <span className="font-medium text-gray-700">{tabs[tabState].title}</span></div>
              </div>
            </div>

            {/* Animated tab content card (keeps full width for embedded tabs) */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tabState}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  {tabs[tabState].element}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right rail: live stats */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Total Orders</div>
                  <div className="text-2xl font-bold text-gray-900">{loadingStats ? '—' : stats.totalOrders}</div>
                </div>
                <div className="p-2 bg-indigo-50 rounded-full text-indigo-600">
                  <FiShoppingCart />
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500">Pending: <span className="font-medium text-gray-700">{loadingStats ? '—' : stats.pendingOrders}</span></div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Active Products</div>
                  <div className="text-2xl font-bold text-gray-900">{loadingStats ? '—' : stats.totalProducts}</div>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full text-yellow-600">
                  <FiBarChart />
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500">Unique customers: <span className="font-medium text-gray-700">{loadingStats ? '—' : stats.uniqueCustomers}</span></div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-full text-green-600"><FiUsers /></div>
                <div>
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="text-lg font-semibold text-gray-900">₹{loadingStats ? '—' : Number(stats.totalRevenue || 0).toFixed(2)}</div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">Invite</button>
                <button className="flex-1 px-3 py-2 rounded-md bg-white border text-sm">Manage</button>
              </div>
            </div>

            <div className="hidden md:block bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-4 text-sm text-gray-600 border border-indigo-50">
              <div className="font-medium text-gray-800 mb-1">Tips</div>
              <div>Use the Orders tab to quickly review shipping info and update statuses. Add product images for sharper listings.</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Admin
