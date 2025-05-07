import { Alert, Notification } from '../contexts/AlertContext';

export const getMockAlerts = (): Alert[] => {
  return [
    {
      id: '1',
      type: 'emergency',
      message: 'Flash flood warning in effect',
      location: 'Harris County, TX',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'warning',
      message: 'Severe thunderstorm approaching',
      location: 'Miami-Dade County, FL',
      timestamp: new Date()
    }
  ];
};

export const getMockNotifications = (): Notification[] => {
  return [
    {
      id: '1',
      type: 'emergency',
      message: 'Flash flood warning issued for Harris County',
      location: 'Houston, TX',
      time: '10 min ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      message: 'Severe thunderstorm approaching coastal areas',
      location: 'Miami, FL',
      time: '25 min ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      message: 'Evacuation routes updated for coastal residents',
      location: 'New Orleans, LA',
      time: '1 hour ago',
      read: true
    },
    {
      id: '4',
      type: 'emergency',
      message: 'Wildfire spreading rapidly in western region',
      location: 'Los Angeles, CA',
      time: '2 hours ago',
      read: true
    },
    {
      id: '5',
      type: 'warning',
      message: 'High wind advisory for northern counties',
      location: 'Chicago, IL',
      time: '3 hours ago',
      read: true
    }
  ];
};