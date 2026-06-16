import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(
          `/api/products/${id}`
        );

        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category?.name || data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Upload image file
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

const formData = new FormData();
formData.append("image", file);

const { data } = await API.post(
  "/api/upload",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

// Update image field automatically
setImage(data.image);

setUploading(false);
    } catch (err) {
      setUploading(false);

      alert(
        err.response?.data?.message ||
          "Image upload failed"
      );
    }
  };

  // Submit updated product
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/api/products/${id}`,
        {
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        }
      );

      navigate("/admin/productlist");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update product"
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#070514] dark:to-[#070514] transition-colors duration-200 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-200 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#070514] dark:to-[#070514] transition-colors duration-200 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white transition-colors duration-200 mb-2">Error Loading Product</h2>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-200 mb-6">{error}</p>
          <button
            onClick={() => navigate("/admin/productlist")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#070514] dark:to-[#070514] transition-colors duration-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/productlist")}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 transition-colors duration-200 hover:text-slate-800 dark:hover:text-white transition-colors duration-200 dark:text-white transition-colors duration-200 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white transition-colors duration-200">Edit Product</h1>
              <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-1">Update product information and inventory</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
              {/* Image Section */}
              <div className="lg:col-span-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#070514] dark:to-[#070514] transition-colors duration-200 p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white transition-colors duration-200 mb-4">Product Image</h3>
                
                {/* Image Preview */}
                <div className="aspect-square bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-xl border-2 border-dashed border-slate-200 dark:border-[#281F4D] transition-colors duration-200 overflow-hidden mb-4 flex items-center justify-center">
                  {image ? (
                    <img
                      src={image}
                      alt={name || "Product preview"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-slate-400">No image</p>
                    </div>
                  )}
                </div>

                {/* Image URL Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-white dark:bg-[#100C24] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl text-slate-800 dark:text-white transition-colors duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">Or Upload Image</label>
                  <label className="relative block cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-[#100C24] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                      {uploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                          <span className="text-sm text-indigo-600 font-medium">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <span className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200 font-medium">Choose File</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      onChange={uploadFileHandler}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="lg:col-span-2 p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white transition-colors duration-200 mb-6">Product Details</h3>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                      Product Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl text-slate-800 dark:text-white transition-colors duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:bg-[#100C24] transition-colors duration-200 transition-all"
                      />
                    </div>
                  </div>

                  {/* Price and Stock Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                        Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-slate-400 font-medium">$</span>
                        </div>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl text-slate-800 dark:text-white transition-colors duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:bg-[#100C24] transition-colors duration-200 transition-all"
                        />
                      </div>
                    </div>

                    {/* Count In Stock */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                        Count In Stock
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <input
                          type="number"
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                          placeholder="0"
                          min="0"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl text-slate-800 dark:text-white transition-colors duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:bg-[#100C24] transition-colors duration-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Brand and Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Brand */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                        Brand
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          placeholder="Enter brand name"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl text-slate-800 dark:text-white transition-colors duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:bg-[#100C24] transition-colors duration-200 transition-all"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                        Category
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="Enter category"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl text-slate-800 dark:text-white transition-colors duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:bg-[#100C24] transition-colors duration-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter product description..."
                      rows="5"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl text-slate-800 dark:text-white transition-colors duration-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:bg-[#100C24] transition-colors duration-200 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-[#382B66] transition-colors duration-200">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg shadow-indigo-500/25"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Product
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/admin/productlist")}
                    className="px-6 py-3 bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200 text-slate-700 dark:text-slate-300 transition-colors duration-200 rounded-xl font-semibold hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductEditPage;
