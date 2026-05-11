import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, Home, Navigation, Save, ArrowRight, Loader2 } from 'lucide-react';
import { saveUserAddress, getUserAddress, resetAddressState } from '../addressSlice';
import { saveShippingAddress } from '../../cart/cartSlice';

const AddressPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { address, isLoading, isSuccess, isError, message } = useSelector((state) => state.address);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    } else {
      dispatch(getUserAddress());
    }
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (address) {
      setFormData({
        fullName: address.fullName || '',
        phone: address.phone || '',
        address: address.address || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || '',
      });
    }
  }, [address]);

  useEffect(() => {
    if (isSuccess) {
      // After saving to DB, also update cart slice (local state) and proceed
      dispatch(saveShippingAddress(formData));
      console.log('Address saved successfully');
      dispatch(resetAddressState());
      navigate('/payment');
    }
    if (isError) {
      console.error(message);
      dispatch(resetAddressState());
    }
  }, [isSuccess, isError, message, navigate, dispatch, formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(saveUserAddress(formData));
  };

  // If cart is empty, redirect to products
  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      <div className="container mx-auto px-4 pt-12 max-w-4xl">
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center text-sm font-bold shadow-lg">1</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]">Bag</span>
            </div>
            <div className="flex-1 h-[2px] bg-[#1F1F1F] mx-4 mb-6"></div>
            <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-[#C5A059]/20">2</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]">Shipping</span>
            </div>
            <div className="flex-1 h-[2px] bg-[#EFE9DF] mx-4 mb-6"></div>
            <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#EFE9DF] text-[#1F1F1F]/30 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]/30">Payment</span>
            </div>
        </div>

        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1F1F1F] mb-4">Delivery Details</h1>
          <p className="text-[#C5A059] font-sans font-bold text-sm uppercase tracking-widest">Where should we send your artisan treasures?</p>
        </div>

        <div className="bg-white rounded-[3rem] border border-[#EFE9DF] shadow-xl overflow-hidden animate-slide-up">
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Full Name */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 ml-1">
                  <User size={14} className="text-[#C5A059]" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-[#FDFBF7] border border-[#EFE9DF] rounded-2xl px-6 py-4 outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-[#1F1F1F] font-medium placeholder:text-[#1F1F1F]/20"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 ml-1">
                  <Phone size={14} className="text-[#C5A059]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-[#FDFBF7] border border-[#EFE9DF] rounded-2xl px-6 py-4 outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-[#1F1F1F] font-medium placeholder:text-[#1F1F1F]/20"
                />
              </div>

              {/* Address (Full width) */}
              <div className="md:col-span-2 space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 ml-1">
                  <Home size={14} className="text-[#C5A059]" />
                  Detailed Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="House No, Street Name, Area..."
                  className="w-full bg-[#FDFBF7] border border-[#EFE9DF] rounded-3xl px-6 py-4 outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-[#1F1F1F] font-medium placeholder:text-[#1F1F1F]/20 resize-none"
                ></textarea>
              </div>

              {/* City */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 ml-1">
                  <Navigation size={14} className="text-[#C5A059]" />
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City name"
                  className="w-full bg-[#FDFBF7] border border-[#EFE9DF] rounded-2xl px-6 py-4 outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-[#1F1F1F] font-medium placeholder:text-[#1F1F1F]/20"
                />
              </div>

              {/* State */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 ml-1">
                   <MapPin size={14} className="text-[#C5A059]" />
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State name"
                  className="w-full bg-[#FDFBF7] border border-[#EFE9DF] rounded-2xl px-6 py-4 outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-[#1F1F1F] font-medium placeholder:text-[#1F1F1F]/20"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 ml-1">
                  <MapPin size={14} className="text-[#C5A059]" />
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  className="w-full bg-[#FDFBF7] border border-[#EFE9DF] rounded-2xl px-6 py-4 outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-[#1F1F1F] font-medium placeholder:text-[#1F1F1F]/20"
                />
              </div>

            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-[#EFE9DF]">
               <div className="flex items-center gap-4 text-[#1F1F1F]/40">
                  <div className="w-12 h-12 rounded-full border border-[#EFE9DF] flex items-center justify-center">
                    <Save size={20} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest max-w-[150px]">
                    This address will be saved for your future orders
                  </p>
               </div>

               <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto bg-[#1F1F1F] text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Save & Continue</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-center gap-2">
                 <div className="font-serif italic text-xl font-bold">100% Secure</div>
                 <div className="text-[8px] font-bold uppercase tracking-widest">Payment Gateway</div>
             </div>
             <div className="flex flex-col items-center gap-2">
                 <div className="font-serif italic text-xl font-bold">Fast Delivery</div>
                 <div className="text-[8px] font-bold uppercase tracking-widest">Pan India Shipping</div>
             </div>
             <div className="flex flex-col items-center gap-2">
                 <div className="font-serif italic text-xl font-bold">Artisan Quality</div>
                 <div className="text-[8px] font-bold uppercase tracking-widest">Handcrafted Items</div>
             </div>
             <div className="flex flex-col items-center gap-2">
                 <div className="font-serif italic text-xl font-bold">Easy Returns</div>
                 <div className="text-[8px] font-bold uppercase tracking-widest">7-Day Return Policy</div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
