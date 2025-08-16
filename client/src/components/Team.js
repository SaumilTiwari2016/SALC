import React, { useState } from 'react'

const people = [
  {
    name: 'Neetu Tiwari',
    role: 'Founder / CEO',
    imageUrl:
      'https://res.cloudinary.com/dfzlv9dkm/image/upload/v1719554542/SALC/abyu6fl0l9pwfg5odit2.png',
    bio:
      'Neetu leads strategy and product design with an obsessive focus on material quality and sustainable processes. She works closely with manufacturing partners and design teams to ensure each collection meets the brand’s durability and aesthetic standards.',
    email: 'neetu@example.com',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Saumil Tiwari',
    role: 'CTO',
    imageUrl:
      'https://res.cloudinary.com/dfzlv9dkm/image/upload/v1718889917/z5pdwq4atx9y0zwptwyg.png',
    bio:
      'Saumil architects the platform, improves performance, and creates developer-friendly tooling to keep the product stable and fast. He also leads data-driven improvements to the customer experience and order flows.',
    email: 'saumil@example.com',
    linkedin: 'https://www.linkedin.com/',
  },
]

function IconEmail({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8l-9 6-9-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconLinkedIn({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2"
        y="8"
        width="4"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="4" cy="4" r="1.6" fill="currentColor" />
    </svg>
  )
}

export default function Team() {
  const [modalPerson, setModalPerson] = useState(null)

  return (
    <section
      aria-labelledby="team-heading"
      className="rounded-3xl p-8 md:p-12 bg-gradient-to-b from-[#FFF8ED] via-white to-white shadow-lg border border-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-10 items-start">
          <div className="md:col-span-1">
            <h2
              id="team-heading"
              className="text-3xl font-extrabold text-slate-900"
            >
              Meet our leadership
            </h2>
            <p className="mt-4 text-slate-600">
              Driven by passion and guided by vision, our leaders are building a
              brand that blends craftsmanship, innovation, and sustainability
              for lasting impact.
            </p>
          </div>

          <ul className="md:col-span-2 mt-6 md:mt-0 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((p, idx) => (
              <li
                key={p.name + idx}
                className="group relative rounded-2xl bg-white/95 border border-slate-100 p-5 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 h-56 flex flex-col justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-none">
                    <div className="rounded-full p-1 bg-gradient-to-tr from-amber-300 to-amber-200 shadow-sm">
                      <img
                        src={p.imageUrl}
                        alt={`${p.name} portrait`}
                        className="h-20 w-20 rounded-full object-cover border-2 border-white"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {p.name}
                    </h3>
                    <p className="text-sm font-semibold text-amber-600 mt-1">
                      {p.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setModalPerson(p)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:text-amber-600 transition"
                  >
                    Read bio
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6 8l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {modalPerson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalPerson(null)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>

            <div className="flex items-center gap-4">
              <img
                src={modalPerson.imageUrl}
                alt={modalPerson.name}
                className="h-20 w-20 rounded-full border-2 border-amber-300"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {modalPerson.name}
                </h3>
                <p className="text-amber-600 font-medium">{modalPerson.role}</p>
              </div>
            </div>

            <p className="mt-4 text-slate-700 text-sm leading-relaxed">
              {modalPerson.bio}
            </p>

            <div className="mt-6 flex gap-3">
              {modalPerson.email && (
                <a
                  href={`mailto:${modalPerson.email}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 text-slate-700 hover:bg-amber-100 text-sm"
                >
                  <IconEmail /> Email
                </a>
              )}
              {modalPerson.linkedin && (
                <a
                  href={modalPerson.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 text-slate-700 hover:bg-amber-100 text-sm"
                >
                  <IconLinkedIn /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
