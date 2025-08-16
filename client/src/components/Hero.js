import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* soft cream blobs for subtle texture */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          style={{
            width: 520,
            height: 520,
            left: -80,
            top: -40,
            position: 'absolute',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,215,170,0.55), rgba(255,215,170,0.05) 40%, transparent 65%)',
            filter: 'blur(48px)',
            opacity: 0.9
          }}
        />
        <div
          style={{
            width: 420,
            height: 420,
            right: -60,
            bottom: -40,
            position: 'absolute',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 70% 70%, rgba(250,240,230,0.5), rgba(250,240,230,0.02) 40%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.9
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className="relative rounded-3xl px-6 py-12 md:py-16 md:px-10 shadow-xl border border-slate-100"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(252,250,248,0.94))'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: heading + CTA */}
            <div className="pr-2">
              <img
                src="https://res.cloudinary.com/dfzlv9dkm/image/upload/v1719556518/SALC/jaw2xi1njskarvcd4y1w.png"
                alt="SALC logo"
                className="h-20 mb-6"
                style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.06))' }}
              />

              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Synthetic & Leather Craft
              </h1>

              <p className="mt-4 text-lg text-slate-600 max-w-xl">
                Experience premium craftsmanship — light, durable and elegant finishes for everyday luxury.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/order"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 transition"
                >
                  Orders <BsArrowRight />
                </a>

                <a
                  href="/productslist"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:shadow-sm transition"
                >
                  Browse Products
                </a>
              </div>
            </div>

            {/* Right: spotlight product card */}
            <div className="w-full flex justify-center md:justify-end">
              <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg border border-slate-100 overflow-hidden">
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_02-2100.jpg"
                    alt="spotlight"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-semibold text-slate-900">Limited Edition</h3>
                  <p className="mt-2 text-sm text-slate-600">Comfort-first sandals crafted for style & wearability.</p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-amber-600 font-bold">₹799</span>
                    <a href="/productslist" className="ml-auto text-sm text-amber-500 hover:underline">Shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{/* end card */}
      </div>
    </header>
  )
}
