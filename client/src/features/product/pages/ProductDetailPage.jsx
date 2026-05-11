import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../productSlice';
import { addToCart } from '../../cart/cartSlice';
import { ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, RotateCcw, Loader2, Minus, Plus } from 'lucide-react';
import api from '../../../lib/axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { product, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty
    }));
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment });
      alert('Review submitted and pending approval!');
      setComment('');
      setRating(5);
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] bg-[#FDFBF7] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={48} />
        <p className="mt-4 text-[#1F1F1F] font-serif italic tracking-widest text-sm">Curating piece...</p>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="text-center py-32 bg-[#FDFBF7] min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-serif font-black text-[#1F1F1F] mb-4">Piece not found</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-white bg-[#1F1F1F] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-colors shadow-lg">
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      <div className="container mx-auto px-4 pt-12 max-w-7xl">
        <button 
          onClick={() => navigate('/products')} 
          className="flex items-center space-x-2 text-[#1F1F1F]/60 hover:text-[#C5A059] transition-colors mb-10 group text-sm uppercase tracking-widest font-bold"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group border border-[#EFE9DF]">
              <img 
                src={product?.image} 
                alt={product?.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#EFE9DF] cursor-pointer hover:border-[#C5A059] transition-all">
                  <img src={product?.image} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center pt-8 lg:pt-0">
            <div className="mb-10">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.4em]">
                  {product?.category}
                </span>
                <div className="w-4 h-[1px] bg-[#C5A059]"></div>
                <div className="flex items-center text-[#C5A059]">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1.5 text-xs font-bold text-[#1F1F1F]/60">{product?.rating || 0} ({product?.numReviews || 0} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black mb-6 text-[#1F1F1F] leading-tight">
                {product?.name}
              </h1>
              
              <p className="text-3xl lg:text-4xl font-sans font-bold text-[#1F1F1F] mb-8">
                ₹{product?.price}
              </p>
              
              <p className="text-[#1F1F1F]/70 text-base leading-relaxed max-w-xl">
                {product?.description} Each piece is meticulously handcrafted using sustainable materials and ethically sourced elements to bring timeless tradition and modern elegance to your everyday style.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#EFE9DF] shadow-sm mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <span className="font-bold text-[#1F1F1F] uppercase tracking-widest text-xs">Quantity</span>
                <div className="flex items-center space-x-4 bg-[#FDFBF7] rounded-full p-1 border border-[#EFE9DF]">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-[#1F1F1F] hover:bg-white hover:text-[#C5A059] rounded-full transition-all shadow-sm"><Minus size={16} /></button>
                  <span className="w-8 text-center font-sans font-bold text-lg text-[#1F1F1F]">{qty}</span>
                  <button onClick={() => setQty(Math.min(product?.countInStock || 10, qty + 1))} className="w-10 h-10 flex items-center justify-center text-[#1F1F1F] hover:bg-white hover:text-[#C5A059] rounded-full transition-all shadow-sm"><Plus size={16} /></button>
                </div>
              </div>

              <button 
                onClick={addToCartHandler}
                disabled={product?.countInStock === 0}
                className={`w-full py-5 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${
                  product?.countInStock === 0 
                  ? 'bg-[#EFE9DF] text-[#1F1F1F]/40 cursor-not-allowed' 
                  : added 
                    ? 'bg-[#C5A059] text-white shadow-xl' 
                    : 'bg-[#1F1F1F] text-white hover:bg-[#C5A059] shadow-lg hover:shadow-xl'
                }`}
              >
                {added ? <ShieldCheck size={20} /> : <ShoppingCart size={20} />}
                <span>{product?.countInStock === 0 ? 'Out of Stock' : added ? 'Added to Bag' : 'Add to Shopping Bag'}</span>
              </button>
            </div>

            {/* Mobile Sticky Add to Bag */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-[#EFE9DF] z-[40] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex items-center gap-4">
               <div className="flex-1">
                  <button 
                    onClick={addToCartHandler}
                    disabled={product?.countInStock === 0}
                    className={`w-full py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${
                      product?.countInStock === 0 
                      ? 'bg-[#EFE9DF] text-[#1F1F1F]/40' 
                      : added 
                        ? 'bg-[#C5A059] text-white' 
                        : 'bg-[#1F1F1F] text-white'
                    }`}
                  >
                    {added ? <ShieldCheck size={16} /> : <ShoppingCart size={16} />}
                    <span>{product?.countInStock === 0 ? 'Out of Stock' : added ? 'Added' : 'Add to Bag'}</span>
                  </button>
               </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#EFE9DF]">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#EFE9DF] flex items-center justify-center text-[#C5A059]">
                  <Truck size={20} />
                </div>
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#EFE9DF] flex items-center justify-center text-[#C5A059]">
                  <RotateCcw size={20} />
                </div>
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#EFE9DF] flex items-center justify-center text-[#C5A059]">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider">Authenticity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
            <div>
              <h2 className="text-3xl font-serif font-black text-[#1F1F1F] mb-2">Customer Feedback</h2>
              <p className="text-[#1F1F1F]/60 text-sm font-medium">Voices of our community</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center px-6 py-4 bg-white border border-[#EFE9DF] rounded-2xl shadow-sm">
                <p className="text-2xl font-black text-[#1F1F1F]">{product?.rating || 0}</p>
                <div className="flex text-[#C5A059] mb-1">
                   {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.round(product?.rating || 0) ? 'currentColor' : 'none'} />)}
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-[#1F1F1F]/40">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Review Form */}
            <div className="lg:col-span-1">
              {userInfo ? (
                <div className="bg-white p-8 rounded-3xl border border-[#EFE9DF] shadow-sm sticky top-24">
                  <h3 className="text-lg font-serif font-black text-[#1F1F1F] mb-6">Leave a Review</h3>
                  <form onSubmit={submitReviewHandler} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#1F1F1F]/40 ml-1">Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button key={s} type="button" onClick={() => setRating(s)} className={`p-2 rounded-lg transition-all ${rating >= s ? 'text-[#C5A059] bg-[#FDFBF7]' : 'text-[#1F1F1F]/20'}`}>
                            <Star size={18} fill={rating >= s ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#1F1F1F]/40 ml-1">Your Experience</label>
                      <textarea 
                        required 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about the craftsmanship..." 
                        className="w-full bg-[#FDFBF7] border border-[#EFE9DF] rounded-xl p-4 text-sm focus:ring-1 focus:ring-[#C5A059] outline-none min-h-[120px] resize-none" 
                      />
                    </div>
                    <button 
                      disabled={reviewLoading}
                      className="w-full py-4 bg-[#1F1F1F] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
                    >
                      {reviewLoading && <Loader2 size={14} className="animate-spin" />}
                      <span>Submit Review</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-[#EFE9DF] border-dashed text-center">
                  <p className="text-sm font-medium text-[#1F1F1F]/60 mb-4">Please sign in to share your experience</p>
                  <button onClick={() => navigate('/login')} className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] hover:underline">Sign In</button>
                </div>
              )}
            </div>

            {/* Review List */}
            <div className="lg:col-span-2 space-y-6">
              {product?.reviews?.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-[#EFE9DF] border-dashed">
                   <p className="text-[#1F1F1F]/40 font-serif italic">No reviews yet. Be the first to share your thoughts.</p>
                </div>
              ) : (
                product?.reviews?.map((rev) => (
                  <div key={rev._id} className="bg-white p-8 rounded-3xl border border-[#EFE9DF] shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-[#1F1F1F] text-sm">{rev.name}</h4>
                        <p className="text-[10px] text-[#1F1F1F]/40 font-medium">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex text-[#C5A059]">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rev.rating ? 'currentColor' : 'none'} />)}
                      </div>
                    </div>
                    <p className="text-[#1F1F1F]/70 text-sm leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
