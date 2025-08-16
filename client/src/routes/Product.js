import React, { useMemo, useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsFillCartPlusFill } from 'react-icons/bs';

import Breadcrumb from '../components/Breadcrumb';
import { cartActions } from '../store/cart-slice';
import { numberWithCommas } from '../utils';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Product = () => {
  // Get product from the route loader (works with your current setup)
  const loaded = useLoaderData();
  const dispatch = useDispatch();

  // Normalize inputs so UI is stable even if backend fields are missing
  const images = useMemo(() => {
    if (Array.isArray(loaded?.images) && loaded.images.length) return loaded.images;
    return loaded?.imagePath ? [loaded.imagePath] : [];
  }, [loaded]);

  const colors = useMemo(() => {
    // accept strings or objects, normalize to hex/name strings
    const raw = Array.isArray(loaded?.colors) && loaded.colors.length
      ? loaded.colors
      : ['#111827', '#9ca3af', '#ffffff']; // default: black/gray/white
    return raw.map(c => (typeof c === 'string' ? c : (c.hex || c.value || c.name || '#9ca3af')));
  }, [loaded]);

  const sizes = useMemo(() => {
    // accept strings or objects, normalize to {label, inStock}
    const raw = Array.isArray(loaded?.sizes) && loaded.sizes.length
      ? loaded.sizes
      : ['XS', 'S', 'M', 'L', 'XL'];
    return raw.map(s => {
      if (typeof s === 'string') return { label: s, inStock: true };
      return { label: s.name || s.value || '', inStock: s.inStock !== false };
    }).filter(s => s.label);
  }, [loaded]);

  const name = loaded?.name || 'Product';
  const price = Number(loaded?.price || 0);
  const description = loaded?.description || '';

  // Selections (primitive values only)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    (sizes.find(s => s.inStock) || sizes[0] || {}).label
  );
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setSelectedColor(colors[0]);
  }, [colors]);

  useEffect(() => {
    setSelectedSize((sizes.find(s => s.inStock) || sizes[0] || {}).label);
  }, [sizes]);

  const addAction = cartActions.add || cartActions.addToCart;

  const handleAddToCart = () => {
    if (!addAction) {
      console.warn('cartActions.add / addToCart not found');
      return;
    }
    dispatch(
      addAction({
        ...loaded,
        selectedColor,
        selectedSize,
        imagePath: images[selectedImageIdx] || loaded?.imagePath,
        quantity: 1,
      })
    );
  };

  const mainImage = images[selectedImageIdx];

  return (
    <div className="flex flex-col flex-1 items-center mb-16">
      <Breadcrumb />

      <div className="w-full max-w-6xl px-4">
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-black/5 shadow-xl overflow-hidden">
          {/* soft ambient glow */}
          <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(closest-side,rgba(99,102,241,0.15),transparent_70%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white/70 backdrop-blur-md border border-white/30 shadow-lg">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImageIdx(i)}
                      className={cx(
                        'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition',
                        selectedImageIdx === i
                          ? 'border-indigo-500 ring-2 ring-indigo-400'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                      aria-label={`Preview ${i + 1}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                  {name}
                </h1>
                <p className="mt-4 text-3xl font-bold text-indigo-600">
                  ₹ {numberWithCommas(price)}
                </p>
              </div>

              {/* Colors */}
              {colors.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-sm font-medium text-slate-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={cx(
                          'relative inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition',
                          selectedColor === c
                            ? 'ring-2 ring-offset-2 ring-indigo-500 border-transparent'
                            : 'border-gray-300 hover:scale-105'
                        )}
                        title={c}
                        aria-label={`Color ${c}`}
                      >
                        <span
                          aria-hidden="true"
                          className="h-7 w-7 rounded-full"
                          style={{ backgroundColor: c }}
                        />
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {sizes.map((s) => {
                      const disabled = !s.inStock;
                      const checked = selectedSize === s.label && !disabled;
                      return (
                        <button
                          key={s.label}
                          type="button"
                          disabled={disabled}
                          onClick={() => !disabled && setSelectedSize(s.label)}
                          className={cx(
                            'relative flex items-center justify-center rounded-xl border py-2 text-sm font-semibold uppercase transition',
                            disabled
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'cursor-pointer bg-white text-slate-900 hover:bg-slate-50 border-gray-300 shadow-sm',
                            checked && 'ring-2 ring-indigo-500 border-transparent'
                          )}
                          title={disabled ? `${s.label} (Out of stock)` : s.label}
                        >
                          {s.label}
                          {disabled && (
                            <svg
                              className="pointer-events-none absolute inset-0 h-full w-full stroke-2 text-gray-300"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* CTA */}
              <button
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-white text-lg font-semibold shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0 w-fit"
                onClick={handleAddToCart}
              >
                <BsFillCartPlusFill className="text-xl" />
                Add To Cart
              </button>

              {/* Description card with See More / See Less */}
              {description && (
                <div className="mt-8 rounded-2xl border border-white/30 bg-white/70 p-5 shadow-md backdrop-blur-md">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    About this product
                  </h3>
                  <DescriptionToggle text={description} initialChars={220} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Collapsible description helper (no external deps)
const DescriptionToggle = ({ text, initialChars = 200 }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = (text || '').length > initialChars;
  const display = expanded ? text : (text || '').slice(0, initialChars) + (isLong ? '...' : '');

  return (
    <div>
      <p className="leading-relaxed text-slate-700">{display}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2 text-indigo-600 hover:underline text-sm font-medium"
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
};

export default Product;
