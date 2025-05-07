import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useAlerts } from '../../contexts/AlertContext';

const NotificationBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, markAsRead } = useAlerts();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <header className="bg-background-medium py-2 px-4 border-b border-background-light flex items-center justify-between">
      <h1 className="text-xl font-bold">Disaster Management System</h1>
      
      <div className="flex items-center">
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search alerts..."
            className="bg-background-light text-white rounded-md py-1 px-3 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 w-48"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-background-light relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-emergency-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-background-medium rounded-md shadow-lg z-10 max-h-96 overflow-y-auto animate-fade-in">
              <div className="p-3 border-b border-background-light flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button className="text-xs text-primary-400 hover:text-primary-300">
                  Mark all as read
                </button>
              </div>
              
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  No notifications
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-background-light hover:bg-background-light cursor-pointer ${
                        !notification.read ? 'bg-background-light/50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className={`h-2 w-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                          notification.type === 'emergency' ? 'bg-emergency-500' :
                          notification.type === 'warning' ? 'bg-warning-500' :
                          'bg-info-500'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-400">{notification.location} • {notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NotificationBar;