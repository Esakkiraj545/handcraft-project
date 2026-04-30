import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccessPage = () => {
  const { id } = useParams();

  useEffect(() => {
    // Launch confetti!
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-3xl w-full bg-white rounded-[4rem] border border-[#EFE9DF] shadow-2xl overflow-hidden animate-scale-in">
        <div className="p-12 md:p-20 text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-10 shadow-inner">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1F1F1F] mb-6">Payment Successful!</h1>
          <p className="text-[#C5A059] font-sans font-bold text-sm uppercase tracking-[0.3em] mb-8">Your artisan pieces are on their way</p>
          
          <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EFE9DF] mb-12 w-full max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]/40 mb-2">Order Confirmation ID</p>
            <p className="text-lg font-mono font-bold text-[#1F1F1F]">#{id?.slice(-8).toUpperCase()}</p>
            <div className="mt-4 pt-4 border-t border-[#EFE9DF] flex items-center justify-center gap-2 text-[#1F1F1F]/60 text-xs font-medium">
               <Heart size={14} className="text-red-400 fill-red-400" />
               Thank you for supporting handcraft artisans
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
            <Link 
              to="/products" 
              className="flex-1 py-5 bg-[#1F1F1F] text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#C5A059] transition-all shadow-lg group"
            >
              <span>Continue Shopping</span>
              <ShoppingBag size={16} className="group-hover:-translate-y-1 transition-transform" />
            </Link>
            
            <Link 
              to="/profile" 
              className="flex-1 py-5 border border-[#EFE9DF] text-[#1F1F1F] rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#FDFBF7] transition-all"
            >
              <span>Track Order</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        
        <div className="bg-[#1F1F1F] py-6 px-12 flex items-center justify-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">Aakriti Premium Handcrafts • Artisan Authenticity</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
