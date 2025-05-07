import { ResourceData } from '../../data/mockResourceData';
import { Package, Droplets, PieChart, UtensilsCrossed, PlusSquare, Truck } from 'lucide-react';

interface ResourcesOverviewProps {
  resources: ResourceData[];
}

const ResourcesOverview = ({ resources }: ResourcesOverviewProps) => {
  // Group resources by type
  const resourcesByType = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = {
        available: 0,
        allocated: 0,
        required: 0,
        count: 0
      };
    }
    
    acc[resource.type].available += resource.available;
    acc[resource.type].allocated += resource.allocated;
    acc[resource.type].required += resource.required;
    acc[resource.type].count += 1;
    
    return acc;
  }, {} as Record<string, { available: number, allocated: number, required: number, count: number }>);
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets size={24} className="text-info-500" />;
      case 'food':
        return <UtensilsCrossed size={24} className="text-warning-500" />;
      case 'medical':
        return <PlusSquare size={24} className="text-emergency-500" />;
      case 'shelter':
        return <PieChart size={24} className="text-primary-500" />;
      case 'transport':
        return <Truck size={24} className="text-secondary-500" />;
      default:
        return <Package size={24} className="text-gray-400" />;
    }
  };
  
  const getResourceName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  const calculatePercentage = (allocated: number, required: number) => {
    return Math.round((allocated / required) * 100);
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage < 40) return 'bg-emergency-500';
    if (percentage < 70) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(resourcesByType).map(([type, data]) => {
        const percentage = calculatePercentage(data.allocated, data.required);
        
        return (
          <div 
            key={type}
            className="bg-background-light p-4 rounded flex items-start"
          >
            <div className="mr-3 mt-1">
              {getResourceIcon(type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">{getResourceName(type)}</h3>
                <span className="text-sm text-gray-400">{data.count} types</span>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Distribution: {data.allocated.toLocaleString()} / {data.required.toLocaleString()}</span>
                  <span>{percentage}%</span>
                </div>
                
                <div className="w-full bg-background-dark rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <div className="mt-2 text-xs text-gray-400">
                  Available: {data.available.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResourcesOverview;