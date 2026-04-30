import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../authSlice';
import { Mail, Lock, User, ArrowRight, Loader2, Star, Phone, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, phone, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    
    if (isSuccess && !userInfo) {
      setTimeout(() => {
        navigate('/login');
        dispatch(reset());
      }, 2000);
    }
  }, [userInfo, isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      dispatch(register({ name, email, password, phone }));
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#F9F6F0] px-4 py-20">
      <div className="max-w-5xl w-full bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse border border-[#EFE9DF]">
        
        {/* Right Side: Visual Image */}
        <div className="hidden md:block w-1/2 relative min-h-[700px]">
          <img 
            src="/assets/p4.png" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Jewelry background"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
            <Star className="text-[#C5A059] mb-6" size={40} fill="currentColor" />
            <h2 className="text-5xl font-serif font-black mb-4 leading-tight">Join the Inner Circle</h2>
            <p className="text-gray-200 text-lg font-light leading-relaxed">
              Create an account to access limited artisan drops, member-only collections, and personalized styling.
            </p>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-12 text-center md:text-left">
            <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">CREATE ACCOUNT</span>
            <h1 className="text-4xl font-serif font-black text-[#1F1F1F] mb-4">Start Your Journey</h1>
            <p className="text-[#1F1F1F]/50 text-sm">Experience the soul of Indian craftsmanship.</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {isError && (
              <div className="bg-red-50 text-red-500 p-4 rounded-sm text-xs font-bold border-l-4 border-red-500 animate-fade-in">
                {message}
              </div>
            )}

            {isSuccess && (
              <div className="bg-green-50 text-green-600 p-4 rounded-sm text-xs font-bold border-l-4 border-green-600 animate-fade-in">
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                  <input 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="John Doe"
                    className="w-full bg-[#F9F6F0] border-none rounded-sm py-4 pl-12 pr-4 focus:ring-1 focus:ring-[#C5A059] outline-none text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F9F6F0] border-none rounded-sm py-4 pl-12 pr-4 focus:ring-1 focus:ring-[#C5A059] outline-none text-sm transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#F9F6F0] border-none rounded-sm py-4 pl-12 pr-4 focus:ring-1 focus:ring-[#C5A059] outline-none text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={password}
                    onChange={onChange}
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

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    placeholder="••••••••"
                    className="w-full bg-[#F9F6F0] border-none rounded-sm py-4 pl-12 pr-12 focus:ring-1 focus:ring-[#C5A059] outline-none text-sm transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1F1F1F]/40 hover:text-[#C5A059] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#C5A059] hover:bg-[#ab8345] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-95 disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-[#1F1F1F]/50">
              Already have an account? {' '}
              <Link to="/login" className="text-[#1F1F1F] font-black hover:underline uppercase tracking-widest text-xs ml-2">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
