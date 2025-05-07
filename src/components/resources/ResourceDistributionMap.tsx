import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { ResourceData } from '../../data/mockResourceData';
import { 
  Droplets, 
  UtensilsCrossed, 
  PlusSquare, 
  PieChart, 
  Zap, 
  Truck
} from 'lucide-react';

interface ResourceDistributionMapProps {
  resources: ResourceData[];
}

const ResourceDistributionMap = ({ resources }: ResourceDistributionMapProps) => {
  // Group resources by location
  const resourcesByLocation = resources.reduce((acc, resource) => {
    const locationKey = `${resource.coordinates[0]},${resource.coordinates[1]}`;
    
    if (!acc[locationKey]) {
      acc[locationKey] = {
        location: resource.location,
        coordinates: resource.coordinates,
        resources: [],
      };
    }
    
    acc[locationKey].resources.push(resource);
    
    return acc;
  }, {} as Record<string, { location: string, coordinates: [number, number], resources: ResourceData[] }>);
  
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets size={16} className="text-info-500" />;
      case 'food':
        return <UtensilsCrossed size={16} className="text-warning-500" />;
      case 'medical':
        return <PlusSquare size={16} className="text-emergency-500" />;
      case 'shelter':
        return <PieChart size={16} className="text-primary-500" />;
      case 'power':
        return <Zap size={16} className="text-success-500" />;
      case 'transport':
        return <Truck size={16} className="text-secondary-500" />;
      default:
        return null;
    }
  };
  
  const getMarkerColor = (resources: ResourceData[]) => {
    // Check if any high priority resources
    const hasHighPriority = resources.some(r => r.priority === 'high');
    if (hasHighPriority) return '#ff0000';
    
    // Check if any medium priority resources
    const hasMediumPriority = resources.some(r => r.priority === 'medium');
    if (hasMediumPriority) return '#ffd700';
    
    return '#0066ff';
  };
  
  const getMarkerRadius = (resources: ResourceData[]) => {
    return Math.min(15 + resources.length * 2, 30);
  };
  
  const calculateSupplyPercentage = (resources: ResourceData[]) => {
    const totalRequired = resources.reduce((sum, r) => sum + r.required, 0);
    const totalAllocated = resources.reduce((sum, r) => sum + r.allocated, 0);
    
    return Math.round((totalAllocated / totalRequired) * 100);
  };

  return (
    <MapContainer 
      center={[39.8283, -98.5795]} // Approximate center of the US
      zoom={4} 
      zoomControl={true}
      dragging={true}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {Object.values(resourcesByLocation).map((locationData) => (
        <CircleMarker
          key={`${locationData.coordinates[0]},${locationData.coordinates[1]}`}
          center={[locationData.coordinates[0], locationData.coordinates[1]]}
          radius={getMarkerRadius(locationData.resources)}
          pathOptions={{ 
            fillColor: getMarkerColor(locationData.resources),
            color: getMarkerColor(locationData.resources),
            fillOpacity: 0.5,
            weight: 2,
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{locationData.location}</h3>
              <p className="text-sm mb-2">{locationData.resources.length} resource types</p>
              
              <div className="text-xs mb-2">
                <div className="font-semibold">Supply Status: {calculateSupplyPercentage(locationData.resources)}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 my-1">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${calculateSupplyPercentage(locationData.resources)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-xs space-y-1">
                {locationData.resources.slice(0, 5).map((resource) => (
                  <div key={resource.id} className="flex items-center">
                    <span className="mr-1">{getResourceTypeIcon(resource.type)}</span>
                    <span className="font-medium">{resource.name}:</span>
                    <span className="ml-1">{resource.available.toLocaleString()} {resource.unit}</span>
                  </div>
                ))}
                {locationData.resources.length > 5 && (
                  <div className="text-blue-500">+{locationData.resources.length - 5} more resources</div>
                )}
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default ResourceDistributionMap;