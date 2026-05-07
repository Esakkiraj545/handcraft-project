import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../authSlice';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, Eye, EyeOff, Info } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const redirectMsg = new URLSearchParams(location.search).get('message');

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (isSuccess) {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        navigate('/');
      }
    }
    return () => dispatch(reset());
  }, [userInfo, isSuccess, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#F9F6F0] px-4 py-20">
      <div className="max-w-5xl w-full bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#EFE9DF]">
        
        {/* Left Side: Visual Image */}
        <div className="hidden md:block w-1/2 relative min-h-[600px]">
          <img 
            src="/assets/hero.png" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Jewelry background"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
            <Sparkles className="text-[#C5A059] mb-6" size={40} />
            <h2 className="text-5xl font-serif font-black mb-4 leading-tight">Welcome Back to Aakriti</h2>
            <p className="text-gray-200 text-lg font-light leading-relaxed">
              Step back into our sanctuary of handcrafted elegance and timeless artistry.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-12 text-center md:text-left">
            <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">SIGN IN</span>
            <h1 className="text-4xl font-serif font-black text-[#1F1F1F] mb-4">Account Login</h1>
            <p className="text-[#1F1F1F]/50 text-sm">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {isSuccess && (
              <div className="bg-green-50 text-green-600 p-4 rounded-sm text-xs font-bold border-l-4 border-green-600 animate-fade-in">
                {message}
              </div>
            )}
            {redirectMsg === 'login_required' && (
              <div className="bg-[#C5A059] text-white p-4 rounded-sm text-xs font-bold flex items-center space-x-3 animate-pulse">
                <Info size={18} />
                <span>Please login to complete your purchase and enjoy member benefits!</span>
              </div>
            )}

            {isError && (
              <div className="bg-red-50 text-red-500 p-4 rounded-sm text-xs font-bold border-l-4 border-red-500 animate-fade-in">
                {message}
              </div>
            )}

            <div className="bg-[#C5A059]/5 border border-[#C5A059]/20 p-4 rounded-sm mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] mb-2">Why Login?</h3>
              <ul className="text-[11px] text-[#1F1F1F]/70 space-y-1 list-disc pl-4 font-medium">
                <li>Faster checkout with saved addresses</li>
                <li>Exclusive access to member-only artisan drops</li>
                <li>Track your orders in real-time</li>
                <li>Personalized styling recommendations</li>
              </ul>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#F9F6F0] border-none rounded-sm py-4 pl-12 pr-4 focus:ring-1 focus:ring-[#C5A059] outline-none text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60">Password</label>
                <Link to="/forgot-password" size={10} className="text-[10px] font-bold text-[#C5A059] hover:underline uppercase tracking-widest">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F9F6F0] border-none rounded-sm py-4 pl-12 pr-12 focus:ring-1 focus:ring-[#C5A059] outline-none text-sm transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1F1F1F]/40 hover:text-[#C5A059] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1F1F1F] hover:bg-[#333] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-[#1F1F1F]/50">
              New to Aakriti? {' '}
              <Link to="/register" className="text-[#C5A059] font-black hover:underline uppercase tracking-widest text-xs ml-2">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
