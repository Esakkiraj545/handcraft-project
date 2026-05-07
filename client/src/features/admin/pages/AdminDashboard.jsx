import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Users, ListOrdered, Plus, Edit, Trash2, TrendingUp, DollarSign, Package, X, Loader2 } from 'lucide-react';
import api from '../../../lib/axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    brand: 'Aakriti',
    countInStock: '',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600' // Default placeholder
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'overview') {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } else if (activeTab === 'products') {
        const { data } = await api.get('/products');
        setProducts(data);
      } else if (activeTab === 'users') {
        const { data } = await api.get('/admin/users');
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
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

  const handleEditClick = (product) => {
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
    setShowAddModal(true);
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      brand: 'Aakriti',
      countInStock: '',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600'
    });
    setIsEditing(false);
    setEditId(null);
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/products/${editId}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setShowAddModal(false);
      fetchData();
    } catch (error) {
      alert(`Error ${isEditing ? 'updating' : 'adding'} product`);
    }
  };

  const dashboardStats = [
    { label: 'Total Revenue', value: stats ? `₹${stats.totalRevenue}` : '₹0', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: stats ? stats.orderCount : '0', icon: ListOrdered, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Active Users', value: stats ? stats.userCount : '0', icon: Users, color: 'text-secondary-600', bg: 'bg-secondary-50' },
    { label: 'Products', value: stats ? stats.productCount : '0', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex min-h-screen bg-brand-cream/30">
      {/* Sidebar - Fixed */}
      <aside className="w-72 fixed left-0 top-[72px] bottom-0 z-40 bg-white shadow-2xl border-r border-dark-100 hidden lg:block overflow-y-auto font-sans">
        <div className="p-6 space-y-6">
          <div className="glass p-5 rounded-xl border border-primary-100 shadow-sm">
            <h2 className="text-xl font-black text-gradient">Admin Center</h2>
            <p className="text-[10px] text-dark-400 font-bold uppercase tracking-widest mt-1">Management Portal</p>
          </div>
          
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Products', icon: ShoppingBag },
              { id: 'orders', label: 'Orders', icon: ListOrdered },
              { id: 'users', label: 'Users', icon: Users },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 w-full p-4 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                  : 'text-dark-600 hover:bg-dark-50'
                }`}
              >
                <tab.icon size={18} />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow lg:ml-72 p-6 md:p-10 animate-fade-in">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="animate-spin text-primary-600" size={48} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border border-white/20 shadow-xl hover:translate-y-[-4px] transition-all duration-300">
                      <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                        <stat.icon size={22} />
                      </div>
                      <p className="text-dark-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                      <h4 className="text-2xl font-black mt-1 font-numeric">{stat.value}</h4>
                    </div>
                  ))}
                </div>

                <div className="glass p-10 rounded-3xl text-center shadow-2xl border border-white/20 bg-gradient-to-br from-white to-primary-50/30">
                  <h3 className="text-2xl font-black mb-4">Welcome to Admin Dashboard</h3>
                  <p className="text-dark-500 max-w-lg mx-auto">Monitor your handcrafted jewelry business metrics and manage inventory with ease.</p>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="glass p-8 rounded-3xl shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black">Product Management</h3>
                  <button 
                    onClick={handleOpenAddModal}
                    className="bg-primary-600 text-white flex items-center space-x-2 py-3 px-6 rounded-xl hover:bg-primary-700 transition-all shadow-lg"
                  >
                    <Plus size={20} />
                    <span className="text-sm font-bold">Add Product</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {products.length === 0 ? (
                    <p className="text-center text-dark-500 py-10">No products found.</p>
                  ) : (
                    products.map(product => (
                      <div key={product._id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-dark-100 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 rounded-lg bg-white shadow-sm overflow-hidden border border-dark-50">
                            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                          </div>
                          <div>
                            <h4 className="font-bold text-dark-900">{product.name}</h4>
                            <p className="text-dark-400 text-xs font-medium">Category: {product.category} | Price: <span className="font-numeric">₹{product.price}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-all" onClick={() => handleEditClick(product)}><Edit size={18} /></button>
                          <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-all" onClick={() => handleDeleteProduct(product._id)}><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="glass p-8 rounded-3xl shadow-2xl border border-white/20">
                <h3 className="text-2xl font-black mb-8">User Management</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-dark-100">
                        <th className="pb-4 font-bold text-dark-400 uppercase text-[10px] tracking-widest">User Details</th>
                        <th className="pb-4 font-bold text-dark-400 uppercase text-[10px] tracking-widest">Role</th>
                        <th className="pb-4 font-bold text-dark-400 uppercase text-[10px] tracking-widest">Joined</th>
                        <th className="pb-4 font-bold text-dark-400 uppercase text-[10px] tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-50">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-dark-50/50 transition-colors">
                          <td className="py-5">
                            <div className="flex items-center space-x-4">
                              <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-black text-sm">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-dark-900 text-sm">{user.name}</p>
                                <p className="text-dark-400 text-[11px]">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'text-purple-600 bg-purple-50' : 'text-blue-600 bg-blue-50'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-5 text-dark-400 text-xs font-numeric">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-5 text-right">
                            <button 
                              onClick={() => handleDeleteUser(user._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete User"
                              disabled={user.role === 'admin'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="text-center py-32 glass rounded-3xl shadow-2xl border border-white/20">
                <TrendingUp size={48} className="text-primary-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Module Under Development</h3>
                <p className="text-dark-400">Detailed order analytics and management will be available soon.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-2xl p-10 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-8 top-8 p-2 hover:bg-dark-50 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            <h3 className="text-3xl font-black mb-8 font-sans">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-xs font-black uppercase tracking-widest text-dark-400 ml-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-dark-50 rounded-xl py-4 px-6 focus:ring-1 focus:ring-primary-600 outline-none text-sm"
                  placeholder="E.g. Crystal Necklace"
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-xs font-black uppercase tracking-widest text-dark-400 ml-1">Price (₹)</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-dark-50 rounded-xl py-4 px-6 focus:ring-1 focus:ring-primary-600 outline-none text-sm font-numeric"
                  placeholder="999"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-dark-400 ml-1">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-dark-50 rounded-xl py-4 px-6 focus:ring-1 focus:ring-primary-600 outline-none text-sm min-h-[100px]"
                  placeholder="Describe the product..."
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-xs font-black uppercase tracking-widest text-dark-400 ml-1">Category</label>
                <input 
                  type="text" 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-dark-50 rounded-xl py-4 px-6 focus:ring-1 focus:ring-primary-600 outline-none text-sm"
                  placeholder="Necklace, Rings, etc."
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-xs font-black uppercase tracking-widest text-dark-400 ml-1">Stock Quantity</label>
                <input 
                  type="number" 
                  required
                  value={formData.countInStock}
                  onChange={(e) => setFormData({...formData, countInStock: e.target.value})}
                  className="w-full bg-dark-50 rounded-xl py-4 px-6 focus:ring-1 focus:ring-primary-600 outline-none text-sm font-numeric"
                  placeholder="10"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-dark-400 ml-1">Image URL</label>
                <input 
                  type="text" 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-dark-50 rounded-xl py-4 px-6 focus:ring-1 focus:ring-primary-600 outline-none text-sm"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <button 
                type="submit" 
                className="col-span-2 bg-primary-600 text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 active:scale-[0.98] mt-4"
              >
                {isEditing ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
