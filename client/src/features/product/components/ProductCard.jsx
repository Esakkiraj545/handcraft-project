import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group glass rounded-3xl overflow-hidden card-hover">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-dark-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-primary-600 hover:text-white transition-all">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center space-x-1 text-secondary-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-dark-700">4.8</span>
          </div>
        </div>
        
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-bold mb-1 hover:text-primary-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-dark-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-dark-900">${product.price}</span>
          <Link 
            to={`/products/${product._id}`}
            className="text-sm font-bold text-primary-600 hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
