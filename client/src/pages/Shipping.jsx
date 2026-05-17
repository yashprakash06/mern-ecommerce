import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save shipping information in localStorage
    const shippingAddress = {
      address,
      city,
      postalCode,
      country,
    };

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(shippingAddress)
    );

    alert("Shipping information saved 🚚");

    // Next step will be payment
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-neutral-900 text-lg">Store</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-neutral-600">Secure Checkout</span>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Progress Indicator */}
        <nav className="mb-8 sm:mb-12">
          <ol className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Cart - Completed */}
            <li className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-neutral-900 text-white rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium text-neutral-900 hidden sm:inline">Cart</span>
            </li>
            
            <div className="w-8 sm:w-16 h-0.5 bg-neutral-900" />
            
            {/* Shipping - Active */}
            <li className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-neutral-900 text-white rounded-full text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-neutral-900 hidden sm:inline">Shipping</span>
            </li>
            
            <div className="w-8 sm:w-16 h-0.5 bg-neutral-300" />
            
            {/* Payment - Upcoming */}
            <li className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-neutral-200 text-neutral-500 rounded-full text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-neutral-400 hidden sm:inline">Payment</span>
            </li>
            
            <div className="w-8 sm:w-16 h-0.5 bg-neutral-300" />
            
            {/* Place Order - Upcoming */}
            <li className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-neutral-200 text-neutral-500 rounded-full text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm font-medium text-neutral-400 hidden sm:inline">Place Order</span>
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-neutral-100">
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 text-balance">Shipping Information</h1>
            <p className="mt-2 text-neutral-600">Enter your delivery address below</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Address Field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                  Street Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="123 Main Street, Apt 4B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white"
                />
              </div>

              {/* City and Postal Code Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    placeholder="10001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white"
                  />
                </div>
              </div>

              {/* Country Field */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-2">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  placeholder="United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent focus:bg-white"
                />
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Free Standard Shipping</p>
                  <p className="text-sm text-neutral-500 mt-0.5">Estimated delivery: 5-7 business days</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-8 w-full bg-neutral-900 text-white py-4 px-6 rounded-xl font-medium text-base transition-all duration-200 hover:bg-neutral-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            >
              Continue to Payment
            </button>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>Your information is encrypted and secure</span>
            </div>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span>Easy Returns</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              2024 Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Shipping;
