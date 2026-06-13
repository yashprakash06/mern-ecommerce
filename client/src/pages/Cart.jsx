import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateCartQty,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate total cart price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Handle checkout button click
  const handleCheckout = () => {
    if (user) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center transition-colors duration-200 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-2 transition-colors duration-200">Your cart is empty</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200 shadow-sm">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="p-6 flex flex-col sm:flex-row gap-6"
                    >
                      {/* Product Image Placeholder */}
                    <div className="w-full sm:w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-xl flex-shrink-0 overflow-hidden border border-slate-100 dark:border-slate-700">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1 transition-colors duration-200">
                            {item.name}
                          </h3>
                          <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-200">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Qty:</span>
                            <button
                              onClick={() =>
                                updateCartQty(item._id, item.qty - 1)
                              }
                              className="w-9 h-9 flex items-center justify-center border border-slate-300 dark:border-slate-700 rounded-l-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                              disabled={item.qty <= 1}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-12 h-9 flex items-center justify-center border-y border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-colors duration-200">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQty(item._id, item.qty + 1)
                              }
                              className="w-9 h-9 flex items-center justify-center border border-slate-300 dark:border-slate-700 rounded-r-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Subtotal & Remove */}
                          <div className="flex items-center gap-6">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Subtotal: <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-200">₹{(item.price * item.qty).toLocaleString()}</span>
                            </p>
                            <button
                              onClick={() =>
                                removeFromCart(item._id)
                              }
                              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-6">
                <a 
                  href="/" 
                  className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </a>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24 transition-colors duration-200 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 transition-colors duration-200">
                  Order Summary
                </h2>

                <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium text-slate-900 dark:text-white transition-colors duration-200">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Shipping</span>
                    <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Tax</span>
                    <span className="font-medium text-slate-900 dark:text-white transition-colors duration-200">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
                  <span className="text-base font-semibold text-slate-900 dark:text-white transition-colors duration-200">Total</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">₹{totalPrice.toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 py-4 px-6 bg-indigo-600 dark:bg-indigo-500 text-white text-base font-medium rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-[0.98] transition-all shadow-sm"
                >
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Easy Returns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Best Price</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
