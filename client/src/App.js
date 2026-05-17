import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/admin/UserListPage";
import AdminRoute from "./components/AdminRoute";
import UserEditPage from "./pages/admin/UserEditPage";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import OrderListPage from "./pages/admin/OrderListPage";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
        />
        <Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
        />
        <Route
        path="/placeorder"
        element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        }
        />
        <Route
        path="/myorders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
        />
        <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        }
        />
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="userlist" element={<UserListPage />} />
          <Route path="user/:id/edit" element={<UserEditPage />} />
          <Route path="productlist" element={<ProductListPage />} />
          <Route path="product/:id/edit" element={<ProductEditPage />} />
          <Route path="orderlist" element={<OrderListPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;