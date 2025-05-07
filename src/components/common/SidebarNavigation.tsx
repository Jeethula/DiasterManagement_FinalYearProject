import { Link, useLocation } from 'react-router-dom';
import { 
  AlertTriangle, 
  BarChart3, 
  Cloud, 
  Map, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Home 
} from 'lucide-react';

interface SidebarNavigationProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarNavigation = ({ isOpen, toggleSidebar }: SidebarNavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/weather', label: 'Weather Alerts', icon: <Cloud size={20} /> },
    { path: '/social', label: 'Social Monitor', icon: <MessageSquare size={20} /> },
    { path: '/resources', label: 'Resources', icon: <BarChart3 size={20} /> },
    { path: '/map', label: 'Map View', icon: <Map size={20} /> },
  ];

  return (
    <aside 
      className={`bg-background-medium text-white transition-all duration-300 flex flex-col ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-background-light">
        <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center w-full'}`}>
          <AlertTriangle className="text-emergency-500 mr-2" size={24} />
          {isOpen && <span className="font-bold text-xl">DisasterWatch</span>}
        </div>
        <button 
          onClick={toggleSidebar}
          className={`text-gray-400 hover:text-white ${!isOpen && 'hidden'}`}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center py-3 px-4 transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-background-light text-white' 
                    : 'text-gray-400 hover:bg-background-light hover:text-white'
                } ${!isOpen && 'justify-center'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-background-light">
        <div className={`flex items-center ${isOpen ? '' : 'justify-center'}`}>
          <div className="h-2 w-2 bg-emergency-500 rounded-full mr-2 animate-pulse"></div>
          {isOpen && <span className="text-sm text-gray-400">Live Monitoring Active</span>}
        </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;