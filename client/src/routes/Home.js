import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Example from '../components/Example'
import Team from '../components/Team'
import Products from '../components/Products'
import productService from '../services/products'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [topOffset, setTopOffset] = useState(0)

  // detect fixed/sticky header height so we have comfortable gap
  useEffect(() => {
    const detectHeader = () => {
      const selectors = ['header', 'nav', '.navbar', '#navbar', '.site-header']
      let maxBottom = 0
      selectors.forEach(sel => {
        const el = document.querySelector(sel)
        if (!el) return
        const style = window.getComputedStyle(el)
        if (['fixed', 'sticky', 'absolute'].includes(style.position)) {
          const r = el.getBoundingClientRect()
          maxBottom = Math.max(maxBottom, Math.ceil(r.bottom))
        }
      })
      setTopOffset(maxBottom ? maxBottom + 20 : 20) // bigger buffer for airy feel
    }
    detectHeader()
    window.addEventListener('resize', detectHeader)
    const t = setTimeout(detectHeader, 300)
    return () => {
      window.removeEventListener('resize', detectHeader)
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await productService.getAll()
        if (mounted) setProducts(res || [])
      } catch (err) {
        console.error('load products', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div
      className="min-h-screen text-slate-900"
      style={{
        paddingTop: topOffset,
        background: 'linear-gradient(180deg,#FFF8ED 0%, #FEFDFB 50%, #FFFFFF 100%)'
      }}
    >
      <Hero />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-8">
        {/* Featured Products container: airy, white glass card */}
        <section className="relative z-10 rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100 bg-white/90">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">Featured Products</h2>
              <p className="mt-2 text-slate-600 max-w-xl">
                Curated picks, best sellers and seasonal highlights — handpicked for quality & comfort.
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="/productslist"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 transition"
              >
                Browse all
              </a>
            </div>
          </div>

          <div className="mt-8">
            <Products data={products} />
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/productslist"
              className="px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-700 hover:shadow-md transition"
            >
              View All Products
            </a>
          </div>
        </section>

        {/* Specs / Example */}
        <div className="mt-12">
          <Example />
        </div>

        {/* Team */}
        <div className="mt-12">
          <Team />
        </div>
      </main>
    </div>
  )
}
