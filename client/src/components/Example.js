const features = [
  { name: 'Origin', description: 'Designed by Sythentic And Lather Craft' },
   { name: 'Material', description: 'Durable and cost-effective, ideal for versatile usage. Lightweight and provide superior cushioning. Provides a premium look and feel.' },
  // { name: 'Material', description: {
  //   "Synthetic leather upper": "Provides a premium look and feel.",
  //   "Soling materials":{
  //       "Durable rubber soles": "Offer flexibility and traction.",
  //       "TPR (Thermoplastic Rubber) soles": "Combine the qualities of rubber and plastic for enhanced comfort and resilience.",
  //       "PU (Polyurethane) soles": "Lightweight and provide superior cushioning.",
  //       "PVC (Polyvinyl Chloride) soles": "Durable and cost-effective, ideal for versatile usage."
  //     }

  // } },
  { name: 'Dimensions', description: 'Sandals: Various sizes available Shoes: Various sizes available' },
  { name: 'Finish', description: 'Smooth and polished synthetic & leather finish.' },
  { name: 'Includes', description: 'Adjustable straps and removable insoles for added comfort.' },
  { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
]

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Product Specifications</h2>
          <p className="mt-4 text-gray-500">
           The synthetic leather sandals and shoes are meticulously crafted to provide comfort and durability. They feature a water-resistant coating and breathable lining for enhanced wearability.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_02-2100.jpg"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_05-2100.jpg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_01-2100.jpg"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://media-uk.landmarkshops.in/cdn-cgi/image/h=1200,w=1200,q=85,fit=cover/max-new/1000012866509-Grey-GUNMETAL-1000012866509_03-2100.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  )
}
