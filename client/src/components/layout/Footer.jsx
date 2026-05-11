import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#EFE9DF] pt-24 pb-12 text-[#1F1F1F]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div>
            <h3 className="text-2xl font-serif font-black mb-8 flex items-center gap-2">
              <span className="text-[#C5A059]">✦</span> Aakriti
            </h3>
            <p className="text-xs leading-relaxed text-[#1F1F1F]/60 max-w-xs">
              Handcrafted with love & tradition. Every piece tells a story of India's rich artistic heritage passed down through generations.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Shop</h4>
            <ul className="space-y-4 text-xs text-[#1F1F1F]/60">
              <li><Link to="/products" className="hover:text-[#C5A059] transition-colors">All Products</Link></li>
              <li><Link to="/products" className="hover:text-[#C5A059] transition-colors">Bangles</Link></li>
              <li><Link to="/products" className="hover:text-[#C5A059] transition-colors">Necklaces</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Account</h4>
            <ul className="space-y-4 text-xs text-[#1F1F1F]/60">
              <li><Link to="/login" className="hover:text-[#C5A059] transition-colors">Login / Signup</Link></li>
              <li><Link to="/profile" className="hover:text-[#C5A059] transition-colors">Order History</Link></li>
              <li><Link to="/cart" className="hover:text-[#C5A059] transition-colors">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] mb-8">Contact</h4>
            <ul className="space-y-4 text-xs text-[#1F1F1F]/60">
              <li>contact@aakriti.com</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1F1F1F]/10 pt-10 text-center text-[10px] tracking-widest text-[#1F1F1F]/40">
          © 2024 AAKRITI JEWELRY. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
