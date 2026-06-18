import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import Paginate from "../../components/Paginate";

function ProductListPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("search") || "";
  const pageNumber = searchParams.get("page") || "1";

  // Delete product handler
  const deleteHandler = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      return;
    }

    try {
      await API.delete(`/api/products/${id}`);

      // Remove deleted product from UI
      setProducts(
        products.filter(
          (product) => product._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  const createProductHandler = async () => {
    if (
      !window.confirm(
        "Are you sure you want to create a new product?"
      )
    ) {
      return;
    }

    try {
      const { data } = await API.post(
        "/api/products",
        {}
      );

      // Redirect to product edit page
      navigate(`/admin/product/${data._id}/edit`);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create product"
      );
    }
  };

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length === 0) setLoading(true);
      else setIsSearching(true);

      try {
        const endpoint = keyword
          ? `/api/products/search?q=${keyword}&page=${pageNumber}`
          : `/api/products?page=${pageNumber}`;
          
        const { data } = await API.get(endpoint);
        
        if (Array.isArray(data)) {
          setProducts(data);
          setPage(1);
          setPages(1);
        } else {
          setProducts(data.products || []);
          setPage(data.page || 1);
          setPages(data.pages || 1);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch products"
        );
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    };

    fetchProducts();
  }, [keyword, pageNumber, products.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 dark:border-[#281F4D] transition-colors duration-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-200 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-red-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-200 mb-2">Error Loading Products</h2>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-200">Product Management</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400 transition-colors duration-200">
              {products.length} {products.length === 1 ? "product" : "products"} {keyword ? 'found' : 'in inventory'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-1 justify-end">
            <div className="w-full sm:max-w-xs lg:max-w-md">
              <SearchBox isSearching={isSearching} />
            </div>
            <button
              onClick={createProductHandler}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Product
            </button>
          </div>
        </div>

        {/* Products Table - Desktop */}
        <div className="hidden lg:block bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-slate-100 dark:border-[#382B66] transition-colors duration-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border-b border-slate-100 dark:border-[#382B66] transition-colors duration-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">Product ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#382B66] transition-colors duration-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 dark:bg-[#070514] transition-colors duration-200 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors duration-200 bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200 px-2 py-1 rounded">
                      {product._id.slice(-8)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white transition-colors duration-200">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-200">₹{product.price?.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
                      {product.brand}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700">
                  {product.category?.name || product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Products Cards - Mobile/Tablet */}
        <div className="lg:hidden space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-slate-100 dark:border-[#382B66] transition-colors duration-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white transition-colors duration-200 truncate">{product.name}</h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-1">ID: {product._id.slice(-8)}</p>
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-200 ml-4">₹{product.price?.toLocaleString()}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
                  {product.brand}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700">
                  {product.category?.name || product.category}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-[#382B66] transition-colors duration-200">
                <Link to={`/admin/product/${product._id}/edit`} className="flex-1">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteHandler(product._id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Paginate pages={pages} page={page} />

        {/* Empty State */}
        {products.length === 0 && (
          <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-slate-100 dark:border-[#382B66] transition-colors duration-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400 dark:text-slate-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-200 mb-2">
              {keyword ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200 mb-6">
              {keyword ? `We couldn't find any products matching "${keyword}".` : 'Get started by creating your first product.'}
            </p>
            <button
              onClick={createProductHandler}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListPage;
