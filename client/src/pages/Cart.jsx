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
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="text-xl font-semibold tracking-tight text-neutral-900">
                Store
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/products" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Products
                </a>
                <a href="/categories" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Categories
                </a>
                <a href="/deals" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Deals
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a href="/account" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                Account
              </a>
              <div className="relative">
                <a href="/cart" className="flex items-center gap-1 text-sm font-medium text-neutral-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="mt-2 text-sm text-neutral-500">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-neutral-900 mb-2">Your cart is empty</h2>
            <p className="text-neutral-500 mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
            <a 
              href="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                <div className="divide-y divide-neutral-100">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="p-6 flex flex-col sm:flex-row gap-6"
                    >
                      {/* Product Image Placeholder */}
                    <div className="w-full sm:w-32 h-32 bg-neutral-100 rounded-xl flex-shrink-0 overflow-hidden">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-neutral-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-lg font-semibold text-neutral-900">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-neutral-500 mr-2">Qty:</span>
                            <button
                              onClick={() =>
                                updateCartQty(item._id, item.qty - 1)
                              }
                              className="w-9 h-9 flex items-center justify-center border border-neutral-300 rounded-l-lg text-neutral-600 hover:bg-neutral-50 transition-colors disabled:opacity-50"
                              disabled={item.qty <= 1}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-12 h-9 flex items-center justify-center border-y border-neutral-300 text-sm font-medium text-neutral-900 bg-white">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQty(item._id, item.qty + 1)
                              }
                              className="w-9 h-9 flex items-center justify-center border border-neutral-300 rounded-r-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Subtotal & Remove */}
                          <div className="flex items-center gap-6">
                            <p className="text-sm text-neutral-500">
                              Subtotal: <span className="font-semibold text-neutral-900">₹{(item.price * item.qty).toLocaleString()}</span>
                            </p>
                            <button
                              onClick={() =>
                                removeFromCart(item._id)
                              }
                              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
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
                  href="/products" 
                  className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
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
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 pb-6 border-b border-neutral-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium text-neutral-900">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Tax</span>
                    <span className="font-medium text-neutral-900">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 border-b border-neutral-200">
                  <span className="text-base font-semibold text-neutral-900">Total</span>
                  <span className="text-xl font-bold text-neutral-900">₹{totalPrice.toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 py-4 px-6 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-xs text-neutral-500">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                      <span className="text-xs text-neutral-500">Easy Returns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs text-neutral-500">Best Price</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <span className="text-xs text-neutral-500">Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; 2024 Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
