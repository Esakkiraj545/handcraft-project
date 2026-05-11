import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../features/product/pages/HomePage';
import ProductListPage from '../features/product/pages/ProductListPage';
import CategoryPage from '../features/product/pages/CategoryPage';
import ProductDetailPage from '../features/product/pages/ProductDetailPage';
import AboutPage from '../pages/AboutPage';
import CartPage from '../features/cart/pages/CartPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import ProfilePage from '../features/auth/pages/ProfilePage';
import AddressPage from '../features/address/pages/AddressPage';
import PaymentPage from '../features/order/pages/PaymentPage';
import OrderSuccessPage from '../features/order/pages/OrderSuccessPage';
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="categories" element={<CategoryPage />} />
      <Route path="category" element={<CategoryPage />} />
      <Route path="products" element={<ProductListPage />} />
      <Route path="products/:id" element={<ProductDetailPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="cart" element={<CartPage />} />
      
      {/* Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="shipping" element={<AddressPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="order/:id/success" element={<OrderSuccessPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);
