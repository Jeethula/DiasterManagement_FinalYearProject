import { useState } from 'react';
import Card from '../components/common/Card';
import { mockWeatherAlerts } from '../data/mockWeatherData';
import { mockSocialPosts } from '../data/mockSocialPosts';
import { mockResourceData } from '../data/mockResourceData';
import AlertBadge from '../components/common/AlertBadge';
import { 
  AlertCircle, 
  Droplets, 
  Wind, 
  Flame, 
  CloudSnow, 
  Thermometer, 
  CloudLightning,
  Map,
  MessageSquare,
  Package
} from 'lucide-react';
import MiniMap from '../components/dashboard/MiniMap';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ResourcesOverview from '../components/dashboard/ResourcesOverview';

const DashboardPage = () => {
  const [timeframe] = useState('24h');
  
  const alertsByType = {
    hurricane: mockWeatherAlerts.filter(alert => alert.type === 'hurricane').length,
    flood: mockWeatherAlerts.filter(alert => alert.type === 'flood').length,
    tornado: mockWeatherAlerts.filter(alert => alert.type === 'tornado').length,
    wildfire: mockWeatherAlerts.filter(alert => alert.type === 'wildfire').length,
    winter: mockWeatherAlerts.filter(alert => alert.type === 'winter').length,
    heatwave: mockWeatherAlerts.filter(alert => alert.type === 'heatwave').length,
    thunderstorm: mockWeatherAlerts.filter(alert => alert.type === 'thunderstorm').length,
  };
  
  const urgentPostsCount = mockSocialPosts.filter(post => post.urgency === 'urgent').length;
  const warningPostsCount = mockSocialPosts.filter(post => post.urgency === 'warning').length;
  const infoPostsCount = mockSocialPosts.filter(post => post.urgency === 'info').length;
  
  // Calculate the total resources available vs required
  const resourceSummary = mockResourceData.reduce(
    (acc, resource) => {
      acc.available += resource.available;
      acc.required += resource.required;
      acc.allocated += resource.allocated;
      return acc;
    },
    { available: 0, required: 0, allocated: 0 }
  );
  
  // Calculate allocation percentage
  const resourceAllocationPercentage = Math.round((resourceSummary.allocated / resourceSummary.required) * 100);
  
  const alertIcons = {
    hurricane: <Wind size={20} className="mr-2 text-info-400" />,
    flood: <Droplets size={20} className="mr-2 text-info-400" />,
    tornado: <Wind size={20} className="mr-2 text-emergency-400" />,
    wildfire: <Flame size={20} className="mr-2 text-emergency-400" />,
    winter: <CloudSnow size={20} className="mr-2 text-info-400" />,
    heatwave: <Thermometer size={20} className="mr-2 text-warning-400" />,
    thunderstorm: <CloudLightning size={20} className="mr-2 text-warning-400" />,
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Disaster Management Dashboard</h1>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${
              timeframe === '24h' ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
            }`}
          >
            24h
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              timeframe === '7d' ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
            }`}
          >
            7d
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              timeframe === '30d' ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
            }`}
          >
            30d
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card className="flex items-center">
          <AlertCircle size={40} className="text-emergency-500 mr-4" />
          <div>
            <p className="text-sm text-gray-400">Active Alerts</p>
            <p className="text-2xl font-bold">{mockWeatherAlerts.length}</p>
            <div className="flex mt-1">
              <AlertBadge type="urgent" label={`${mockWeatherAlerts.filter(a => a.severity === 'extreme').length} Critical`} className="mr-2" />
              <AlertBadge type="warning" label={`${mockWeatherAlerts.filter(a => a.severity === 'severe' || a.severity === 'moderate').length} Warnings`} />
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <MessageSquare size={40} className="text-primary-500 mr-4" />
          <div>
            <p className="text-sm text-gray-400">Social Reports</p>
            <p className="text-2xl font-bold">{mockSocialPosts.length}</p>
            <div className="flex mt-1">
              <AlertBadge type="urgent" label={`${urgentPostsCount} Urgent`} className="mr-2" />
              <AlertBadge type="warning" label={`${warningPostsCount} Warning`} />
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <Package size={40} className="text-secondary-500 mr-4" />
          <div>
            <p className="text-sm text-gray-400">Resource Allocation</p>
            <p className="text-2xl font-bold">{resourceAllocationPercentage}%</p>
            <div className="w-full bg-background-light rounded-full h-2.5 mt-2">
              <div 
                className={`h-2.5 rounded-full ${
                  resourceAllocationPercentage < 50 ? 'bg-emergency-500' : 
                  resourceAllocationPercentage < 80 ? 'bg-warning-500' : 
                  'bg-success-500'
                }`}
                style={{ width: `${resourceAllocationPercentage}%` }}
              ></div>
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <Map size={40} className="text-warning-500 mr-4" />
          <div>
            <p className="text-sm text-gray-400">Affected Regions</p>
            <p className="text-2xl font-bold">7</p>
            <p className="text-xs text-gray-400 mt-1">Primary: Houston, Miami, New Orleans</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Active Weather Alerts</h2>
            <a href="/weather" className="text-sm text-primary-400 hover:text-primary-300">View All</a>
          </div>
          
          <div className="h-[300px] relative">
            <MiniMap alerts={mockWeatherAlerts} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
            {Object.entries(alertsByType).map(([type, count]) => (
              count > 0 && (
                <div 
                  key={type} 
                  className="bg-background-light p-2 rounded flex items-center"
                >
                  {alertIcons[type as keyof typeof alertIcons]}
                  <span className="text-sm">
                    {count} {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </div>
              )
            ))}
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Social Activity</h2>
            <a href="/social" className="text-sm text-primary-400 hover:text-primary-300">View All</a>
          </div>
          
          <ActivityFeed posts={mockSocialPosts.slice(0, 4)} />
        </Card>
      </div>
      
      <div className="mt-4">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Resource Distribution</h2>
            <a href="/resources" className="text-sm text-primary-400 hover:text-primary-300">View All</a>
          </div>
          
          <ResourcesOverview resources={mockResourceData} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;