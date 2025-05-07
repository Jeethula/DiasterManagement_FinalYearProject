import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMockAlerts, getMockNotifications } from '../data/mockAlerts';

export type AlertType = 'emergency' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  location: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: AlertType;
  message: string;
  location: string;
  time: string;
  read: boolean;
}

interface AlertContextType {
  activeAlerts: Alert[];
  notifications: Notification[];
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  removeAlert: (id: string) => void;
  markAsRead: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Initialize with mock data
    setActiveAlerts(getMockAlerts());
    setNotifications(getMockNotifications());
    
    // Simulate new alerts coming in
    const interval = setInterval(() => {
      const alertTypes: AlertType[] = ['emergency', 'warning', 'info'];
      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      
      if (Math.random() > 0.7) {
        addAlert({
          type: randomType,
          message: `New ${randomType} alert detected`,
          location: 'Houston, TX'
        });
      }
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, []);

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date()
    };
    
    setActiveAlerts(prevAlerts => [...prevAlerts, newAlert]);
    
    // Also add to notifications
    const newNotification: Notification = {
      id: newAlert.id,
      type: newAlert.type,
      message: newAlert.message,
      location: newAlert.location,
      time: 'Just now',
      read: false
    };
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  };

  const removeAlert = (id: string) => {
    setActiveAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  return (
    <AlertContext.Provider value={{ 
      activeAlerts, 
      notifications, 
      addAlert, 
      removeAlert, 
      markAsRead 
    }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};