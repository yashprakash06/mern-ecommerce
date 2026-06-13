import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";

export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const imageUrl = getImageUrl(product.image);

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative h-56 bg-slate-50 dark:bg-slate-800 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 dark:from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Brand & Category Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {product.brand}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product._id}`} className="group/link">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight mb-2 line-clamp-2 group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Price</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-white active:scale-95 transition-all duration-200 shadow-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
export { ProductCard };
