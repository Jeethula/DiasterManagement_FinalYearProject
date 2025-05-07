import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNavigation from '../components/common/SidebarNavigation';
import NotificationBar from '../components/common/NotificationBar';
import AlertBanner from '../components/common/AlertBanner';
import { useAlerts } from '../contexts/AlertContext';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { activeAlerts } = useAlerts();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNavigation isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <NotificationBar />
        
        <main className="flex-1 overflow-y-auto bg-background-dark p-4">
          {activeAlerts.length > 0 && (
            <div className="mb-4">
              {activeAlerts.map((alert) => (
                <AlertBanner 
                  key={alert.id} 
                  type={alert.type} 
                  message={alert.message} 
                  location={alert.location}
                />
              ))}
            </div>
          )}
          
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;