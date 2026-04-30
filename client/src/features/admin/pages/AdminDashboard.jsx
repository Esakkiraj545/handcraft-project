import { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, ListOrdered, Plus, Edit, Trash2, TrendingUp, DollarSign, Package } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Stats dummy data
  const stats = [
    { label: 'Total Revenue', value: '$24,560', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: '1,284', icon: ListOrdered, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Active Users', value: '842', icon: Users, color: 'text-secondary-600', bg: 'bg-secondary-50' },
    { label: 'Products', value: '48', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Admin Navigation */}
        <div className="w-full lg:w-72 space-y-4">
          <div className="glass p-8 rounded-[2.5rem] mb-6">
            <h2 className="text-2xl font-black text-gradient">Admin Center</h2>
          </div>
          
          <nav className="glass p-4 rounded-[2rem] space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Products', icon: ShoppingBag },
              { id: 'orders', label: 'Orders', icon: ListOrdered },
              { id: 'users', label: 'Users', icon: Users },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-4 w-full p-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                  : 'text-dark-600 hover:bg-dark-50'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="flex-grow animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-10">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass p-6 rounded-[2rem] border-none">
                    <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon size={24} />
                    </div>
                    <p className="text-dark-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                    <h4 className="text-3xl font-black mt-1">{stat.value}</h4>
                  </div>
                ))}
              </div>

              {/* Recent Activity Table (Placeholder) */}
              <div className="glass p-10 rounded-[3rem]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black">Recent Orders</h3>
                  <button className="text-primary-600 font-bold hover:underline">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-dark-100">
                        <th className="pb-4 font-bold text-dark-400 uppercase text-xs tracking-widest">Order ID</th>
                        <th className="pb-4 font-bold text-dark-400 uppercase text-xs tracking-widest">Customer</th>
                        <th className="pb-4 font-bold text-dark-400 uppercase text-xs tracking-widest">Date</th>
                        <th className="pb-4 font-bold text-dark-400 uppercase text-xs tracking-widest">Status</th>
                        <th className="pb-4 font-bold text-dark-400 uppercase text-xs tracking-widest text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-50">
                      {[
                        { id: '#ORD-7281', customer: 'Sarah Jenkins', date: 'Oct 12, 2026', status: 'Delivered', amount: '$129.00', statusColor: 'text-green-600 bg-green-50' },
                        { id: '#ORD-7282', customer: 'Michael Chen', date: 'Oct 12, 2026', status: 'Pending', amount: '$85.50', statusColor: 'text-amber-600 bg-amber-50' },
                        { id: '#ORD-7283', customer: 'Emma Watson', date: 'Oct 11, 2026', status: 'Processing', amount: '$450.00', statusColor: 'text-primary-600 bg-primary-50' },
                      ].map((order, i) => (
                        <tr key={i} className="hover:bg-dark-50/50 transition-colors">
                          <td className="py-4 font-bold">{order.id}</td>
                          <td className="py-4">{order.customer}</td>
                          <td className="py-4 text-dark-500">{order.date}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 text-right font-black">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="glass p-10 rounded-[3rem]">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-black">Product Management</h3>
                <button className="btn-primary flex items-center space-x-2 py-3">
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Mock Product Rows */}
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-dark-50 rounded-2xl border border-transparent hover:border-primary-100 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-white overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=200" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-dark-900">Crystal Quartz Necklace</h4>
                        <p className="text-dark-500 text-sm">Category: Necklace | Price: $129.00</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-3 text-primary-600 hover:bg-primary-50 rounded-xl transition-all"><Edit size={20} /></button>
                      <button className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add more tabs as needed */}
          {(activeTab === 'orders' || activeTab === 'users') && (
            <div className="text-center py-32 glass rounded-[3rem]">
              <TrendingUp size={48} className="text-primary-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Module Under Development</h3>
              <p className="text-dark-400">Detailed {activeTab} analytics will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
