import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../features/product/pages/HomePage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';

// Placeholder components for routes yet to be implemented
const DashboardPlaceholder = () => <div className="p-20 text-center font-bold text-3xl">Admin Dashboard (Coming Soon)</div>;
const CartPlaceholder = () => <div className="p-20 text-center font-bold text-3xl">Shopping Cart (Coming Soon)</div>;
const ProfilePlaceholder = () => <div className="p-20 text-center font-bold text-3xl">User Profile (Coming Soon)</div>;
const ProductsPlaceholder = () => <div className="p-20 text-center font-bold text-3xl">All Products (Coming Soon)</div>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="products" element={<ProductsPlaceholder />} />
      
      {/* Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<ProfilePlaceholder />} />
        <Route path="cart" element={<CartPlaceholder />} />
        {/* <Route path="shipping" element={<ShippingScreen />} /> */}
        {/* <Route path="payment" element={<PaymentScreen />} /> */}
        {/* <Route path="placeorder" element={<PlaceOrderScreen />} /> */}
        {/* <Route path="order/:id" element={<OrderScreen />} /> */}
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="admin/dashboard" element={<DashboardPlaceholder />} />
        {/* <Route path="admin/productlist" element={<ProductListScreen />} /> */}
        {/* <Route path="admin/orderlist" element={<OrderListScreen />} /> */}
        {/* <Route path="admin/userlist" element={<UserListScreen />} /> */}
      </Route>
    </Route>
  )
);
