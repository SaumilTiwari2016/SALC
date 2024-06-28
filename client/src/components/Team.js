const people = [
  {
    name: 'Neetu Tiwari',
    role: 'Founder / CEO',
    imageUrl:
     'https://res.cloudinary.com/dfzlv9dkm/image/upload/v1719554542/SALC/abyu6fl0l9pwfg5odit2.png'
      // 'https://res.cloudinary.com/dfzlv9dkm/image/upload/v1718889802/fu598n0siiuo1eeag2ty.png',
  },
   {
    name: 'Saumil Tiwari',
    role: 'CTO',
    imageUrl:
      'https://res.cloudinary.com/dfzlv9dkm/image/upload/v1718889917/z5pdwq4atx9y0zwptwyg.png',
  },
  //  {
  //   name: 'Saumya Tiwari',
  //   role: 'CFO',
  //   imageUrl:
  //     'https://res.cloudinary.com/dfzlv9dkm/image/upload/v1718889917/z5pdwq4atx9y0zwptwyg.png',
  // },
  // More people...
]

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
           At the heart of our organization is a team of visionary leaders dedicated to driving innovation, excellence, and growth. Each member brings a wealth of experience, passion, and a deep commitment to our mission. Together, they guide us towards a future where we can make a lasting impact on our industry and community.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-40 w-40 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
