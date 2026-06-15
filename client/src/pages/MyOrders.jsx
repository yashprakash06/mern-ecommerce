import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/api/orders/myorders");
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 dark:border-[#281F4D] transition-colors duration-200 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-200 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white transition-colors duration-200 tracking-tight">
            My Orders
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-slate-100 dark:border-[#382B66] transition-colors duration-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-[#1A1438] transition-colors duration-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-slate-400 dark:text-slate-500 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white transition-colors duration-200 mb-1">No orders yet</h3>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200">When you place orders, they will appear here.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-slate-100 dark:border-[#382B66] transition-colors duration-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#070514] transition-colors duration-200 border-b border-slate-100 dark:border-[#382B66] transition-colors duration-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#382B66] transition-colors duration-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50 dark:bg-[#070514] transition-colors duration-200 transition-colors duration-150"
                    >
                      <td className="px-6 py-5">
                        <span className="font-mono text-sm text-slate-900 dark:text-white transition-colors duration-200">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white transition-colors duration-200">
                          ₹{order.totalPrice.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {order.isPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {order.isDelivered ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            In Transit
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link
                          to={`/order/${order._id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200 hover:text-slate-900 dark:text-white transition-colors duration-200 transition-colors"
                        >
                          View Details
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-sm border border-slate-100 dark:border-[#382B66] transition-colors duration-200 p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono text-sm font-medium text-slate-900 dark:text-white transition-colors duration-200">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-200">
                      ₹{order.totalPrice.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {order.isPaid ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Pending
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        In Transit
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/order/${order._id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    View Order Details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
