import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
          <p className="text-neutral-600 text-lg font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-amber-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e5e5e5" />
              </linearGradient>
            </defs>
            <path fill="url(#halfStar)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-5 h-5 text-neutral-200 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="text-xl font-semibold tracking-tight text-neutral-900">
                Store
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Home
                </a>
                <a href="/products" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Products
                </a>
                <a href="/categories" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Categories
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <a href="/cart" className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">Home</a>
            <span className="text-neutral-300">/</span>
            <a href="/products" className="text-neutral-500 hover:text-neutral-900 transition-colors">Products</a>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900 font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image */}
            <div className="aspect-square bg-white rounded-2xl border border-neutral-200 overflow-hidden flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-neutral-400">
                  <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Product Image</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Brand */}
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
                {product.brand}
              </span>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight mb-4 text-balance">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-neutral-600">
                  {product.rating} out of 5
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-semibold text-neutral-900">
                  ₹{product.price?.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-500">incl. of all taxes</span>
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-200 my-6"></div>

              {/* Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-neutral-500">Category:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700">
                  {product.category}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-neutral-500">Availability:</span>
                {product.countInStock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    In Stock ({product.countInStock} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-neutral-900 mb-2">Description</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="w-full bg-neutral-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:active:scale-100 text-base"
              >
                {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs text-neutral-500">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span className="text-xs text-neutral-500">Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span className="text-xs text-neutral-500">Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © 2024 Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductPage;
