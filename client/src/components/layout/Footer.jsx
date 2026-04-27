const Footer = () => {
  return (
    <footer className="bg-dark-950 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6 text-gradient from-primary-400 to-secondary-400">HANDCRAFT</h3>
            <p className="text-dark-400 leading-relaxed">
              Curating the finest handcrafted jewelry and accessories for the modern aesthetic. Each piece tells a story of tradition and artistry.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-4 text-dark-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Collections</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-dark-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-dark-400 mb-4">Subscribe to get special offers and first look at new collections.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-dark-900 border border-dark-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button className="btn-primary w-full py-3">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center text-dark-500 text-sm">
          <p>© 2026 HANDCRAFT. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
