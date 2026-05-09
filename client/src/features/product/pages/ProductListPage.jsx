import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../productSlice';
import ProductCard from '../components/ProductCard';
import { Filter, Loader2, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dbCategories, setDbCategories] = useState([]);
  
  // New Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    dispatch(getProducts());
    fetchCategories();
  }, [dispatch]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setDbCategories(['All', ...data.map(c => c.name)]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback
      setDbCategories(['All', 'Studs', 'Jhumka', 'Hoops', 'Traditional', 'Modern', 'Necklace', 'Bangles']);
    }
  };

  const categories = dbCategories;

  const filteredProducts = products.filter(product => {
    const productName = product.name || '';
    const productCategory = product.category || '';
    
    const catMatch = category === 'All' 
                     ? true 
                     : productCategory.toLowerCase() === category.toLowerCase() || 
                       productName.toLowerCase().includes(category.toLowerCase());
                       
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = (product.price || 0) <= maxPrice;
    
    // In our dummy data we don't have ratings, but we can simulate the filter logic here
    // If real rating existed: const matchesRating = product.rating >= minRating;
    const matchesRating = true; 

    return catMatch && matchesSearch && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={48} />
        <p className="mt-4 text-[#1F1F1F] font-serif italic tracking-widest text-sm">Curating collections...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      {/* Page Header */}
      <div className="relative pt-24 pb-16 text-center border-b border-[#EFE9DF] bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">DISCOVER THE BEAUTY</span>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#1F1F1F] mb-6">Artisan Collection</h1>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-[#1F1F1F]/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Explore our thoughtfully curated pieces, designed to bring timeless tradition and modern elegance to your everyday style.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-7xl">
        {/* Navigation & Filters Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-20">
          
          {/* Category Pills */}
          <div 
            className="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 flex items-center space-x-3 md:space-x-4" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  category === cat 
                  ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-lg shadow-black/10 scale-105' 
                  : 'bg-transparent text-[#1F1F1F]/60 border-[#EFE9DF] hover:border-[#C5A059] hover:text-[#1F1F1F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Actions */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="relative group w-full sm:w-72">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1F1F1F]/40 group-focus-within:text-[#C5A059] transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search pieces..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#EFE9DF] rounded-full py-3.5 pl-14 pr-6 text-sm focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] outline-none shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all"
              />
            </div>
            
            {/* Filter Dropdown Container */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 bg-white border px-4 md:px-6 py-3.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-[0_4px_20px_rgb(0,0,0,0.02)] whitespace-nowrap ${
                  isFilterOpen ? 'border-[#C5A059] text-[#C5A059]' : 'border-[#EFE9DF] text-[#1F1F1F] hover:border-[#C5A059]'
                }`}
              >
                <SlidersHorizontal size={14} /> <span className="hidden xs:inline">Filter</span>
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <>
                    {/* Mobile Backdrop */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsFilterOpen(false)}
                      className="fixed inset-0 bg-[#1F1F1F]/40 backdrop-blur-sm z-[45] md:hidden"
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-x-4 top-[20%] md:absolute md:inset-auto md:right-0 md:top-full mt-4 bg-white rounded-[2.5rem] border border-[#EFE9DF] shadow-2xl p-8 z-50 md:w-80"
                    >
                      <div className="flex md:hidden items-center justify-between mb-8">
                         <h3 className="text-xl font-serif font-black text-[#1F1F1F]">Refine Collection</h3>
                         <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-[#F9F6F0] rounded-full text-[#1F1F1F]">
                            <X size={18} />
                         </button>
                      </div>
                    {/* Sort By */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#1F1F1F] mb-3">Sort By</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="radio" name="sort" value="featured" checked={sortBy === 'featured'} onChange={(e) => setSortBy(e.target.value)} className="accent-[#C5A059]" />
                          <span className="text-sm font-medium text-[#1F1F1F]/80 group-hover:text-[#C5A059] transition-colors">Featured</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="radio" name="sort" value="price-low" checked={sortBy === 'price-low'} onChange={(e) => setSortBy(e.target.value)} className="accent-[#C5A059]" />
                          <span className="text-sm font-medium text-[#1F1F1F]/80 group-hover:text-[#C5A059] transition-colors">Price: Low to High</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="radio" name="sort" value="price-high" checked={sortBy === 'price-high'} onChange={(e) => setSortBy(e.target.value)} className="accent-[#C5A059]" />
                          <span className="text-sm font-medium text-[#1F1F1F]/80 group-hover:text-[#C5A059] transition-colors">Price: High to Low</span>
                        </label>
                      </div>
                    </div>

                    {/* Price Slider */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#1F1F1F]">Max Price</h4>
                        <span className="text-sm font-sans font-bold text-[#C5A059]">₹{maxPrice}</span>
                      </div>
                      <input 
                        type="range" 
                        min="100" 
                        max="2000" 
                        step="50"
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-1 bg-[#EFE9DF] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-[#1F1F1F]/40 mt-2 uppercase">
                        <span>₹100</span>
                        <span>₹2000</span>
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#1F1F1F] mb-3">Customer Reviews</h4>
                      <div className="flex items-center gap-2">
                        {[4, 3, 2, 1].map(rating => (
                          <button 
                            key={rating}
                            onClick={() => setMinRating(rating)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                              minRating === rating 
                              ? 'bg-[#1F1F1F] text-white border-[#1F1F1F]' 
                              : 'bg-white text-[#1F1F1F]/60 border-[#EFE9DF] hover:border-[#C5A059]'
                            }`}
                          >
                            {rating}+ <Star size={10} fill="currentColor" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Reset */}
                    <button 
                      onClick={() => {setMaxPrice(2000); setMinRating(0); setSortBy('featured');}}
                      className="w-full py-3 bg-[#FDFBF7] text-[#1F1F1F] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-colors"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto pt-8 pb-24">
            <AnimatePresence>
              {filteredProducts.map((product, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.1 }}
                  key={product._id}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 bg-white rounded-3xl border border-[#EFE9DF] shadow-sm max-w-3xl mx-auto"
          >
            <div className="bg-[#FDFBF7] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#EFE9DF]">
              <Search size={32} className="text-[#C5A059]" />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 text-[#1F1F1F]">No pieces found</h3>
            <p className="text-[#1F1F1F]/60 mb-10 max-w-md mx-auto">We couldn't find any jewelry matching your current filters. Try adjusting the price or category.</p>
            <button 
              onClick={() => {setCategory('All'); setSearchTerm(''); setMaxPrice(2000);}}
              className="bg-[#1F1F1F] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-colors shadow-lg"
            >
              Reset Collection
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
