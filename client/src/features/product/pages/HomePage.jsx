import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  // Dummy products for initial render
  const products = [
    {
      _id: '1',
      name: 'Crystal Quartz Necklace',
      price: 129,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
      category: 'Necklace',
      description: 'Hand-picked crystal quartz on a delicate 14k gold-filled chain.'
    },
    {
      _id: '2',
      name: 'Artisan Silver Ring',
      price: 85,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3f4ad?q=80&w=800&auto=format&fit=crop',
      category: 'Ring',
      description: 'Hand-hammered sterling silver ring with a minimalist aesthetic.'
    },
    {
      _id: '3',
      name: 'Ethereal Pearl Earrings',
      price: 150,
      image: 'https://images.unsplash.com/photo-1535633302704-b042c0522dca?q=80&w=800&auto=format&fit=crop',
      category: 'Earrings',
      description: 'Natural freshwater pearls suspended from elegant hooks.'
    },
    {
      _id: '4',
      name: 'Boho Leather Bracelet',
      price: 45,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
      category: 'Bracelet',
      description: 'Genuine braided leather with magnetic stainless steel clasp.'
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-75"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-slide-up">
            <span className="inline-block px-4 py-2 bg-primary-600/20 backdrop-blur-md border border-primary-400/30 text-primary-400 rounded-full text-sm font-bold mb-6">
              NEW COLLECTION 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
              Elegance in <br />
              <span className="text-gradient from-primary-400 to-secondary-400">Every Detail</span>
            </h1>
            <p className="text-dark-200 text-xl mb-10 leading-relaxed max-w-lg">
              Discover our curated collection of artisan handcrafted jewelry designed for those who appreciate timeless beauty.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <span>Shop Collection</span>
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white text-lg px-8 py-4">
                View Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl flex items-start space-x-6">
            <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl">
              <Zap size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Fast Delivery</h4>
              <p className="text-dark-500">Free shipping on all orders over $150 with express tracking.</p>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl flex items-start space-x-6">
            <div className="p-4 bg-secondary-50 text-secondary-600 rounded-2xl">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Secure Payment</h4>
              <p className="text-dark-500">100% secure payment processing with industry-leading encryption.</p>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl flex items-start space-x-6">
            <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
              <Truck size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Easy Returns</h4>
              <p className="text-dark-500">30-day hassle-free return policy for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black mb-4">Trending Now</h2>
            <p className="text-dark-500 text-lg">Hand-picked favorites from our latest artisan collections.</p>
          </div>
          <Link to="/products" className="hidden md:flex items-center space-x-2 font-bold text-primary-600 hover:translate-x-2 transition-transform">
            <span>View All</span>
            <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-primary-600 py-20 px-12 text-center text-white">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black mb-6 leading-tight">Ready to Find Your <br />Perfect Piece?</h2>
            <p className="text-primary-100 text-lg mb-10">Join over 10,000 craft enthusiasts and get early access to new releases and exclusive offers.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-white/50 outline-none w-full sm:w-80 placeholder:text-primary-100"
              />
              <button className="bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:bg-primary-50 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
