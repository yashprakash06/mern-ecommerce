import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

function UserEditPage() {
  const { id } = useParams(); // user ID from URL
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user details when page loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(
          `/api/users/${id}`
        );

        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch user"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Submit updated data
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/api/users/${id}`,
        {
          name,
          email,
          isAdmin,
        }
      );

      navigate("/admin/userlist");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update user"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300 transition-colors duration-200 font-medium">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-200 mb-2">Error Loading User</h2>
          <p className="text-slate-600 dark:text-slate-300 transition-colors duration-200 mb-6">{error}</p>
          <button
            onClick={() => navigate("/admin/userlist")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070514] transition-colors duration-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/userlist")}
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 transition-colors duration-200 hover:text-slate-900 dark:text-white transition-colors duration-200 font-medium mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Users
        </button>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Edit User</h1>
                <p className="text-indigo-200 mt-1">Update user information and permissions</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="p-6 sm:p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-900 dark:text-white transition-colors duration-200 placeholder-gray-400"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-900 dark:text-white transition-colors duration-200 placeholder-gray-400"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Admin Checkbox */}
            <div className="bg-slate-50 dark:bg-[#070514] transition-colors duration-200 rounded-xl p-4 border border-slate-100 dark:border-[#382B66] transition-colors duration-200">
              <label className="flex items-center gap-4 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-7 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white dark:bg-[#100C24] transition-colors duration-200 rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></div>
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-slate-900 dark:text-white transition-colors duration-200">Administrator Access</span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200 mt-0.5">
                    Grant full administrative privileges to this user
                  </span>
                </div>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Admin
                  </span>
                )}
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-[#382B66] transition-colors duration-200">
              <button
                type="button"
                onClick={() => navigate("/admin/userlist")}
                className="flex-1 sm:flex-none px-6 py-3 border border-slate-200 dark:border-[#281F4D] transition-colors duration-200 text-slate-700 dark:text-slate-300 transition-colors duration-200 font-semibold rounded-xl hover:bg-slate-50 dark:bg-[#070514] transition-colors duration-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update User
              </button>
            </div>
          </form>
        </div>

        {/* User ID Info */}
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 transition-colors duration-200 mt-6">
          User ID: <span className="font-mono text-slate-500 dark:text-slate-400 transition-colors duration-200">{id}</span>
        </p>
      </div>
    </div>
  );
}

export default UserEditPage;
