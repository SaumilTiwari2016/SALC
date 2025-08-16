import React from 'react'

const features = [
  {
    name: 'Origin',
    description: 'Designed by Synthetic & Leather Craft',
  },
  {
    name: 'Material',
    description:
      'Durable synthetic leather — lightweight, water resistant and comfortable.',
  },
  {
    name: 'Dimensions',
    description: 'Multiple sizes available; see individual product pages.',
  },
  {
    name: 'Finish',
    description: 'Smooth, polished finish with colorfast coatings.',
  },
  {
    name: 'Includes',
    description: 'Adjustable straps and removable insoles for extra comfort.',
  },
  {
    name: 'Considerations',
    description: 'Natural variation in grain and color can occur.',
  },
]

export default function Example() {
  return (
    <section
      aria-labelledby="example-heading"
      className="rounded-3xl p-8 md:p-12 bg-gradient-to-b from-[#FFF8ED] to-white shadow-lg border border-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-10 items-start">
          {/* Left: Title + Features */}
          <div className="space-y-6">
            <div>
              <h2 id="example-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Product Specifications
              </h2>
              <p className="mt-3 text-lg text-slate-600 max-w-xl">
                Crafted for longevity and comfort — premium synthetic leather with practical design details.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.name}
                  className="flex gap-4 items-start rounded-xl p-4 bg-white shadow-sm border border-slate-50 hover:shadow-md transition transform hover:-translate-y-0.5"
                >
                  <div className="flex-none">
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-tr from-amber-400 to-amber-200 text-white shadow">
                      {/* simple check/feature icon */}
                      <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M5 12l4 4L19 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-sm font-semibold text-slate-900">{f.name}</dt>
                    <dd className="mt-1 text-sm text-slate-600">{f.description}</dd>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/productslist"
                className="inline-flex items-center gap-3 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600 transition"
              >
                Explore the collection
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Image collage */}
          <div className="mt-8 md:mt-0">
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {/* Large hero image spanning two rows */}
              <div className="row-span-2 rounded-2xl overflow-hidden relative">
                <img
                  src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_02-2100.jpg"
                  alt="Featured product"
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                />
                <div className="absolute left-4 bottom-4 bg-white/80 backdrop-blur rounded-full px-3 py-1 text-sm font-medium text-slate-900 shadow">
                  New arrival
                </div>
              </div>

              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_05-2100.jpg"
                  alt="Product detail"
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                />
              </div>

              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_01-2100.jpg"
                  alt="Product alternate"
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                />
              </div>

              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_03-2100.jpg"
                  alt="Product detail 2"
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* optional caption */}
            <p className="mt-4 text-sm text-slate-500">
              Photos show craftsmanship and color options. Click <span className="font-medium text-slate-700">Explore the collection</span> to see more variants.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
