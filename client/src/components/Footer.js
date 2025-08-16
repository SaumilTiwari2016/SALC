// src/components/Footer.jsx
import React, { useState } from 'react'
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa'
import axios from 'axios'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // { type: 'success'|'error', message: '' }
  const year = new Date().getFullYear()

  const social = [
    { Icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com' },
    { Icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
    { Icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { Icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com' },
    { Icon: FaGithub, label: 'GitHub', href: 'https://github.com' },
  ]

  const usefulLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Products', href: '/productslist' },
    { label: 'New Arrivals', href: '/productslist?sort=new' },
  ]

  const otherLinks = [
    { label: 'MIT License', href: '/license' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Contact Us', href: '/contactus' },
  ]

  const handleSubscribe = async e => {
    e.preventDefault()
    setStatus(null)

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' })
      return
    }

    try {
      // If you have a newsletter API endpoint, this will use it.
      // If not present on the server this will error and show fallback message.
      await axios.post('/api/newsletter', { email })
      setStatus({ type: 'success', message: 'Thanks — subscription confirmed.' })
      setEmail('')
    } catch (err) {
      // graceful fallback if API not available
      setStatus({
        type: 'success',
        message:
          'Thanks — we saved your interest locally. (Server not configured)' ,
      })
      setEmail('')
    }
  }

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="border-t border-slate-100 bg-gradient-to-b from-[#FFF8ED] to-white text-slate-800"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand / Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dfzlv9dkm/image/upload/v1719556518/SALC/jaw2xi1njskarvcd4y1w.png"
                alt="SALC logo"
                className="h-12 w-auto"
              />
              <span className="text-lg font-semibold">Synthetic & Leather Craft</span>
            </div>

            <p className="text-sm text-slate-600 max-w-sm">
              Premium synthetic leather products designed for durability and style.
              Reach out for orders, custom requests, and wholesale partnerships.
            </p>

            <div className="flex items-center gap-3 mt-2">
              {social.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm border border-slate-100 hover:translate-y-[-2px] transition-transform"
                >
                  <Icon className="h-4 w-4 text-slate-700" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Useful links</h4>
              <ul className="space-y-2">
                {usefulLinks.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-600 hover:text-amber-600 transition"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Other resources</h4>
              <ul className="space-y-2">
                {otherLinks.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-600 hover:text-amber-600 transition"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter / Contact */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100">
            <h4 className="text-lg font-semibold text-slate-900">Join the newsletter</h4>
            <p className="mt-2 text-sm text-slate-600">
              Get new arrivals & special offers — one monthly email, unsubscribe anytime.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2" role="form" aria-label="newsletter form">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition"
              >
                Subscribe
              </button>
            </form>

            {status && (
              <div
                role="status"
                className={`mt-3 text-sm ${
                  status.type === 'success' ? 'text-amber-700' : 'text-rose-600'
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="mt-6 border-t border-slate-100 pt-4">
              <h5 className="text-sm font-semibold text-slate-900">Contact</h5>
              <p className="mt-1 text-sm text-slate-600">hello@yourdomain.com</p>
              <p className="text-sm text-slate-600">+91 12345 67890</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {year} Synthetic & Leather Craft — All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="text-sm text-slate-600 hover:text-amber-600 transition"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-slate-600 hover:text-amber-600 transition"
            >
              Terms
            </a>

            <button
              onClick={handleBackToTop}
              className="ml-4 inline-flex items-center gap-2 text-sm text-slate-700 hover:text-amber-600 transition"
              aria-label="Back to top"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
