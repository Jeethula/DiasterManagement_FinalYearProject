import { useState } from 'react';
import Card from '../components/common/Card';
import { mockWeatherAlerts } from '../data/mockWeatherData';
import { mockSocialPosts } from '../data/mockSocialPosts';
import { mockResourceData } from '../data/mockResourceData';
import { 
  Layers,
  Eye,
  EyeOff,
  Cloud,
  MessageSquare,
  Package,
  Route,
  AlertTriangle
} from 'lucide-react';
import FullScreenMap from '../components/map/FullScreenMap';

const MapPage = () => {
  const [showWeatherLayer, setShowWeatherLayer] = useState(true);
  const [showSocialLayer, setShowSocialLayer] = useState(true);
  const [showResourceLayer, setShowResourceLayer] = useState(true);
  const [showEvacuationRoutes, setShowEvacuationRoutes] = useState(false);
  const [showRiskZones, setShowRiskZones] = useState(true);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Map View</h1>
        <p className="text-gray-400">Interactive map showing disaster data, resources, and social media activity</p>
      </div>
      
      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-background-medium border-b border-background-light flex flex-wrap items-center gap-3">
          <div className="flex items-center mr-2">
            <Layers size={18} className="mr-1" />
            <span className="text-sm font-semibold">Map Layers:</span>
          </div>
          
          <button
            onClick={() => setShowWeatherLayer(!showWeatherLayer)}
            className={`flex items-center px-3 py-1 text-sm rounded ${
              showWeatherLayer ? 'bg-info-600 text-white' : 'bg-background-light text-gray-300'
            }`}
          >
            <Cloud size={14} className="mr-1" />
            Weather Alerts
            {showWeatherLayer ? (
              <Eye size={14} className="ml-1" />
            ) : (
              <EyeOff size={14} className="ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setShowSocialLayer(!showSocialLayer)}
            className={`flex items-center px-3 py-1 text-sm rounded ${
              showSocialLayer ? 'bg-primary-600 text-white' : 'bg-background-light text-gray-300'
            }`}
          >
            <MessageSquare size={14} className="mr-1" />
            Social Activity
            {showSocialLayer ? (
              <Eye size={14} className="ml-1" />
            ) : (
              <EyeOff size={14} className="ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setShowResourceLayer(!showResourceLayer)}
            className={`flex items-center px-3 py-1 text-sm rounded ${
              showResourceLayer ? 'bg-warning-600 text-white' : 'bg-background-light text-gray-300'
            }`}
          >
            <Package size={14} className="mr-1" />
            Resources
            {showResourceLayer ? (
              <Eye size={14} className="ml-1" />
            ) : (
              <EyeOff size={14} className="ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setShowEvacuationRoutes(!showEvacuationRoutes)}
            className={`flex items-center px-3 py-1 text-sm rounded ${
              showEvacuationRoutes ? 'bg-success-600 text-white' : 'bg-background-light text-gray-300'
            }`}
          >
            <Route size={14} className="mr-1" />
            Evacuation Routes
            {showEvacuationRoutes ? (
              <Eye size={14} className="ml-1" />
            ) : (
              <EyeOff size={14} className="ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setShowRiskZones(!showRiskZones)}
            className={`flex items-center px-3 py-1 text-sm rounded ${
              showRiskZones ? 'bg-emergency-600 text-white' : 'bg-background-light text-gray-300'
            }`}
          >
            <AlertTriangle size={14} className="mr-1" />
            Risk Zones
            {showRiskZones ? (
              <Eye size={14} className="ml-1" />
            ) : (
              <EyeOff size={14} className="ml-1" />
            )}
          </button>
        </div>
        
        <div className="h-[calc(100vh-13rem)]">
          <FullScreenMap 
            weatherAlerts={showWeatherLayer ? mockWeatherAlerts : []}
            socialPosts={showSocialLayer ? mockSocialPosts : []}
            resources={showResourceLayer ? mockResourceData : []}
            showEvacuationRoutes={showEvacuationRoutes}
            showRiskZones={showRiskZones}
          />
        </div>
      </Card>
    </div>
  );
};

export default MapPage;