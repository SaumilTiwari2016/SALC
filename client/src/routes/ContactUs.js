import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Switch } from '@headlessui/react'
import Alert from '../components/Alert'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ContactUs() {
  const [alert, setAlert] = useState(null)
  const [sending, setSending] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const formRef = useRef(null)

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    company: '',
    message: '',
    phonenumber: '',
    email: '',
  })

  useEffect(() => {
    if (!alert) return
    const t = setTimeout(() => setAlert(null), 6000)
    return () => clearTimeout(t)
  }, [alert])

  const onChangeHandler = e => {
    const { name, value } = e.target
    setFormData(fd => ({ ...fd, [name]: value }))
  }

  const validate = () => {
    const { firstname, lastname, email, message, phonenumber } = formData
    if (!firstname.trim() || !lastname.trim()) {
      setAlert({ message: 'Please provide your first and last name.', type: 'error' })
      return false
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setAlert({ message: 'Please enter a valid email address.', type: 'error' })
      return false
    }
    if (!phonenumber.trim() || phonenumber.trim().length < 6) {
      setAlert({ message: 'Please enter a valid phone number.', type: 'error' })
      return false
    }
    if (!message.trim() || message.trim().length < 10) {
      setAlert({ message: 'Message is too short — please provide details.', type: 'error' })
      return false
    }
    if (!agreed) {
      setAlert({ message: 'Please agree to the privacy policy before submitting.', type: 'error' })
      return false
    }
    return true
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    setAlert(null)
    try {
      await axios.post('/api/contact', formData)
      setAlert({ message: 'Submitted successfully — we will contact you shortly.', type: 'success' })
      setFormData({
        firstname: '',
        lastname: '',
        company: '',
        message: '',
        phonenumber: '',
        email: '',
      })
      setAgreed(false)
      if (formRef.current) formRef.current.reset()
    } catch (err) {
      console.error(err)
      setAlert({
        message:
          err?.response?.data?.error ||
          'Something went wrong while sending your message. Please try again.',
        type: 'error',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      className="min-h-screen py-16"
      style={{
        background: 'linear-gradient(180deg,#FFF8ED 0%, #FEFDFB 50%, #FFFFFF 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Have a question, order inquiry or custom request? Fill the form and our team will reach out.
          </p>
        </div>

        {/* Alert */}
        <div className="mt-8">
          <Alert alert={alert} />
        </div>

        {/* Main card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: contact info / warm intro */}
          <aside className="rounded-2xl p-8 bg-white shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900">Get in touch</h3>
            <p className="mt-3 text-slate-600">
              We aim to reply within 24 business hours. For urgent requests, call us at the number below.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <a href="mailto:hello@yourdomain.com" className="text-slate-800 font-medium hover:underline">
                  hello@yourdomain.com
                </a>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <a href="tel:+911234567890" className="text-slate-800 font-medium hover:underline">
                  +91 12345 67890
                </a>
              </div>

              <div>
                <p className="text-sm text-slate-500">Address</p>
                <address className="not-italic text-slate-700">
                  1234 Sample Street, City, State — 400001
                </address>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-900">Business hours</h4>
              <p className="mt-1 text-sm text-slate-600">Mon — Fri: 9:00 AM — 6:00 PM</p>
            </div>
          </aside>

          {/* Right: form */}
          <main className="rounded-2xl p-8 bg-white shadow-sm border border-slate-100">
            <form ref={formRef} onSubmit={onSubmitHandler} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-slate-700">
                    First name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={onChangeHandler}
                    required
                    className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Jane"
                    aria-label="First name"
                  />
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-slate-700">
                    Last name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={onChangeHandler}
                    required
                    className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Doe"
                    aria-label="Last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={onChangeHandler}
                  className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  placeholder="Your company (optional)"
                  aria-label="Company"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                    className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="email@example.com"
                    aria-label="Email"
                  />
                </div>

                <div>
                  <label htmlFor="phonenumber" className="block text-sm font-medium text-slate-700">
                    Phone number
                  </label>
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="tel"
                    value={formData.phonenumber}
                    onChange={onChangeHandler}
                    required
                    className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="+91 12 3456 7890"
                    aria-label="Phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={onChangeHandler}
                  required
                  className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  placeholder="Tell us about your request..."
                  aria-label="Message"
                />
              </div>

              {/* Agree switch */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? 'bg-amber-500' : 'bg-slate-200',
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none'
                    )}
                    aria-label="Agree to privacy policy"
                  >
                    <span
                      className={classNames(
                        agreed ? 'translate-x-6' : 'translate-x-1',
                        'inline-block h-4 w-4 transform rounded-full bg-white shadow'
                      )}
                      aria-hidden="true"
                    />
                  </Switch>
                </div>

                <div className="text-sm">
                  <label className="font-medium text-slate-900">I agree to the privacy policy</label>
                  <p className="text-slate-600">We’ll use your contact details to respond to your inquiry. You can unsubscribe anytime.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className={classNames(
                    'inline-flex items-center justify-center w-full rounded-lg px-6 py-3 text-sm font-semibold shadow',
                    sending ? 'bg-amber-300 text-white cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'
                  )}
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Let's talk"
                  )}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}
