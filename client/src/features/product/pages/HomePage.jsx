import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronRight, Search, User, ShoppingCart, Tag, Clock, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const categories = [
    { name: 'Studs', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80', tag: 'Handmade' },
    { name: 'Jhumka', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80', tag: 'Bestseller' },
    { name: 'Hoops', image: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=500&q=80' },
    { name: 'Traditional', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=500&q=80', tag: 'Authentic' },
    { name: 'Modern', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=500&q=80' },
  ];

  const featuredProducts = [
    { _id: '1', name: 'Kundan Gold Bracelet', price: 1299, image: '/assets/p1.png', category: 'Bangles', discount: '10% OFF' },
    { _id: '2', name: 'Pearl Jhumka Earrings', price: 899, image: '/assets/p2.png', category: 'Earrings', discount: '20% OFF' },
    { _id: '3', name: 'Antique Maang Tikka', price: 749, image: '/assets/p3.png', category: 'Hair Accessories' },
    { _id: '4', name: 'Emerald Choker Necklace', price: 2499, image: '/assets/p4.png', category: 'Necklace', discount: '15% OFF' },
    { _id: '5', name: 'Glass Bangle Set', price: 599, image: '/assets/p5.png', category: 'Bangles' },
    { _id: '6', name: 'Chandbali Pearl Earring', price: 1099, image: '/assets/p6.png', category: 'Earrings' },
    { _id: '7', name: 'Embroidered Gift Pouch', price: 299, image: '/assets/p7.png', category: 'Return Gifts' },
    { _id: '8', name: 'Traditional Gold Payal', price: 1499, image: '/assets/p8.png', category: 'Anklets' },
  ];

  const reviews = [
    { name: "Sarah Sharma", text: "The kundan necklace I ordered was absolutely stunning! The craftsmanship is impeccable and it arrived beautifully packaged. Will definitely order again!" },
    { name: "Priya Patel", text: "I bought a pair of jhumkas for my wedding. They look so premium and feel very comfortable. The attention to detail is just mind-blowing." },
    { name: "Anjali Desai", text: "Aakriti has the best collection of traditional jewelry. The quality is top-notch and the delivery was super fast. Highly recommended!" },
    { name: "Neha Singh", text: "Every piece I have bought from here feels like a work of art. The authentic designs remind me of my grandmother's heritage jewelry." },
    { name: "Meera Reddy", text: "Their customer service is just as beautiful as their jewelry. The maang tikka I bought is now my favorite accessory." }
  ];

  return (
    <div className="bg-[#F9F6F0] overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero.png"
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#ffca61]/40" />
        </div>

        <div className="container mx-auto px-4 md:px-12 relative z-10 text-white flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">ARTISAN JEWELRY</span>
            <h1 className="text-4xl md:text-7xl font-serif font-black mb-6 leading-[1.1]">
              Handcrafted with <br />
              <span className="italic font-normal">Love & Tradition</span>
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-10 max-w-2xl leading-relaxed font-light">
              Discover exquisite handmade jewelry celebrating India's rich artistic heritage. Each piece tells a story of timeless craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/products" className="bg-[#C5A059] hover:bg-[#ab8345] text-white px-8 py-3.5 rounded-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/20 text-sm">
                Shop Now <ChevronRight size={16} />
              </Link>
              <button className="px-8 py-3.5 border border-white text-white font-bold hover:bg-white/10 transition-all rounded-sm uppercase tracking-widest text-[10px]">
                Explore Categories
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Shop by Style */}
      <section className="py-32 relative bg-[#FDFBF7] overflow-hidden">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        {/* Top Gold Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-5xl md:text-6xl font-serif text-[#C5A059] italic mb-2 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shop by Style
            </h2>
          </div>

          {/* Zig-Zag / Uneven Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 max-w-7xl mx-auto pb-16 lg:pb-24 pt-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className={`relative group bg-white rounded-3xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(197,160,89,0.2)] border border-transparent hover:border-[#C5A059]/40 ${
                  i % 2 !== 0 ? 'lg:translate-y-16' : ''
                }`}
              >
                {/* Floating animation for the content */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full flex flex-col items-center"
                >
                  {cat.tag && (
                    <div className="absolute -top-3 -right-2 bg-[#1F1F1F] text-[#F9F6F0] text-[8px] md:text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full z-10 shadow-lg border border-white/10">
                      {cat.tag}
                    </div>
                  )}
                  
                  <div className="w-full aspect-square md:w-44 md:h-44 rounded-2xl overflow-hidden mb-4 md:mb-5 bg-[#FDFBF7] relative shadow-inner">
                    <img 
                      src={cat.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={cat.name}
                    />
                  </div>
                  
                  <h3 className="font-serif text-sm md:text-xl font-bold text-[#1F1F1F] text-center tracking-wide group-hover:text-[#C5A059] transition-colors">{cat.name}</h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Gold Divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-[#F9F6F0]">
        <div className="container mx-auto px-4">
          <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block text-center">CURATED SELECTION</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-20 text-center text-[#1F1F1F]">Featured Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-20">
            <Link to="/products" className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-[10px] hover:underline flex items-center justify-center gap-2">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Offers & Deals Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9F6F0] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F9F6F0] rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 flex justify-center items-center gap-2">
              <Sparkles size={14} /> EXCLUSIVE OFFERS <Sparkles size={14} />
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#1F1F1F]">Deals of the Week</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Flash Sale Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 relative rounded-sm overflow-hidden bg-[#1F1F1F] text-white flex flex-col md:flex-row shadow-lg"
            >
              <div className="absolute inset-0 z-0 opacity-40">
                <img src="/assets/p1.png" alt="Flash Sale" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent md:to-black/30" />
              </div>
              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                <div className="inline-block bg-[#C5A059] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm w-max mb-6 flex items-center gap-2">
                  <Clock size={12} className="animate-pulse" /> Flash Sale
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">Up to 40% Off <br /><span className="text-[#C5A059] italic font-normal">Kundan Collection</span></h3>
                <p className="text-gray-300 text-sm mb-8 line-clamp-2">Discover the majestic beauty of Kundan jewelry. Premium craftsmanship now at unbeatable prices for a limited time.</p>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 text-center">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-sm border border-white/20"><span className="block font-bold text-lg">12</span><span className="text-[9px] uppercase tracking-wider text-gray-300">Hours</span></div>
                    <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-sm border border-white/20"><span className="block font-bold text-lg">45</span><span className="text-[9px] uppercase tracking-wider text-gray-300">Mins</span></div>
                    <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-sm border border-white/20"><span className="block font-bold text-lg">30</span><span className="text-[9px] uppercase tracking-wider text-gray-300">Secs</span></div>
                  </div>
                </div>
                <button className="mt-8 bg-white text-[#1F1F1F] font-bold px-8 py-3 rounded-sm hover:bg-[#F9F6F0] transition-colors w-max text-sm uppercase tracking-widest shadow-xl">
                  Shop Flash Sale
                </button>
              </div>
            </motion.div>

            {/* Right Column for Limited Offers & Coupons */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Limited Time Offer */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#F9F6F0] rounded-sm p-8 flex-1 border border-[#EFE9DF] shadow-sm relative overflow-hidden group"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#C5A059]/10 rounded-full transition-transform group-hover:scale-150" />
                <h4 className="font-serif text-2xl font-bold text-[#1F1F1F] mb-2 relative z-10">Buy 2 Get 1 <span className="text-[#C5A059] italic">Free</span></h4>
                <p className="text-[#1F1F1F]/60 text-sm mb-6 relative z-10">On all selected Earrings & Bangles</p>
                <img src="/assets/p2.png" alt="Earrings Offer" className="w-24 h-24 object-cover rounded-full mx-auto mb-6 border-4 border-white shadow-md relative z-10" />
                <button className="w-full border border-[#1F1F1F] text-[#1F1F1F] font-bold py-3 rounded-sm hover:bg-[#1F1F1F] hover:text-white transition-colors text-sm uppercase tracking-widest relative z-10">
                  Explore Offer
                </button>
              </motion.div>

              {/* Coupon Banner */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white border-2 border-dashed border-[#C5A059] rounded-sm p-6 flex flex-col items-center justify-center text-center shadow-sm relative"
              >
                <div className="absolute -top-3 bg-white px-4 text-[#C5A059]">
                  <Tag size={20} />
                </div>
                <p className="text-[#1F1F1F] text-sm font-medium mb-3 mt-2">Extra 15% off on your first purchase</p>
                <div className="bg-[#F9F6F0] px-6 py-3 rounded-sm w-full font-mono font-bold text-lg text-[#C5A059] tracking-widest border border-[#EFE9DF] flex justify-between items-center cursor-pointer hover:bg-[#EFE9DF] transition-colors" onClick={() => { navigator.clipboard.writeText('WELCOME15'); alert('Coupon code WELCOME15 copied!'); }}>
                  <span>WELCOME15</span>
                  <span className="text-[10px] text-[#1F1F1F]/50 uppercase tracking-normal">Copy</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">OUR STORY</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-12 text-[#1F1F1F]">The Art of Handcrafted Beauty</h2>
          <div className="space-y-8 text-[#1F1F1F]/70 text-base md:text-lg leading-relaxed">
            <p>
              At Aakriti, every piece of jewelry is a labor of love. Our artisans, carrying forward generations of skill, transform raw materials into wearable art. From the intricate kundan work of Rajasthan to the delicate filigree of Odisha, each creation honors India's diverse craft traditions.
            </p>
            <p>
              We believe in preserving these ancient techniques while creating pieces that complement modern lifestyles. When you wear Aakriti, you carry a piece of India's soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
            <div>
              <h4 className="text-4xl font-serif font-black text-[#C5A059] mb-2">500+</h4>
              <p className="text-[#1F1F1F]/40 font-bold uppercase text-[10px] tracking-[0.2em]">Unique Designs</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-[#C5A059] mb-2">50+</h4>
              <p className="text-[#1F1F1F]/40 font-bold uppercase text-[10px] tracking-[0.2em]">Master Artisans</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-[#C5A059] mb-2">10K+</h4>
              <p className="text-[#1F1F1F]/40 font-bold uppercase text-[10px] tracking-[0.2em]">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-32 bg-[#121212] text-white overflow-hidden relative">
        <div className="container mx-auto px-4 mb-20 relative z-20">
          <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block text-center">LOVE FROM CUSTOMERS</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-center text-white">What They Say</h2>
        </div>

        <div className="relative w-full flex whitespace-nowrap overflow-hidden">
          {/* Fading edges for marquee */}
          <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 md:gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            {[...reviews, ...reviews].map((review, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-sm border border-white/10 w-[320px] md:w-[400px] flex-shrink-0 whitespace-normal hover:bg-white/10 transition-colors">
                <div className="flex text-[#C5A059] mb-6 gap-1">
                  {[...Array(5)].map((_, star) => <Star key={star} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic leading-[1.8] mb-8 text-sm">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-10 h-10 bg-[#C5A059]/20 rounded-full border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">{review.name}</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
