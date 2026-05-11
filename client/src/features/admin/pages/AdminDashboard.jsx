import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Users, ListOrdered, Plus, Edit, Trash2, 
  TrendingUp, DollarSign, Package, X, Loader2, AlertTriangle, 
  ChevronRight, Calendar, ArrowUpRight, ArrowDownRight, Clock, Tag, Layers, SlidersHorizontal, Star, ShieldCheck,
  BarChart3, Download, CreditCard, Undo2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import api from '../../../lib/axios';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-2xl rounded-xl border border-zinc-100">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-black text-brand-charcoal">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reportsData, setReportsData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    brand: 'Aakriti',
    countInStock: '',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600'
  });

  const [categoryData, setCategoryData] = useState({
    name: '',
    parentCategory: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'overview') {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } else if (activeTab === 'products') {
        const { data } = await api.get('/products');
        setProducts(data);
        const { data: catData } = await api.get('/categories');
        setCategories(catData);
      } else if (activeTab === 'users') {
        const { data } = await api.get('/admin/users');
        setUsers(data);
      } else if (activeTab === 'orders') {
        const { data } = await api.get('/orders');
        setOrders(data);
      } else if (activeTab === 'categories') {
        const { data } = await api.get('/categories');
        setCategories(data);
      } else if (activeTab === 'reviews') {
        const { data } = await api.get('/admin/reviews');
        setReviews(data);
      } else if (activeTab === 'reports') {
        const { data } = await api.get('/admin/reports');
        setReportsData(data);
      } else if (activeTab === 'payments') {
        const { data } = await api.get('/admin/payments');
        setPayments(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setIsSidebarOpen(false); // Close sidebar on tab change (mobile)
  }, [activeTab]);

  useEffect(() => {
    setCurrentPage(1); // Reset page on tab change
  }, [activeTab]);

  const itemsPerPage = 12;
  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  // Product Actions
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/products/${editId}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setShowProductModal(false);
      fetchData();
    } catch (error) {
      alert(`Error ${isEditing ? 'updating' : 'adding'} product`);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      brand: product.brand || 'Aakriti',
      countInStock: product.countInStock,
      image: product.image
    });
    setEditId(product._id);
    setIsEditing(true);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  // Category Actions
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/categories/${editId}`, categoryData);
      } else {
        await api.post('/categories', categoryData);
      }
      setShowCategoryModal(false);
      fetchData();
    } catch (error) {
      alert(`Error ${isEditing ? 'updating' : 'adding'} category`);
    }
  };

  const handleEditCategory = (cat) => {
    setCategoryData({
      name: cat.name,
      parentCategory: cat.parentCategory?._id || ''
    });
    setEditId(cat._id);
    setIsEditing(true);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Delete this category? This might affect products.')) {
      try {
        await api.delete(`/categories/${id}`);
        setCategories(categories.filter(c => c._id !== id));
      } catch (error) {
        alert('Error deleting category');
      }
    }
  };

  // Payment Actions
  const handleProcessRefund = async (id) => {
    if (window.confirm('Process refund for this order? This cannot be undone.')) {
      try {
        await api.put(`/admin/payments/${id}/refund`);
        setPayments(payments.map(p => p._id === id ? { ...p, isRefunded: true, status: 'Refunded' } : p));
        alert('Refund processed successfully');
      } catch (error) {
        alert(error.response?.data?.message || 'Error processing refund');
      }
    }
  };

  // Review Actions
  const handleApproveReview = async (productId, reviewId) => {
    try {
      await api.put(`/admin/reviews/${productId}/${reviewId}/approve`);
      setReviews(reviews.map(r => r._id === reviewId ? { ...r, isApproved: true } : r));
    } catch (error) {
      alert('Error approving review');
    }
  };

  const handleDeleteReview = async (productId, reviewId) => {
    if (window.confirm('Delete this review?')) {
      try {
        await api.delete(`/admin/reviews/${productId}/${reviewId}`);
        setReviews(reviews.filter(r => r._id !== reviewId));
      } catch (error) {
        alert('Error deleting review');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting user');
      }
    }
  };

  const dashboardStats = [
    { label: 'Total Revenue', value: stats ? `₹${stats.totalRevenue}` : '₹0', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12.5%', trendUp: true },
    { label: 'Total Sales', value: stats ? stats.totalSales : '0', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+8.2%', trendUp: true },
    { label: 'Active Users', value: stats ? stats.userCount : '0', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+5.4%', trendUp: true },
    { label: 'Products', value: stats ? stats.productCount : '0', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+2', trendUp: true },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'];


  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-[50] lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 fixed left-0 top-[72px] bottom-0 z-[60] bg-white shadow-[8px_0_25px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto font-sans ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 space-y-6">
          <div className="relative bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black text-brand-charcoal flex items-center">
                Dashboard
                <div className="ml-2 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              </h2>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Management Portal</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-zinc-400 hover:text-brand-charcoal transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Inventory', icon: ShoppingBag },
              { id: 'categories', label: 'Categories', icon: Tag },
              { id: 'orders', label: 'Orders', icon: ListOrdered },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'reports', label: 'Reports', icon: BarChart3 },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'users', label: 'Customers', icon: Users },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full p-3 rounded-xl font-bold transition-all duration-200 ${
                    activeTab === tab.id 
                    ? 'bg-brand-charcoal text-white shadow-lg' 
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-brand-charcoal'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs uppercase tracking-widest font-black">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6">
            <div className="bg-amber-50/50 p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-2 text-amber-800 mb-1.5">
                <AlertTriangle size={14} />
                <span className="text-[9px] font-black uppercase tracking-wider">Stock Alert</span>
              </div>
              <p className="text-[10px] text-amber-700 leading-relaxed font-semibold">
                {stats?.lowStockProducts?.length || 0} items low.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow lg:ml-64 p-4 md:p-8 animate-fade-in min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2.5 bg-zinc-50 text-brand-charcoal rounded-xl hover:bg-zinc-100 transition-colors shadow-sm"
          >
            <SlidersHorizontal size={20} />
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Admin</span>
            <span className="text-xs font-bold text-brand-charcoal capitalize">{activeTab}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-3">
            <Loader2 className="animate-spin text-brand-charcoal" size={30} />
            <p className="text-zinc-300 font-bold text-[10px] tracking-widest uppercase">Fetching Data</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-brand-charcoal tracking-tight">Performance</h1>
                    <p className="text-zinc-400 text-xs font-medium flex items-center mt-1">
                      <Calendar size={14} className="mr-2" />
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-sm hover:shadow-md transition-all">Report</button>
                    <button className="bg-brand-charcoal text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-md hover:bg-zinc-800 transition-all">Manage</button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                            <Icon size={18} />
                          </div>
                          <div className={`text-[9px] font-black px-2 py-0.5 rounded-lg ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {stat.trend}
                          </div>
                        </div>
                        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-0.5">{stat.label}</p>
                        <h4 className="text-xl font-black text-brand-charcoal font-numeric">{stat.value}</h4>
                      </div>
                    );
                  })}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-lg font-black text-brand-charcoal">Revenue</h3>
                        <p className="text-zinc-400 text-[11px] font-medium">Monthly Trends</p>
                      </div>
                    </div>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.salesData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0a0a0a" stopOpacity={0.05}/>
                              <stop offset="95%" stopColor="#0a0a0a" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 10, fontWeight: 700}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 10, fontWeight: 700}} tickFormatter={(v) => `₹${v/1000}k`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area type="monotone" dataKey="sales" stroke="#0a0a0a" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col">
                    <h3 className="text-lg font-black text-brand-charcoal mb-1">Low Stock</h3>
                    <p className="text-zinc-400 text-[11px] font-medium mb-6">Action required</p>
                    <div className="space-y-4 flex-grow">
                      {stats?.lowStockProducts?.slice(0, 5).map(product => (
                        <div key={product._id} className="flex items-center space-x-3 group">
                          <div className="w-10 h-10 rounded-lg bg-zinc-50 overflow-hidden shadow-inner flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-xs font-bold text-brand-charcoal truncate">{product.name}</p>
                            <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md uppercase">Stock: {product.countInStock}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-brand-charcoal tracking-tight">Catalog</h3>
                    <p className="text-zinc-400 text-xs font-medium">Manage your items</p>
                  </div>
                  <button onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: '', price: '', description: '', category: '', brand: 'Aakriti', countInStock: '',
                      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600'
                    });
                    setShowProductModal(true);
                  }} className="bg-brand-charcoal text-white flex items-center justify-center space-x-2 py-2.5 px-5 rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-95 group">
                    <Plus size={16} />
                    <span className="text-[11px] font-black uppercase tracking-widest">New Product</span>
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  {paginate(products).map(product => (
                    <div key={product._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl bg-zinc-50 overflow-hidden shadow-inner flex-shrink-0">
                          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-charcoal text-sm">{product.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{product.category}</span>
                            <span className="text-brand-charcoal font-black text-xs font-numeric">₹{product.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                        <button className="p-2 text-zinc-300 hover:text-brand-charcoal hover:bg-zinc-50 rounded-lg" onClick={() => handleEditProduct(product)}><Edit size={16} /></button>
                        <button className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg" onClick={() => handleDeleteProduct(product._id)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-brand-charcoal tracking-tight">Categories</h3>
                    <p className="text-zinc-400 text-xs font-medium">Organize your products</p>
                  </div>
                  <button onClick={() => {
                    setIsEditing(false);
                    setCategoryData({ name: '', parentCategory: '' });
                    setShowCategoryModal(true);
                  }} className="bg-brand-charcoal text-white flex items-center justify-center space-x-2 py-2.5 px-5 rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-95 group">
                    <Plus size={16} />
                    <span className="text-[11px] font-black uppercase tracking-widest">New Category</span>
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  {categories.map(cat => (
                    <div key={cat._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
                          <Tag size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-charcoal text-sm">{cat.name}</h4>
                          {cat.parentCategory && (
                            <div className="flex items-center text-[10px] text-zinc-400 font-bold uppercase mt-0.5">
                              <Layers size={10} className="mr-1" /> Sub-category of {cat.parentCategory.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                        <button className="p-2 text-zinc-300 hover:text-brand-charcoal hover:bg-zinc-50 rounded-lg" onClick={() => handleEditCategory(cat)}><Edit size={16} /></button>
                        <button className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg" onClick={() => handleDeleteCategory(cat._id)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-black text-brand-charcoal">Customers</h3>
                  <p className="text-zinc-400 text-xs font-medium">User records</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50/20">
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Details</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Phone</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Role</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50/30">
                      {paginate(users).map((user) => (
                        <tr key={user._id} className="hover:bg-zinc-50/5 transition-colors">
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm shadow-sm">{user.name.charAt(0)}</div>
                              <div>
                                <p className="font-bold text-brand-charcoal text-xs">{user.name}</p>
                                <p className="text-zinc-400 text-[10px]">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-xs font-bold text-brand-charcoal">{user.address?.phone || user.phone || 'N/A'}</p>
                          </td>
                          <td className="px-8 py-5 text-[8px] font-black uppercase tracking-widest">{user.role}</td>
                          <td className="px-8 py-5 text-right">
                            <button onClick={() => handleDeleteUser(user._id)} className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg disabled:opacity-30" disabled={user.role === 'admin'}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reports' && reportsData && (
              <div className="space-y-8 pb-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-brand-charcoal">Analytical Reports</h3>
                    <p className="text-zinc-400 text-xs font-medium">Real-time business performance metrics</p>
                  </div>
                  <button className="flex items-center space-x-2 bg-white border border-zinc-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-brand-charcoal hover:border-zinc-300 transition-all shadow-sm">
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </div>

                {/* Row 1: Daily Revenue */}
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-100">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h4 className="text-sm font-black text-brand-charcoal uppercase tracking-widest">Daily Revenue Report</h4>
                      <p className="text-[10px] text-zinc-400 font-bold">Last 30 days performance</p>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full">
                      <TrendingUp size={12} />
                      <span>Real-time</span>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={reportsData?.dailyReport || []}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                        <XAxis dataKey="date" hide />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#A1A1AA'}} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Category Performance */}
                  <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-100">
                    <h4 className="text-sm font-black text-brand-charcoal uppercase tracking-widest mb-8">Category Revenue</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reportsData?.categoryReport || []} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f1f1" />
                          <XAxis type="number" hide />
                          <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#1F1F1F'}} width={80} />
                          <Tooltip cursor={{fill: 'transparent'}} />
                          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                            {(reportsData?.categoryReport || []).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Monthly Trend */}
                  <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-100">
                    <h4 className="text-sm font-black text-brand-charcoal uppercase tracking-widest mb-8">Monthly Growth</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reportsData.monthlyReport}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#A1A1AA'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#A1A1AA'}} />
                          <Tooltip cursor={{fill: '#f9fafb'}} />
                          <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Product Wise Report */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-100 overflow-hidden">
                  <div className="p-8 border-b border-zinc-50">
                    <h4 className="text-sm font-black text-brand-charcoal uppercase tracking-widest">Product Wise Performance</h4>
                    <p className="text-[10px] text-zinc-400 font-bold">Comprehensive inventory sales data</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-zinc-50/20">
                          <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Product</th>
                          <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest text-center">Units Sold</th>
                          <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest text-right">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50/30">
                        {(reportsData?.productReport || []).map((prod, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50/5 transition-colors">
                            <td className="px-8 py-5">
                              <p className="font-bold text-brand-charcoal text-xs">{prod.name}</p>
                              <p className="text-zinc-400 text-[10px] uppercase font-black tracking-wider mt-1">{prod.category}</p>
                            </td>
                            <td className="px-8 py-5 text-center font-numeric text-xs font-black text-zinc-500">{prod.quantity}</td>
                            <td className="px-8 py-5 text-right font-numeric text-xs font-black text-brand-charcoal">₹{prod.revenue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-black text-brand-charcoal">Orders</h3>
                  <p className="text-zinc-400 text-xs font-medium">Sales records</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50/20">
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Order ID</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Customer</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Shipping Address</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50/30">
                      {paginate(orders).map((order) => (
                        <tr key={order._id} className="hover:bg-zinc-50/5 transition-colors">
                          <td className="px-8 py-5 font-numeric text-[11px] font-bold text-brand-charcoal">#{order._id.slice(-8).toUpperCase()}</td>
                          <td className="px-8 py-5 text-xs font-bold text-brand-charcoal">{order.user?.name || 'Guest'}</td>
                          <td className="px-8 py-5">
                            <div className="max-w-[200px] whitespace-normal">
                              <p className="text-[10px] font-bold text-brand-charcoal truncate">{order.shippingAddress?.address}</p>
                              <p className="text-zinc-400 text-[9px] font-black uppercase tracking-wider">{order.shippingAddress?.city} - {order.shippingAddress?.postalCode}</p>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right font-numeric text-[11px] font-black">₹{order.totalPrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-black text-brand-charcoal">Payment Management</h3>
                    <p className="text-zinc-400 text-xs font-medium">Transaction history & refunds</p>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-50 px-4 py-2 rounded-xl">
                    <Clock size={14} className="text-zinc-400" />
                    <span>Last updated: Just now</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50/20 border-y border-zinc-50/50">
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Transaction Details</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Customer</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Method</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Status</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest text-right">Amount</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50/30">
                      {payments.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-8 py-12 text-center text-zinc-400 font-serif italic">No transactions found</td>
                        </tr>
                      ) : (
                        payments.map((pay) => (
                          <tr key={pay._id} className="hover:bg-zinc-50/5 transition-colors">
                            <td className="px-8 py-5">
                              <p className="font-bold text-brand-charcoal text-xs font-numeric uppercase">#{pay._id.slice(-8)}</p>
                              <p className="text-zinc-400 text-[10px] font-medium mt-1">ID: {pay.transactionId}</p>
                            </td>
                            <td className="px-8 py-5">
                              <p className="text-xs font-bold text-brand-charcoal">{pay.user?.name || 'Guest User'}</p>
                              <p className="text-zinc-400 text-[10px]">{pay.user?.email || 'N/A'}</p>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">{pay.method}</span>
                            </td>
                            <td className="px-8 py-5">
                              {pay.isRefunded ? (
                                <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[8px] font-black uppercase tracking-widest rounded-full">Refunded</span>
                              ) : pay.isPaid ? (
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-full">Paid</span>
                              ) : (
                                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[8px] font-black uppercase tracking-widest rounded-full">Pending</span>
                              )}
                            </td>
                            <td className="px-8 py-5 text-right font-numeric text-xs font-black text-brand-charcoal">₹{pay.amount.toLocaleString()}</td>
                            <td className="px-8 py-5 text-right">
                              {pay.isPaid && !pay.isRefunded && (
                                <button 
                                  onClick={() => handleProcessRefund(pay._id)}
                                  className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                  title="Issue Refund"
                                >
                                  <Undo2 size={16} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {activeTab === 'reviews' && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-black text-brand-charcoal">Review Moderation</h3>
                  <p className="text-zinc-400 text-xs font-medium">Manage customer feedback</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50/20">
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Product & User</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Feedback</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest">Status</th>
                        <th className="px-8 py-4 font-black text-zinc-400 uppercase text-[9px] tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                      <tbody className="divide-y divide-zinc-50/30">
                        {reviews.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-8 py-12 text-center text-zinc-400 font-serif italic">No reviews found</td>
                          </tr>
                        ) : (
                          paginate(reviews).map((review) => (
                          <tr key={review._id} className="hover:bg-zinc-50/5 transition-colors">
                            <td className="px-8 py-5">
                              <p className="font-bold text-brand-charcoal text-xs">{review.productName}</p>
                              <p className="text-zinc-400 text-[10px] uppercase font-black tracking-wider mt-1">by {review.name}</p>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex text-amber-400 mb-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.rating ? 'currentColor' : 'none'} />)}
                              </div>
                              <p className="text-zinc-500 text-[11px] leading-relaxed italic truncate max-w-xs">"{review.comment}"</p>
                            </td>
                            <td className="px-8 py-5">
                              {review.isApproved ? (
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-full">Approved</span>
                              ) : (
                                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[8px] font-black uppercase tracking-widest rounded-full">Pending</span>
                              )}
                            </td>
                            <td className="px-8 py-5 text-right flex items-center justify-end space-x-2">
                              {!review.isApproved && (
                                <button 
                                  onClick={() => handleApproveReview(review.productId, review._id)}
                                  className="p-2 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                  title="Approve Review"
                                >
                                  <ShieldCheck size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeleteReview(review.productId, review._id)}
                                className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                                title="Delete Spam"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Common Pagination Controls */}
            {['products', 'orders', 'payments', 'reviews', 'users'].includes(activeTab) && (
              <div className="flex items-center justify-between bg-white px-8 py-4 rounded-2xl shadow-sm border border-zinc-50 mt-8">
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, (activeTab === 'products' ? products.length : activeTab === 'orders' ? orders.length : activeTab === 'users' ? users.length : activeTab === 'payments' ? payments.length : reviews.length))} of {(activeTab === 'products' ? products.length : activeTab === 'orders' ? orders.length : activeTab === 'users' ? users.length : activeTab === 'payments' ? payments.length : reviews.length)}
                </div>
                <div className="flex space-x-2">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(prev => prev - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-zinc-50 text-brand-charcoal text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  <button 
                    disabled={currentPage * itemsPerPage >= (activeTab === 'products' ? products.length : activeTab === 'orders' ? orders.length : activeTab === 'users' ? users.length : activeTab === 'payments' ? payments.length : reviews.length)}
                    onClick={() => {
                      setCurrentPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-brand-charcoal text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm" onClick={() => setShowProductModal(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowProductModal(false)} className="absolute right-6 top-6 p-2 hover:bg-zinc-50 rounded-lg transition-all"><X size={20} className="text-zinc-400" /></button>
            <div className="mb-8">
              <h3 className="text-2xl font-black text-brand-charcoal tracking-tight">{isEditing ? 'Edit Item' : 'New Item'}</h3>
              <p className="text-zinc-400 text-xs font-medium mt-1">Update store collection</p>
            </div>
            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 col-span-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3 px-4 focus:bg-white outline-none text-xs font-bold shadow-sm" />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Price</label>
                <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3 px-4 focus:bg-white outline-none text-xs font-black shadow-sm font-numeric" />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Category</label>
                <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3 px-4 focus:bg-white outline-none text-xs font-bold shadow-sm">
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Description</label>
                <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3 px-4 focus:bg-white outline-none text-xs font-medium shadow-sm min-h-[100px] resize-none" />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Stock</label>
                <input type="number" required value={formData.countInStock} onChange={(e) => setFormData({...formData, countInStock: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3 px-4 focus:bg-white outline-none text-xs font-black shadow-sm font-numeric" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Image URL</label>
                <input type="text" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3 px-4 focus:bg-white outline-none text-[10px] font-medium shadow-sm" />
              </div>
              <button type="submit" className="col-span-2 bg-brand-charcoal text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 shadow-lg active:scale-[0.98] mt-2">
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm" onClick={() => setShowCategoryModal(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl p-8 shadow-2xl">
            <button onClick={() => setShowCategoryModal(false)} className="absolute right-6 top-6 p-2 hover:bg-zinc-50 rounded-lg transition-all"><X size={18} className="text-zinc-400" /></button>
            <div className="mb-8">
              <h3 className="text-xl font-black text-brand-charcoal tracking-tight">{isEditing ? 'Edit Category' : 'New Category'}</h3>
              <p className="text-zinc-400 text-[10px] font-bold uppercase mt-1">Structure your catalog</p>
            </div>
            <form onSubmit={handleCategorySubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Category Name</label>
                <input type="text" required value={categoryData.name} onChange={(e) => setCategoryData({...categoryData, name: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3.5 px-5 focus:bg-white outline-none text-xs font-bold shadow-sm" placeholder="E.g. Necklaces" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Parent Category (Optional)</label>
                <select value={categoryData.parentCategory} onChange={(e) => setCategoryData({...categoryData, parentCategory: e.target.value})} className="w-full bg-zinc-50 rounded-xl py-3.5 px-5 focus:bg-white outline-none text-xs font-bold shadow-sm">
                  <option value="">Main Category</option>
                  {categories.filter(c => c._id !== editId).map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-brand-charcoal text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 shadow-lg active:scale-[0.98]">
                {isEditing ? 'Update Category' : 'Create Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
