import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../authSlice';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

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
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass p-8 rounded-3xl shadow-2xl animate-slide-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-dark-500">Join our community of craft lovers</p>
        </div>

        {isError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-dark-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-dark-400" size={18} />
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="John Doe"
                className="w-full bg-dark-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
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

          <div className="space-y-1.5">
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

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-dark-700 ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-dark-400" size={18} />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-dark-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 mt-4 flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Sign Up</span>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-dark-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
