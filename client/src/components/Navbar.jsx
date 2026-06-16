import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "./SearchBar";

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const currentUser = user?.user || user;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-[#281F4D] bg-white/80 dark:bg-[#070514]/80 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Store
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-4">
          <SearchBar />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="hidden sm:inline">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {currentUser && (
            <Link
              to="/myorders"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            >
              <span className="hidden sm:inline">My Orders</span>
              <span className="sm:hidden">Orders</span>
            </Link>
          )}

          {currentUser?.isAdmin && (
            <div className="hidden items-center border-l border-slate-200 dark:border-[#382B66] pl-2 sm:flex space-x-1">
              <Link
                to="/admin/userlist"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                Users
              </Link>
              <Link
                to="/admin/productlist"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                Products
              </Link>
              <Link
                to="/admin/orderlist"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              >
                Orders
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-[#382B66] pl-3 sm:pl-4">
            <button
              onClick={toggleTheme}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-sm font-medium text-slate-500 dark:text-slate-400 sm:inline">
                  Welcome, <span className="text-slate-900 dark:text-white">{currentUser.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-slate-900 dark:bg-white px-3 py-2 text-sm font-medium text-white dark:text-slate-900 transition-all hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Admin Links */}
      {currentUser?.isAdmin && (
        <div className="flex items-center justify-center gap-4 border-t border-slate-200 dark:border-[#281F4D] bg-slate-50 dark:bg-[#100C24]/50 py-2 sm:hidden transition-colors">
          <Link to="/admin/userlist" className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Users</Link>
          <Link to="/admin/productlist" className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Products</Link>
          <Link to="/admin/orderlist" className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Orders</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
