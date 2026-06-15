import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const { user } = useAuth();
  const currentUser = user?.user || user;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  const deliverHandler = async () => {
  try {
    await API.put(
      `/api/orders/${order._id}/deliver`,
      {}
    );

    // Refresh order data
    window.location.reload();
  } catch (err) {
    alert(
      err.response?.data?.message ||
        "Failed to mark order as delivered"
    );
  }
};

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 dark:border-[#281F4D] transition-colors duration-200 border-t-gray-900 rounded-full animate-spin" />
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-200 font-medium">Loading order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 border-b border-slate-200 dark:border-[#281F4D] transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200 mb-1">Order Details</p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white transition-colors duration-200 tracking-tight">
                Order #{order._id?.slice(-8).toUpperCase()}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {order.isPaid ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Paid
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Pending Payment
                </span>
              )}
              {order.isDelivered ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Delivered
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  In Transit
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Card */}
            <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-[#382B66] transition-colors duration-200">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-200">Order Items</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-0.5">{order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-[#382B66] transition-colors duration-200">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="p-6 flex gap-4">
                    {item.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={
                            item.image?.startsWith("/uploads")
                              ? `${process.env.REACT_APP_API_URL}${item.image}`
                              : item.image
                          }
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-slate-900 dark:text-white transition-colors duration-200 truncate">{item.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-1">Quantity: {item.qty}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
                          {item.qty} x ₹{item.price.toLocaleString()}
                        </p>
                        <p className="text-base font-semibold text-slate-900 dark:text-white transition-colors duration-200">
                          ₹{(item.qty * item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Shipping Card */}
            <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-200">Shipping</h2>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200 leading-relaxed">
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-200">Payment</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">Method</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white transition-colors duration-200">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">Status</span>
                  {order.isPaid ? (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Paid
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-amber-600">Pending</span>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Card */}
            <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-colors duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-200">Delivery</h2>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">Status</span>
                {order.isDelivered ? (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Delivered
                  </span>
                ) : (
                  <span className="text-sm font-medium text-blue-600">In Transit</span>
                )}
              </div>
              
              {/* Admin-only button */}
              {currentUser?.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    onClick={deliverHandler}
                    className="mt-4 w-full px-4 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                  >
                    Mark as Delivered
                  </button>
                )}
            </div>

            {/* Order Total Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-sm p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Order Total</span>
                <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <p className="text-3xl font-bold tracking-tight">
                ₹{order.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
