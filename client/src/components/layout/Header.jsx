import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Search, Menu, X } from 'lucide-react';
import { logout, reset } from '../../features/auth/authSlice';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">
            HANDCRAFT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="font-medium hover:text-primary-600 transition-colors">
              Shop
            </Link>
            <Link to="/categories" className="font-medium hover:text-primary-600 transition-colors">
              Categories
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-dark-100 border-none rounded-full py-2 px-4 pr-10 focus:ring-2 focus:ring-primary-500 w-48 transition-all"
              />
              <Search className="absolute right-3 top-2.5 text-dark-400" size={18} />
            </div>
            
            <Link to="/cart" className="relative p-2 hover:bg-primary-50 rounded-full transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-secondary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 p-2 hover:bg-primary-50 rounded-full transition-colors">
                  <User size={22} />
                  <span className="font-medium text-sm">{userInfo.name.split(' ')[0]}</span>
                </Link>
                {userInfo.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-sm font-semibold text-primary-600 hover:underline">
                    Admin
                  </Link>
                )}
                <button onClick={onLogout} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors">
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-6">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/products" className="font-medium">Shop</Link>
            <Link to="/categories" className="font-medium">Categories</Link>
            <Link to="/cart" className="font-medium">Cart</Link>
            {userInfo ? (
              <>
                <Link to="/profile" className="font-medium">Profile</Link>
                {userInfo.role === 'admin' && (
                  <Link to="/admin/dashboard" className="font-medium text-primary-600">Admin Panel</Link>
                )}
                <button onClick={onLogout} className="text-left font-medium text-red-500">Logout</button>
              </>
            ) : (
              <Link to="/login" className="font-medium">Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
