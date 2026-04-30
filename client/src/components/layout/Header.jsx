import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User, ShoppingCart, Menu, X, Settings, LogOut, ChevronDown } from 'lucide-react';
import { logout, reset } from '../../features/auth/authSlice';
import { useState } from 'react';
import NotificationBell from '../notification/NotificationBell';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-12 py-2">
        <div className="flex items-center justify-between border-b border-[#F9F6F0] pb-2">
          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#1F1F1F]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-serif font-black text-[#1F1F1F] flex items-center gap-2">
            <span className="text-[#C5A059]">✦</span> Aakriti
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10 text-[#1F1F1F] font-medium text-xs tracking-widest uppercase">
            <Link to="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-[#C5A059] transition-colors">Categories</Link>
            <Link to="/products" className="hover:text-[#C5A059] transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-[#C5A059] transition-colors">About</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-[#1F1F1F]">
            <NotificationBell />
            
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-[#C5A059] transition-colors py-2">
                  <User size={20} />
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full w-48 bg-white shadow-2xl border border-[#EFE9DF] rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[100]">
                  <div className="px-4 py-3 border-b border-[#F9F6F0] mb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] mb-0.5">Welcome</p>
                    <p className="text-xs font-serif font-black text-[#1F1F1F] truncate">{userInfo.name}</p>
                  </div>
                  
                  <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]/70 hover:bg-[#F9F6F0] hover:text-[#C5A059] transition-all">
                    <Settings size={14} />
                    <span>Settings</span>
                  </Link>
                  
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all border-t border-[#F9F6F0] mt-2 pt-3"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-[#C5A059] transition-colors">
                <User size={20} />
              </Link>
            )}
            <Link to="/cart" className="relative hover:text-[#C5A059] transition-colors">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C5A059] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-brand-charcoal z-[100] p-8 flex flex-col space-y-8 text-white">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-serif font-black">Aakriti</span>
            <X size={30} onClick={() => setIsMenuOpen(false)} />
          </div>
          <nav className="flex flex-col space-y-6 text-xl font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            
            <div className="pt-8 border-t border-white/10 space-y-6">
               {userInfo ? (
                 <>
                   <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#C5A059] flex items-center justify-center text-white font-serif font-black">
                        {userInfo.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#C5A059]">Logged in as</p>
                        <p className="text-base font-serif font-black">{userInfo.name}</p>
                      </div>
                   </div>
                   <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-sm font-bold uppercase tracking-[0.2em]">
                     <Settings size={18} />
                     <span>Account Settings</span>
                   </Link>
                   <button 
                     onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                     }}
                     className="flex items-center space-x-4 text-sm font-bold uppercase tracking-[0.2em] text-red-400"
                   >
                     <LogOut size={18} />
                     <span>Sign Out</span>
                   </button>
                 </>
               ) : (
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-4 text-sm font-bold uppercase tracking-[0.2em]">
                    <User size={18} />
                    <span>Login / Register</span>
                 </Link>
               )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
