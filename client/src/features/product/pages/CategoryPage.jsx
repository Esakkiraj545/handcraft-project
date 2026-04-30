import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../productSlice';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categories = [
    { name: 'Studs', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80', description: 'Everyday elegance' },
    { name: 'Jhumka', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80', description: 'Timeless tradition' },
    { name: 'Hoops', image: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=500&q=80', description: 'Modern statements' },
    { name: 'Traditional', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=500&q=80', description: 'Heritage pieces' },
    { name: 'Modern', image: 'https://images.unsplash.com/photo-1535632787358-4bfb55694f87?auto=format&fit=crop&w=500&q=80', description: 'Contemporary designs' },
    { name: 'Necklace', image: '/assets/p4.png', description: 'Statement pieces' },
    { name: 'Bangles', image: '/assets/p5.png', description: 'Classic wristwear' },
  ];

  const getProductCount = (categoryName) => {
    if (!products || products.length === 0) return 0;
    return products.filter(p => 
      p.category?.toLowerCase() === categoryName.toLowerCase() || 
      p.name.toLowerCase().includes(categoryName.toLowerCase())
    ).length;
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      {/* Page Header */}
      <div className="relative pt-24 pb-16 text-center border-b border-[#EFE9DF] bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">BROWSE BY TYPE</span>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#1F1F1F] mb-6">Collections</h1>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-[#1F1F1F]/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Discover our entire range of handcrafted jewelry organized beautifully by category. Find the exact piece to complete your look.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {categories.map((cat, index) => {
            const count = getProductCount(cat.name);
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/products`} className="group block relative bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(197,160,89,0.15)] transition-all duration-500 border border-transparent hover:border-[#C5A059]/30">
                  <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-[#FDFBF7] relative shadow-inner">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  
                  <div className="flex items-end justify-between px-2">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-[#1F1F1F] group-hover:text-[#C5A059] transition-colors mb-2">
                        {cat.name}
                      </h2>
                      <p className="text-[#1F1F1F]/50 text-sm">{cat.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <span className="inline-block bg-[#FDFBF7] text-[#C5A059] text-xs font-bold px-4 py-2 rounded-full border border-[#EFE9DF] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                        {count > 0 ? `${count} Items` : 'Explore'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Subtle decorative arrow */}
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-lg text-[#C5A059]">
                    <ArrowRight size={20} strokeWidth={2} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
