import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../authSlice';
import { Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (userInfo) {
      navigate('/');
    }

    dispatch(reset());
  }, [userInfo, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass p-8 rounded-3xl shadow-2xl animate-slide-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-dark-500">Sign in to continue your journey</p>
        </div>

        {isError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-dark-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-dark-400" size={18} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="name@example.com"
                className="w-full bg-dark-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-dark-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-dark-400" size={18} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-dark-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-dark-600 group-hover:text-dark-900 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Sign In</span>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-dark-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
