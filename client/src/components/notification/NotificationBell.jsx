import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, ShoppingBag, CheckCircle, Clock, X, Check } from 'lucide-react';
import { getNotifications, markAsRead, markAllAsRead } from '../../features/notification/notificationSlice';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, isLoading } = useSelector((state) => state.notification);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(getNotifications());
      // Poll every 30 seconds for new notifications
      const interval = setInterval(() => {
        dispatch(getNotifications());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [userInfo, dispatch]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order_success':
        return <ShoppingBag size={14} className="text-green-500" />;
      case 'order_delivered':
        return <CheckCircle size={14} className="text-[#C5A059]" />;
      default:
        return <Bell size={14} className="text-[#1F1F1F]/40" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:text-[#C5A059] transition-colors p-2"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 md:right-0 mt-2 w-[calc(100vw-2rem)] md:w-80 bg-white shadow-2xl border border-[#EFE9DF] rounded-2xl overflow-hidden z-[100] animate-fade-in fixed left-4 right-4 md:absolute md:left-auto md:right-0">
          <div className="p-4 border-b border-[#F9F6F0] flex justify-between items-center bg-[#F9F6F0]/50">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-[8px] font-black uppercase tracking-widest text-[#C5A059] hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-10 text-center">
                <Bell size={24} className="mx-auto text-[#1F1F1F]/10 mb-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1F1F1F]/20">No notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n._id} 
                  className={`p-4 border-b border-[#F9F6F0] last:border-0 hover:bg-[#FDFBF7] transition-colors relative group ${!n.isRead ? 'bg-[#C5A059]/5' : ''}`}
                >
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-grow pr-4">
                      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${!n.isRead ? 'text-[#1F1F1F]' : 'text-[#1F1F1F]/40'}`}>
                        {n.title}
                      </p>
                      <p className="text-[11px] leading-relaxed text-[#1F1F1F]/60 mb-2 font-medium">
                        {n.message}
                      </p>
                      <p className="text-[8px] font-bold text-[#1F1F1F]/20 uppercase tracking-wider">
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!n.isRead && (
                      <button 
                        onClick={() => handleMarkRead(n._id)}
                        className="absolute right-4 top-4 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Mark as read"
                      >
                        <Check size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <Link 
            to="/profile" 
            onClick={() => setIsOpen(false)}
            className="block p-4 text-center border-t border-[#F9F6F0] text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/40 hover:bg-[#F9F6F0] hover:text-[#C5A059] transition-all"
          >
            View All Activity
          </Link>
        </div>
      )}

      {/* Backdrop to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90]" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default NotificationBell;
