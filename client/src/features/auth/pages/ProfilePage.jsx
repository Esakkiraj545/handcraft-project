import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Package, LogOut, Save, Phone, Camera, ArrowLeft, Edit2, X, ChevronRight, Clock, CheckCircle, Truck, ExternalLink, ShoppingBag } from 'lucide-react';
import { logout } from '../authSlice';
import { getMyOrders } from '../../order/orderSlice';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  
  const { userInfo } = useSelector((state) => state.auth);
  const { orders, isLoading: ordersLoading } = useSelector((state) => state.order);

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'orders'
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [phone, setPhone] = useState(userInfo?.phone || '');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (activeTab === 'orders') {
      dispatch(getMyOrders());
    }
  }, [activeTab, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-48 md:h-64 bg-[#1F1F1F] z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12 md:pt-20">
        <div className="max-w-5xl mx-auto">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <Link to="/" className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group text-[10px] md:text-xs uppercase tracking-widest font-bold self-start md:self-center">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Boutique</span>
            </Link>
            
            <h1 className="text-white text-lg md:text-xl font-serif font-black tracking-widest uppercase text-center">My Boutique Account</h1>
          </div>

          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border border-[#EFE9DF] overflow-hidden">
            <div className="flex flex-col md:flex-row min-h-[600px]">
              
              {/* Profile Sidebar / Mobile Tabs */}
              <div className="md:w-1/3 bg-[#F9F6F0] p-6 md:p-10 flex flex-col items-center border-b md:border-b-0 md:border-r border-[#EFE9DF]">
                
                {/* Profile Avatar Section */}
                <div className="flex flex-row md:flex-col items-center gap-6 md:gap-0 w-full md:w-auto mb-8 md:mb-0">
                  <div className="relative group mb-0 md:mb-8 cursor-pointer shrink-0" onClick={handleImageClick}>
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8e693b] flex items-center justify-center text-white text-2xl md:text-4xl font-serif font-black shadow-2xl relative z-10 overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        userInfo?.name.charAt(0)
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1F1F1F] group-hover:text-[#C5A059] transition-colors z-20 border border-[#EFE9DF]">
                      <Camera size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#C5A059]/20 animate-pulse -m-2 z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>

                  <div className="text-left md:text-center space-y-1 md:space-y-2 md:mb-10 flex-grow">
                    <h2 className="text-xl md:text-2xl font-serif font-black text-[#1F1F1F] truncate max-w-[180px] md:max-w-none">{userInfo?.name}</h2>
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#C5A059]">Artisan Member</p>
                  </div>
                </div>

                {/* Navigation - Responsive Tabs */}
                <nav className="w-full flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center space-x-3 md:space-x-4 whitespace-nowrap px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shrink-0 ${activeTab === 'profile' ? 'bg-[#1F1F1F] text-white shadow-lg' : 'text-[#1F1F1F]/60 hover:bg-white hover:text-[#C5A059]'}`}
                  >
                    <User size={16} />
                    <span>Profile Info</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center space-x-3 md:space-x-4 whitespace-nowrap px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shrink-0 ${activeTab === 'orders' ? 'bg-[#1F1F1F] text-white shadow-lg' : 'text-[#1F1F1F]/60 hover:bg-white hover:text-[#C5A059]'}`}
                  >
                    <Package size={16} />
                    <span>Orders</span>
                  </button>
                  <button 
                    onClick={onLogout}
                    className="flex items-center space-x-3 md:space-x-4 whitespace-nowrap px-5 md:px-6 py-3 md:py-4 text-red-500 hover:bg-red-50 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all md:mt-8 shrink-0"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>

              {/* Profile Details Area */}
              <div className="md:w-2/3 p-6 md:p-16 overflow-y-auto max-h-none md:max-h-[800px]">
                {activeTab === 'profile' ? (
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-start mb-8 md:mb-12">
                      <div>
                        <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-2 md:mb-4 block">Personal Information</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1F1F1F]">Profile</h2>
                      </div>
                      <button 
                        onClick={toggleEdit}
                        className={`flex items-center space-x-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                          isEditing 
                          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                          : 'bg-[#F9F6F0] text-[#1F1F1F] hover:bg-[#EFE9DF]'
                        }`}
                      >
                        {isEditing ? (
                          <><X size={12} /> <span className="hidden xs:inline">Cancel</span></>
                        ) : (
                          <><Edit2 size={12} /> <span className="hidden xs:inline">Edit</span></>
                        )}
                      </button>
                    </div>

                    <form className="space-y-8 md:space-y-10">
                      <div className="space-y-6 md:space-y-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/40 ml-1">Full Name</label>
                          <div className="relative border-b-2 border-[#EFE9DF] py-2">
                            {isEditing ? (
                              <div className="flex items-center">
                                <User className="text-[#C5A059] mr-3" size={18} />
                                <input 
                                  type="text" 
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="w-full bg-transparent outline-none font-medium text-[#1F1F1F] text-sm md:text-base"
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <p className="text-[#1F1F1F] font-medium py-2 pl-8 flex items-center text-sm md:text-base">
                                <User className="text-[#C5A059] absolute left-0" size={18} />
                                {name}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/40 ml-1">Email Address</label>
                            <div className="relative border-b-2 border-[#EFE9DF] py-2">
                              <p className="text-[#1F1F1F]/40 font-medium py-2 pl-8 flex items-center text-sm md:text-base">
                                <Mail className="text-[#C5A059] absolute left-0" size={18} />
                                {email}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/40 ml-1">Phone Number</label>
                            <div className="relative border-b-2 border-[#EFE9DF] py-2">
                              {isEditing ? (
                                <div className="flex items-center">
                                  <Phone className="text-[#C5A059] mr-3" size={18} />
                                  <input 
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-transparent outline-none font-medium text-[#1F1F1F] text-sm md:text-base"
                                  />
                                </div>
                              ) : (
                                <p className="text-[#1F1F1F] font-medium py-2 pl-8 flex items-center text-sm md:text-base">
                                  <Phone className="text-[#C5A059] absolute left-0" size={18} />
                                  {phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="pt-4 md:pt-6 animate-fade-in">
                          <button className="w-full md:w-auto bg-[#1F1F1F] text-white px-10 py-4 md:py-5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-xl flex items-center justify-center space-x-3 group active:scale-95">
                            <Save size={18} className="group-hover:rotate-12 transition-transform" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="mb-8 md:mb-12">
                      <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-2 md:mb-4 block">Order Tracking</span>
                      <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1F1F1F]">Purchases</h2>
                    </div>

                    {ordersLoading ? (
                      <div className="flex flex-col items-center justify-center py-20 opacity-20">
                         <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-[#1F1F1F] border-t-transparent rounded-full animate-spin mb-4"></div>
                         <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Curating...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="bg-[#F9F6F0] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center border-2 border-dashed border-[#EFE9DF]">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 text-[#C5A059]">
                          <ShoppingBag size={24} />
                        </div>
                        <h3 className="text-lg md:text-xl font-serif font-bold text-[#1F1F1F] mb-2">No artisan orders yet</h3>
                        <p className="text-[#1F1F1F]/40 text-[10px] md:text-xs mb-8">Start your collection with our unique handcrafted pieces.</p>
                        <Link to="/products" className="inline-block bg-[#1F1F1F] text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-lg">
                          Discover Collection
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4 md:space-y-6">
                        {orders.map((order) => (
                          <div key={order._id} className="bg-white border border-[#EFE9DF] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:shadow-xl hover:border-[#C5A059]/30 transition-all group">
                             <div className="p-5 md:p-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                   <div>
                                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/30 mb-1">ID: #{order._id.slice(-6).toUpperCase()}</p>
                                      <p className="text-[10px] md:text-xs font-bold text-[#1F1F1F]">{formatDate(order.createdAt)}</p>
                                   </div>
                                   <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                      <div className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${order.isPaid ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                         {order.isPaid ? <CheckCircle size={8} className="md:w-[10px]" /> : <Clock size={8} className="md:w-[10px]" />}
                                         {order.isPaid ? 'Paid' : 'Pending'}
                                      </div>
                                      <div className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${order.isDelivered ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-blue-50 text-blue-500'}`}>
                                         {order.isDelivered ? <CheckCircle size={8} className="md:w-[10px]" /> : <Truck size={8} className="md:w-[10px]" />}
                                         {order.isDelivered ? 'Delivered' : 'Transit'}
                                      </div>
                                   </div>
                                </div>

                                <div className="space-y-3 md:space-y-4 mb-6">
                                   {order.orderItems.map((item, idx) => (
                                      <div key={idx} className="flex items-center gap-3 md:gap-4 bg-[#FDFBF7] p-2 md:p-3 rounded-xl md:rounded-2xl border border-[#EFE9DF]/50">
                                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                         </div>
                                         <div className="flex-grow min-w-0">
                                            <p className="text-[10px] md:text-xs font-serif font-bold text-[#1F1F1F] truncate">{item.name}</p>
                                            <p className="text-[7px] md:text-[8px] font-bold text-[#1F1F1F]/40 uppercase tracking-widest">{item.qty} Unit(s) • ₹{item.price}</p>
                                         </div>
                                         <Link to={`/products/${item.product}`} className="p-2 text-[#C5A059] hover:bg-white rounded-full transition-colors shrink-0">
                                            <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
                                         </Link>
                                      </div>
                                   ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-[#FDFBF7]">
                                   <div className="text-[#1F1F1F]/40 flex items-center gap-2">
                                      <ShoppingBag size={12} className="md:w-3.5 md:h-3.5" />
                                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">{order.orderItems.length} Piece(s)</span>
                                   </div>
                                   <div className="text-right">
                                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]/40 mb-0.5">Total</p>
                                      <p className="text-lg md:text-xl font-sans font-bold text-[#1F1F1F]">₹{order.totalPrice}</p>
                                   </div>
                                </div>
                             </div>
                             
                             <div className="bg-[#F9F6F0] px-6 md:px-8 py-2 md:py-3 flex justify-between items-center group-hover:bg-[#C5A059]/5 transition-colors">
                                <p className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/30">Artisan Authenticity</p>
                                <ChevronRight size={12} className="text-[#1F1F1F]/20 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Aesthetic Footer */}
                <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-[#F9F6F0] flex items-center justify-between text-[#1F1F1F]/30 italic text-[10px] md:text-xs font-serif">
                  <p>Handcrafted for {userInfo?.name.split(' ')[0]}</p>
                  <div className="flex space-x-2">
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#C5A059] rounded-full"></span>
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#C5A059] rounded-full opacity-50"></span>
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#C5A059] rounded-full opacity-20"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
