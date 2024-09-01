import { React, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Radio, RadioGroup } from '@headlessui/react'

import Breadcrumb from '../components/Breadcrumb'
import { cartActions } from '../store/cart-slice'
import { numberWithCommas } from '../utils'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Product = () => {
  
  const product = useLoaderData()
  product.colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ]
  product.sizes= [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ]
  const { name, price, description, imagePath, articleNo} = product
   const [selectedColor, setSelectedColor] = useState(product.colors[0])
   const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(cartActions.add(product))
  }

  return (
    <div className="flex flex-col flex-1 items-center mb-8">
      <Breadcrumb />

      <div className="flex md:w-[890px] flex-col items-center md:flex-row md:items-start">
        <img
          src={imagePath}
          alt={name}
          className="bg-base-200 w-96 h-96 mr-0 md:mr-14 rounded-xl object-fill mb-6 shadow-xl"
        />
        <div className="flex flex-1 flex-col items-start">
          <p className="mb-4 text-xl">{name}</p>
          <p class="mt-1 text-sm text-gray-500 mb-5">Article No: {articleNo}</p>

          <p className="text-2xl text-primary mb-5">
            ₹ {numberWithCommas(price)}
          </p>

           {/* Colors */}
          <div className='mb-5'>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={({ focus, checked }) =>
                          classNames(
                            color.selectedClass,
                            focus && checked ? 'ring ring-offset-1' : '',
                            !focus && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                          )
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
          </div>

 <form className="mt-10">
            {/* Sizes */}
              <div className="mt-10 mb-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ focus }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            focus ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                          )
                        }
                      >
                        {({ checked, focus }) => (
                          <>
                            <span>{size.name}</span>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  focus ? 'border' : 'border-2',
                                  'pointer-events-none absolute -inset-px rounded-md',
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
</form>

          <button
            className="btn btn-primary gap-2 mb-8"
            onClick={handleAddToCart}
          >
            <BsFillCartPlusFill className="text-lg" />
            Add To Cart
          </button>
          <p className="mb-1 underline opacity-70">About</p>
          <p className="opacity-70">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Product
