import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../cartSlice';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=shipping&message=login_required');
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(0);

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      <div className="container mx-auto px-4 pt-12 max-w-7xl">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12 border-b border-[#EFE9DF] pb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1F1F1F]">Your Shopping Bag</h1>
          <span className="text-[#C5A059] font-sans font-bold text-lg md:text-xl uppercase tracking-widest">({totalItems} items)</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-[#EFE9DF] shadow-sm max-w-3xl mx-auto animate-fade-in">
            <div className="bg-[#FDFBF7] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#EFE9DF]">
              <ShoppingBag size={40} className="text-[#C5A059]" />
            </div>
            <h2 className="text-3xl font-serif font-black mb-4 text-[#1F1F1F]">Your bag is empty</h2>
            <p className="text-[#1F1F1F]/60 mb-10 text-lg">Looks like you haven't added any artisan pieces yet.</p>
            <Link to="/products" className="bg-[#1F1F1F] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-lg inline-block">
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.product} className="bg-white p-6 rounded-3xl border border-[#EFE9DF] shadow-sm flex flex-col sm:row items-center sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 hover:shadow-md transition-all duration-300">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#FDFBF7] border border-[#EFE9DF]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/products/${item.product}`} className="text-xl font-serif font-bold text-[#1F1F1F] hover:text-[#C5A059] transition-colors block mb-1">
                      {item.name}
                    </Link>
                    <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-4">Unit Price: ₹{item.price}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start space-x-6">
                      <div className="flex items-center space-x-4 bg-[#FDFBF7] rounded-full p-1 border border-[#EFE9DF]">
                        <button 
                          onClick={() => dispatch(addToCart({ ...item, qty: Math.max(1, item.qty - 1) }))}
                          className="w-8 h-8 flex items-center justify-center text-[#1F1F1F] hover:bg-white hover:text-[#C5A059] rounded-full transition-all shadow-sm"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-sans font-bold w-4 text-center text-[#1F1F1F]">{item.qty}</span>
                        <button 
                          onClick={() => dispatch(addToCart({ ...item, qty: Math.min(item.countInStock, item.qty + 1) }))}
                          className="w-8 h-8 flex items-center justify-center text-[#1F1F1F] hover:bg-white hover:text-[#C5A059] rounded-full transition-all shadow-sm"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => dispatch(removeFromCart(item.product))}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right sm:pl-4 border-t sm:border-t-0 sm:border-l border-[#EFE9DF] pt-4 sm:pt-0">
                    <p className="text-2xl font-sans font-bold text-[#1F1F1F]">₹{(item.qty * item.price).toFixed(0)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl sticky top-28 border border-[#EFE9DF] shadow-sm">
                <h3 className="text-xl font-serif font-black text-[#1F1F1F] mb-8 uppercase tracking-widest">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#1F1F1F]/60 font-bold text-sm uppercase tracking-wider">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-sans">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#1F1F1F]/60 font-bold text-sm uppercase tracking-wider">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-[#EFE9DF] pt-6 mt-6 flex justify-between items-center">
                    <span className="text-lg font-serif font-black text-[#1F1F1F]">Total Amount</span>
                    <span className="text-3xl font-sans font-bold text-[#1F1F1F]">₹{subtotal}</span>
                  </div>
                </div>

                <button 
                  onClick={checkoutHandler}
                  className="w-full py-5 bg-[#1F1F1F] text-white rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-3 mb-6 hover:bg-[#C5A059] transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
                
                <div className="flex items-center justify-center space-x-2 text-[#1F1F1F]/40 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={16} />
                  <span>Secure Artisan Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
