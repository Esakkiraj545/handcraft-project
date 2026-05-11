import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword, reset } from '../authSlice';
import { Lock, ArrowRight, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(resetPassword({ token, password }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F6F0] px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-sm shadow-2xl p-8 md:p-12 border border-[#EFE9DF]">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FDFBF7] border border-[#EFE9DF] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-[#C5A059]" size={32} />
          </div>
          <h1 className="text-3xl font-serif font-black text-[#1F1F1F] mb-4">Set New Password</h1>
          <p className="text-[#1F1F1F]/50 text-sm">Please choose a strong password that you haven't used before.</p>
        </div>

        {isSuccess && userInfo ? (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-green-50 text-green-600 p-6 rounded-sm text-sm font-bold border-l-4 border-green-600">
              {message} Redirecting to your sanctuary...
            </div>
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-[#C5A059]" size={32} />
            </div>
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            {isError && (
              <div className="bg-red-50 text-red-500 p-4 rounded-sm text-xs font-bold border-l-4 border-red-500 animate-fade-in">
                {message}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">New Password</label>
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

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60 ml-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={18} />
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F9F6F0] border-none rounded-sm py-4 pl-12 pr-4 focus:ring-1 focus:ring-[#C5A059] outline-none text-sm transition-all"
                  required
                />
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
                  <span>Reset & Login</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
