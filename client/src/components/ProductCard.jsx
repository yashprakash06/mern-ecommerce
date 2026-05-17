import { Link } from "react-router-dom";

// ProductGrid wrapper component for Amazon-style grid layout
// Usage: <ProductGrid products={products} />
export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  // Handle uploaded images from backend
  const imageUrl = product.image?.startsWith("/uploads")
    ? `http://localhost:5000${product.image}`
    : product.image;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 hover:border-neutral-300">
      {/* Product Image Container */}
      <div className="relative h-48 bg-neutral-50 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Brand & Category Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
            {product.brand}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-900 text-white">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product._id}`} className="group/link">
          <h3 className="text-lg font-semibold text-neutral-900 leading-tight mb-2 line-clamp-2 group-hover/link:text-neutral-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 uppercase tracking-wide">Price</span>
            <span className="text-xl font-bold text-neutral-900">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 active:scale-95 transition-all duration-200"
          >
            View Details
            <svg
              className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
export { ProductCard };
