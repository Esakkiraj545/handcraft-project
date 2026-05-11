import { Heart, Sparkles, Gem, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      {/* Hero Section */}
      <div className="relative pt-24 pb-20 text-center border-b border-[#EFE9DF] bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Heritage</span>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#1F1F1F] mb-6">The Aakriti Story</h1>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-[#1F1F1F]/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Born from a passion for preserving ancient artisanship, Aakriti bridges the gap between timeless heritage and modern elegance. Every piece is a testament to the hands that shaped it.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20 max-w-6xl">
        {/* Featured Image & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#C5A059]/10 rounded-[3rem] transform -rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl">
              <img 
                src="/images/necklace_1.png" 
                alt="Aakriti Artisan Jewelry" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="text-[#C5A059] font-bold uppercase tracking-widest text-xs mb-4">Craftsmanship</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#1F1F1F] mb-8 leading-tight">Art in Every Detail.</h2>
            <p className="text-[#1F1F1F]/70 text-lg leading-relaxed mb-6 font-light">
              At Aakriti, we believe that jewelry is more than just an accessory—it is wearable art. Our master artisans spend hours painstakingly molding, carving, and setting each individual piece by hand using techniques passed down through generations.
            </p>
            <p className="text-[#1F1F1F]/70 text-lg leading-relaxed mb-10 font-light">
              We exclusively use ethically sourced materials, ensuring that while you wear something beautiful, you are also supporting a sustainable, fair-trade ecosystem.
            </p>
            
            <Link to="/products" className="inline-flex items-center gap-3 text-[#1F1F1F] font-bold uppercase tracking-widest text-sm hover:text-[#C5A059] transition-colors w-fit group">
              Explore Our Collection 
              <span className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#EFE9DF] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white group-hover:border-transparent transition-all">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-[#EFE9DF] hover:shadow-[0_15px_40px_rgb(197,160,89,0.1)] transition-all duration-500">
            <div className="w-16 h-16 bg-[#FDFBF7] border border-[#EFE9DF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A059]">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-serif font-black text-[#1F1F1F] mb-4">Ethical Sourcing</h3>
            <p className="text-[#1F1F1F]/60 text-sm leading-relaxed">
              Every gemstone and metal used in our pieces is responsibly sourced, ensuring fair wages and environmental sustainability.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-[#EFE9DF] hover:shadow-[0_15px_40px_rgb(197,160,89,0.1)] transition-all duration-500 transform md:-translate-y-6">
            <div className="w-16 h-16 bg-[#FDFBF7] border border-[#EFE9DF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A059]">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-serif font-black text-[#1F1F1F] mb-4">Handcrafted Purity</h3>
            <p className="text-[#1F1F1F]/60 text-sm leading-relaxed">
              We never mass-produce. Each design is meticulously brought to life by human hands, making every single piece uniquely yours.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-[#EFE9DF] hover:shadow-[0_15px_40px_rgb(197,160,89,0.1)] transition-all duration-500">
            <div className="w-16 h-16 bg-[#FDFBF7] border border-[#EFE9DF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A059]">
              <Gem size={24} />
            </div>
            <h3 className="text-xl font-serif font-black text-[#1F1F1F] mb-4">Timeless Design</h3>
            <p className="text-[#1F1F1F]/60 text-sm leading-relaxed">
              Our designs blend the grandeur of ancient traditions with modern minimalism, ensuring they never go out of style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
