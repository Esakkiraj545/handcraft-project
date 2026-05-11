import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, ShoppingBag, ArrowLeft, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { createOrder, createRazorpayOrder, verifyPayment, resetOrderState } from '../orderSlice';
import { clearCartItems } from '../../cart/cartSlice';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { order, isLoading, isSuccess, isError, message } = useSelector((state) => state.order);

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(0));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  useEffect(() => {
    if (isSuccess && !order) {
      // Handle success without order (e.g. after verification)
    }
  }, [isSuccess, order]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // 1. Create order in our DB
    const orderData = {
      orderItems: cartItems,
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.pincode,
        country: 'India', // Default for now
      },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    const res = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(res)) {
      const createdOrder = res.payload;

      // 2. Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // 3. Create Razorpay order on backend
      const rzpRes = await dispatch(createRazorpayOrder(totalPrice));
      if (createRazorpayOrder.fulfilled.match(rzpRes)) {
        const rzpOrder = rzpRes.payload;

        // 4. Open Razorpay Checkout
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key_id',
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          name: 'Aakriti Handcrafts',
          description: 'Artisan Jewelry Purchase',
          order_id: rzpOrder.id,
          handler: async (response) => {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: createdOrder._id,
            };

            const verifyRes = await dispatch(verifyPayment(paymentData));
            if (verifyPayment.fulfilled.match(verifyRes)) {
              dispatch(clearCartItems());
              navigate(`/order/${createdOrder._id}/success`);
            }
          },
          prefill: {
            name: userInfo.name,
            email: userInfo.email,
            contact: shippingAddress.phone,
          },
          theme: {
            color: '#1F1F1F',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      <div className="container mx-auto px-4 pt-12 max-w-6xl">
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-16 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center text-sm font-bold shadow-lg">1</div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]">Bag</span>
          </div>
          <div className="flex-1 h-[2px] bg-[#1F1F1F] mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center text-sm font-bold shadow-lg">2</div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]">Shipping</span>
          </div>
          <div className="flex-1 h-[2px] bg-[#1F1F1F] mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-[#C5A059]/20">3</div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Order Summary & Address */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] border border-[#EFE9DF] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-black text-[#1F1F1F]">Review Order</h2>
                <span className="bg-[#FDFBF7] px-4 py-2 rounded-full border border-[#EFE9DF] text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                  {cartItems.length} Items
                </span>
              </div>
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex items-center gap-6 pb-6 border-b border-[#FDFBF7] last:border-0">
                    <div className="w-20 h-20 rounded-2xl bg-[#FDFBF7] border border-[#EFE9DF] overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif font-bold text-[#1F1F1F]">{item.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]/40">Qty: {item.qty} × ₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans font-bold text-[#1F1F1F]">₹{item.qty * item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] border border-[#EFE9DF] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8">
                  <button onClick={() => navigate('/shipping')} className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] hover:underline">Change</button>
               </div>
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                    <MapPin size={16} />
                  </div>
                  <h2 className="text-xl font-serif font-black text-[#1F1F1F]">Shipping To</h2>
               </div>
               <div className="pl-11">
                  <h3 className="font-bold text-[#1F1F1F] mb-1">{shippingAddress.fullName}</h3>
                  <p className="text-[#1F1F1F]/60 text-sm leading-relaxed mb-2">
                    {shippingAddress.address}, {shippingAddress.city}<br />
                    {shippingAddress.state}, {shippingAddress.pincode}
                  </p>
                  <p className="text-[#1F1F1F]/60 text-sm font-medium flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#1F1F1F]/30 tracking-widest">Phone:</span>
                    {shippingAddress.phone}
                  </p>
               </div>
            </section>
          </div>

          {/* Right Column: Payment Details */}
          <div className="lg:col-span-1">
            <div className="bg-[#1F1F1F] p-8 rounded-[3rem] text-white sticky top-28 shadow-2xl">
              <h3 className="text-xl font-serif font-black mb-8 uppercase tracking-widest text-center">Checkout Summary</h3>
              
              <div className="space-y-4 mb-8 text-[#FDFBF7]/60">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">₹{itemsPrice}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span>GST (15%)</span>
                  <span className="text-white">₹{taxPrice}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-white">{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}</span>
                </div>
                <div className="border-t border-[#FDFBF7]/10 pt-6 mt-6 flex justify-between items-center">
                  <span className="text-sm font-serif font-black text-white uppercase tracking-widest">Grand Total</span>
                  <span className="text-4xl font-sans font-bold text-[#C5A059]">₹{totalPrice}</span>
                </div>
              </div>

              <div className="mb-10 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-center mb-4 text-[#FDFBF7]/40">Select Payment Method</p>
                <button 
                  onClick={() => setPaymentMethod('Razorpay')}
                  className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${paymentMethod === 'Razorpay' ? 'border-[#C5A059] bg-[#C5A059]/10' : 'border-[#FDFBF7]/10 hover:border-[#FDFBF7]/30'}`}
                >
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <CreditCard size={20} className={paymentMethod === 'Razorpay' ? 'text-[#C5A059]' : 'text-white'} />
                     </div>
                     <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-widest">Razorpay</p>
                        <p className="text-[8px] text-[#FDFBF7]/40 uppercase tracking-wider">UPI, Cards, Netbanking</p>
                     </div>
                  </div>
                  {paymentMethod === 'Razorpay' && <CheckCircle2 size={18} className="text-[#C5A059]" />}
                </button>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full py-6 bg-[#C5A059] text-[#1F1F1F] rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl disabled:opacity-50 group"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <span>Complete Purchase</span>
                    <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="mt-8 pt-8 border-t border-[#FDFBF7]/5">
                 <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FDFBF7]/20 text-center leading-relaxed">
                   By completing this purchase, you agree to our<br />
                   <span className="text-[#C5A059]/60">Terms of Service</span> and <span className="text-[#C5A059]/60">Privacy Policy</span>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
