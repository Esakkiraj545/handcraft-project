import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowRight, Star, ShoppingCart, ShieldCheck } from 'lucide-react';
import { addToCart } from '../../cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1
    }));
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative group bg-white p-4 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(197,160,89,0.15)] transition-all duration-500 border border-transparent hover:border-[#C5A059]/30 flex flex-col">
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#1F1F1F] text-[#F9F6F0] text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white/10">
          {product.discount}
        </span>
      )}

      {/* Image Container */}
      <Link to={`/products/${product._id}`} className="block w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#FDFBF7] relative shadow-inner">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="px-2 text-center flex flex-col flex-grow">
        <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.25em] mb-2 block">{product.category}</span>
        
        <Link to={`/products/${product._id}`} className="block flex-grow">
          <h4 className="font-serif text-lg md:text-xl font-bold mb-2 text-[#1F1F1F] group-hover:text-[#C5A059] transition-colors line-clamp-1 leading-tight tracking-wide">
            {product.name}
          </h4>
        </Link>
        
        <div className="flex items-center justify-center space-x-1 text-[#C5A059] mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <Star key={star} size={10} fill={star <= 4 ? "currentColor" : "none"} strokeWidth={1} />
          ))}
          <span className="text-[10px] font-bold text-[#1F1F1F]/40 ml-1">4.9 (12)</span>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-[#FDFBF7]">
          <span className="text-xl md:text-2xl font-sans font-bold text-[#1F1F1F]">₹{product.price}</span>
          <Link 
            to={`/products/${product._id}`}
            className="w-8 h-8 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#1F1F1F] hover:bg-[#C5A059] hover:text-white transition-all shadow-sm"
          >
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <button 
          onClick={handleAddToCart}
          className={`w-full py-3 mt-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-lg ${
            added ? 'bg-[#C5A059] text-white' : 'bg-[#1F1F1F] text-white hover:bg-[#C5A059]'
          }`}
        >
          {added ? <ShieldCheck size={14} /> : <ShoppingCart size={14} />}
          {added ? 'Added to Bag' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
