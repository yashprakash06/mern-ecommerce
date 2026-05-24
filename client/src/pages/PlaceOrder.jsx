import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function PlaceOrder() {
  const { cartItems, updateCartQty } = useCart();
  const navigate = useNavigate();

  const userInfo = JSON.parse(
  localStorage.getItem("userInfo")
);

  // Load saved checkout information
  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  const paymentMethod = localStorage.getItem("paymentMethod");

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Handle actual order creation
  // const handlePlaceOrder = async () => {
  //   try {
  //     const res = await API.post("/api/orders", {
  //       orderItems: cartItems,
  //       shippingAddress,
  //       paymentMethod,
  //       totalPrice,
  //     });

  //     console.log("Order created:", res.data);

  //     alert("Order placed successfully 🎉");

  //     // Clear cart in localStorage
  //     localStorage.removeItem("cartItems");

  //     // Clear cart in React state
  //     cartItems.forEach((item) => {
  //       updateCartQty(item._id, 0);
  //     });

  //     // Redirect to homepage
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error.response?.data?.message);
  //     alert(error.response?.data?.message || "Failed to place order");
  //   }
  // };

  const handlePayment = async () => {
  try {
    // STEP 1: Create MongoDB Order
    const { data: createdOrder } = await API.post(
      "/api/orders",
      {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
      }
    );

    console.log("MongoDB Order:", createdOrder);

    // STEP 2: Create Razorpay Order
    const { data: razorpayOrder } = await API.post(
      "/api/payment/orders",
      {
        amount: totalPrice,
      }
    );

    console.log("Razorpay Order:", razorpayOrder);

    const options = {
      key: "rzp_test_SslmBJvjg9sqvg",

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      name: "Yash Store",

      description: "Order Payment",

      image:
        "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

      order_id: razorpayOrder.id,

      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },

      handler: async function (response) {
        try {
          console.log(
            "PAYMENT SUCCESS CALLBACK FIRED"
          );

          console.log("Response:", response);

          // STEP 3: Verify Payment
          const verifyResponse = await API.post(
            "/api/payment/verify",
            {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              // MongoDB Order ID
              orderId: createdOrder.order._id,
            }
          );

          console.log(
            "Verification response:",
            verifyResponse.data
          );

          alert("Payment successful!");

          // Clear cart
          localStorage.removeItem("cartItems");

          cartItems.forEach((item) => {
            updateCartQty(item._id, 0);
          });

          // Redirect
          navigate("/myorders");
        } catch (error) {
          console.error(
            "Payment verification failed:",
            error
          );

          alert("Payment verification failed");
        }
      },

      prefill: {
        name:
          userInfo?.user?.name || "Test User",

        email:
          userInfo?.user?.email ||
          "test@example.com",

        contact: "9999999999",
      },

      notes: {
        address: "Yash Store Corporate Office",
      },

      theme: {
        color: "#111827",
      },

      modal: {
        ondismiss: function () {
          console.log(
            "Razorpay popup closed"
          );
        },
      },
    };

    console.log(
      "Opening Razorpay with options:",
      options
    );

    const razorpay = new window.Razorpay(
      options
    );

    razorpay.on("payment.failed", function (
      response
    ) {
      console.error(
        "PAYMENT FAILED EVENT:",
        response
      );

      alert(
        response.error.description ||
          "Payment failed"
      );
    });

    razorpay.open();
  } catch (error) {
    console.error("Payment Error:", error);

    alert("Payment failed");
  }
};

  // Checkout steps for progress indicator
  const steps = [
    { name: "Cart", completed: true },
    { name: "Shipping", completed: true },
    { name: "Payment", completed: true },
    { name: "Place Order", completed: false, current: true },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">S</span>
              </div>
              <span className="text-xl font-semibold text-neutral-900">Store</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <nav className="mb-8">
          <ol className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((step, index) => (
              <li key={step.name} className="flex items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${step.completed && !step.current
                        ? "bg-neutral-900 text-white"
                        : step.current
                        ? "bg-neutral-900 text-white ring-2 ring-neutral-900 ring-offset-2"
                        : "bg-neutral-200 text-neutral-500"
                      }
                    `}
                  >
                    {step.completed && !step.current ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={`
                      hidden sm:block text-sm font-medium
                      ${step.current ? "text-neutral-900" : step.completed ? "text-neutral-700" : "text-neutral-400"}
                    `}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-8 sm:w-16 h-0.5 mx-2 sm:mx-4
                      ${step.completed ? "bg-neutral-900" : "bg-neutral-200"}
                    `}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-8 text-center">
          Review Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">Shipping Address</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed pl-13">
                {shippingAddress?.address}, {shippingAddress?.city},{" "}
                {shippingAddress?.postalCode}, {shippingAddress?.country}
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">Payment Method</h2>
              </div>
              <p className="text-neutral-600 pl-13">{paymentMethod}</p>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Order Items ({cartItems.length})
                </h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-neutral-500">Your cart is empty.</p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      {/* Product Image Placeholder */}
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={
                            item.image?.startsWith("/uploads")
                              ? `http://localhost:5000${item.image}`
                              : item.image
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-neutral-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-neutral-500 mt-1">
                          Qty: {item.qty}
                        </p>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-neutral-900">
                          ₹{item.qty * item.price}
                        </p>
                        <p className="text-sm text-neutral-500">
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 pb-4 border-b border-neutral-200">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <span className="text-lg font-semibold text-neutral-900">Total</span>
                <span className="text-2xl font-bold text-neutral-900">₹{totalPrice}</span>
              </div>

              <button
                //onClick={handlePlaceOrder}
                onClick={handlePayment}
                disabled={cartItems.length === 0}
                className={`
                  w-full mt-6 py-4 px-6 rounded-xl font-semibold text-base
                  transition-all duration-200
                  ${cartItems.length === 0
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] shadow-lg hover:shadow-xl"
                  }
                `}
              >
                Place Order
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>

              {/* Order Confirmation Note */}
              <p className="mt-4 text-xs text-neutral-500 text-center leading-relaxed">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>© 2024 Store. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/" className="hover:text-neutral-900 transition-colors">Privacy Policy</a>
              <a href="/" className="hover:text-neutral-900 transition-colors">Terms of Service</a>
              <a href="/" className="hover:text-neutral-900 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PlaceOrder;
