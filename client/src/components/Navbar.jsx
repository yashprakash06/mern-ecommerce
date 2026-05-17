import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const currentUser = user?.user || user;

  // Handles logout and redirects to login page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Home */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-neutral-600"
        >
          Store
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Public links */}
          <Link
            to="/"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:text-sm"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Show My Orders only when logged in */}
          {currentUser && (
            <Link
              to="/myorders"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:text-sm"
            >
              <span className="hidden sm:inline">My Orders</span>
              <span className="sm:hidden">Orders</span>
            </Link>
          )}

          {/* Admin Links */}
          {currentUser?.isAdmin && (
            <div className="hidden items-center border-l border-neutral-200 pl-2 sm:flex">
              <Link
                to="/admin/userlist"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:text-sm"
              >
                Users
              </Link>
              <Link
                to="/admin/productlist"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:text-sm"
              >
                Products
              </Link>
              <Link
                to="/admin/orderlist"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:text-sm"
              >
                Orders
              </Link>
            </div>
          )}

          {/* Auth-based links */}
          <div className="flex items-center gap-2 border-l border-neutral-200 pl-2 sm:pl-4">
            {currentUser ? (
              <>
                <span className="hidden text-xs font-medium text-neutral-500 sm:inline sm:text-sm">
                  Welcome,{" "}
                  <span className="text-neutral-900">{currentUser.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-neutral-800 active:scale-95 sm:px-4 sm:text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-neutral-800 active:scale-95 sm:px-4 sm:text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Admin Links */}
      {currentUser?.isAdmin && (
        <div className="flex items-center justify-center gap-4 border-t border-neutral-100 bg-neutral-50 py-2 sm:hidden">
          <Link
            to="/admin/userlist"
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            Users
          </Link>
          <Link
            to="/admin/productlist"
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            Products
          </Link>
          <Link
            to="/admin/orderlist"
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            Orders
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
