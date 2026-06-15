import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save selected payment method
    localStorage.setItem("paymentMethod", paymentMethod);

    // Move to final order summary page
    navigate("/placeorder");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-[#100C24] transition-colors duration-200 border-b border-slate-200 dark:border-[#281F4D] transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 shadow-sm rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-200">Store</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {/* Step 1: Cart */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-sm text-white flex items-center justify-center text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="mt-2 text-xs font-medium text-slate-900 dark:text-white transition-colors duration-200">Cart</span>
              </div>

              <div className="flex-1 h-0.5 bg-indigo-600 dark:bg-indigo-500 shadow-sm mx-2" />

              {/* Step 2: Shipping */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-sm text-white flex items-center justify-center text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="mt-2 text-xs font-medium text-slate-900 dark:text-white transition-colors duration-200">Shipping</span>
              </div>

              <div className="flex-1 h-0.5 bg-indigo-600 dark:bg-indigo-500 shadow-sm mx-2" />

              {/* Step 3: Payment (Current) */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-sm text-white flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="mt-2 text-xs font-medium text-slate-900 dark:text-white transition-colors duration-200">Payment</span>
              </div>

              <div className="flex-1 h-0.5 bg-slate-200 dark:bg-[#382B66] transition-colors duration-200 mx-2" />

              {/* Step 4: Place Order */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#382B66] transition-colors duration-200 text-slate-500 dark:text-slate-400 transition-colors duration-200 flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <span className="mt-2 text-xs font-medium text-slate-400 dark:text-slate-500 transition-colors duration-200">Place Order</span>
              </div>
            </div>
          </div>

          {/* Payment Form Card */}
          <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-200 mb-2">Select Payment Method</h2>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200 mb-6">Choose how you would like to pay for your order</p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                {/* Cash on Delivery Option */}
                <label
                  className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === "Cash on Delivery"
                      ? "border-neutral-900 bg-slate-50 dark:bg-[#070514] transition-colors duration-200"
                      : "border-slate-200 dark:border-[#281F4D] transition-colors duration-200 hover:border-slate-300 dark:border-slate-600 transition-colors duration-200 hover:bg-slate-50 dark:bg-[#070514] transition-colors duration-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                    paymentMethod === "Cash on Delivery" ? "border-neutral-900" : "border-slate-300 dark:border-slate-600 transition-colors duration-200"
                  }`}>
                    {paymentMethod === "Cash on Delivery" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-sm" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white transition-colors duration-200">Cash on Delivery</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">Pay when your order arrives</p>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "Cash on Delivery" && (
                    <svg className="w-5 h-5 text-slate-900 dark:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>

                {/* UPI Option */}
                <label
                  className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === "UPI"
                      ? "border-neutral-900 bg-slate-50 dark:bg-[#070514] transition-colors duration-200"
                      : "border-slate-200 dark:border-[#281F4D] transition-colors duration-200 hover:border-slate-300 dark:border-slate-600 transition-colors duration-200 hover:bg-slate-50 dark:bg-[#070514] transition-colors duration-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                    paymentMethod === "UPI" ? "border-neutral-900" : "border-slate-300 dark:border-slate-600 transition-colors duration-200"
                  }`}>
                    {paymentMethod === "UPI" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-sm" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white transition-colors duration-200">UPI</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">Pay using any UPI app</p>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "UPI" && (
                    <svg className="w-5 h-5 text-slate-900 dark:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>

                {/* Card Option */}
                <label
                  className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === "Card"
                      ? "border-neutral-900 bg-slate-50 dark:bg-[#070514] transition-colors duration-200"
                      : "border-slate-200 dark:border-[#281F4D] transition-colors duration-200 hover:border-slate-300 dark:border-slate-600 transition-colors duration-200 hover:bg-slate-50 dark:bg-[#070514] transition-colors duration-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                    paymentMethod === "Card" ? "border-neutral-900" : "border-slate-300 dark:border-slate-600 transition-colors duration-200"
                  }`}>
                    {paymentMethod === "Card" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow-sm" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white transition-colors duration-200">Credit / Debit Card</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">Visa, Mastercard, Amex accepted</p>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "Card" && (
                    <svg className="w-5 h-5 text-slate-900 dark:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full mt-8 bg-indigo-600 dark:bg-indigo-500 shadow-sm text-white py-4 px-6 rounded-xl font-medium text-base hover:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              >
                Continue to Review Order
              </button>
            </form>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-[#382B66] transition-colors duration-200">
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Buyer Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#100C24] transition-colors duration-200 border-t border-slate-200 dark:border-[#281F4D] transition-colors duration-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
            <p>&copy; 2024 Store. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/" className="hover:text-slate-900 dark:text-white transition-colors duration-200 transition-colors">Privacy Policy</a>
              <a href="/" className="hover:text-slate-900 dark:text-white transition-colors duration-200 transition-colors">Terms of Service</a>
              <a href="/" className="hover:text-slate-900 dark:text-white transition-colors duration-200 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Payment;
