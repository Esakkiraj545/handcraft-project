import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, reset } from '../authSlice';
import { Mail, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState('');

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && !sent) {
      setSent(true);
      // In a real app, we wouldn't have the link here, but for dev we capture it from the response if possible
      // Actually, my controller returns it in `resetUrl`.
    }
    return () => dispatch(reset());
  }, [isSuccess, dispatch, sent]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(result)) {
      setDevLink(result.payload.resetUrl);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F6F0] px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-sm shadow-2xl p-8 md:p-12 border border-[#EFE9DF]">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FDFBF7] border border-[#EFE9DF] rounded-full flex items-center justify-center mx-auto mb-6">
            <KeyRound className="text-[#C5A059]" size={32} />
          </div>
          <h1 className="text-3xl font-serif font-black text-[#1F1F1F] mb-4">Forgot Password</h1>
          <p className="text-[#1F1F1F]/50 text-sm">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {isSuccess ? (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-green-50 text-green-600 p-6 rounded-sm text-sm font-bold border-l-4 border-green-600">
              {message}
            </div>
            
            {devLink && (
              <div className="bg-[#1F1F1F] p-6 rounded-sm space-y-4">
                <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest">Developer Simulation Link:</p>
                <a 
                  href={devLink.replace('http://localhost:5173', window.location.origin)} 
                  className="text-white text-xs break-all hover:underline block font-mono"
                >
                  {devLink}
                </a>
                <p className="text-gray-400 text-[10px] italic">Click the link above to proceed to Reset Password page (simulating email click).</p>
              </div>
            )}

            <Link 
              to="/login" 
              className="w-full bg-[#1F1F1F] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 transition-all hover:bg-[#333]"
            >
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            {isError && (
              <div className="bg-red-50 text-red-500 p-4 rounded-sm text-xs font-bold border-l-4 border-red-500 animate-fade-in">
                {message}
              </div>
            )}

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

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#C5A059] hover:bg-[#ab8345] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <Link to="/login" className="text-[10px] font-bold text-[#1F1F1F]/40 hover:text-[#C5A059] uppercase tracking-widest transition-colors">
                Remember your password? Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
