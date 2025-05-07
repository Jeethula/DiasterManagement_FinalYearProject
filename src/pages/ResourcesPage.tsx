import { useState } from 'react';
import Card from '../components/common/Card';
import { mockResourceData, resourceAllocationByRegion } from '../data/mockResourceData';
import AlertBadge from '../components/common/AlertBadge';
import { Filter, Search, ArrowUpDown, Package, Truck } from 'lucide-react';
import ResourcesTable from '../components/resources/ResourcesTable';
import ResourceAllocationChart from '../components/resources/ResourceAllocationChart';
import ResourceDistributionMap from '../components/resources/ResourceDistributionMap';

const ResourcesPage = () => {
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate resource stats
  const totalAvailable = mockResourceData.reduce((sum, resource) => sum + resource.available, 0);
  const totalAllocated = mockResourceData.reduce((sum, resource) => sum + resource.allocated, 0);
  const totalRequired = mockResourceData.reduce((sum, resource) => sum + resource.required, 0);
  const allocationPercentage = Math.round((totalAllocated / totalRequired) * 100);
  
  // Get unique resource types and locations
  const resourceTypes = [...new Set(mockResourceData.map(resource => resource.type))];
  const locations = [...new Set(mockResourceData.map(resource => resource.location))];
  
  // Filter resources based on selected filters and search query
  const filteredResources = mockResourceData.filter(resource => {
    const matchesType = filterType ? resource.type === filterType : true;
    const matchesPriority = filterPriority ? resource.priority === filterPriority : true;
    const matchesLocation = filterLocation ? resource.location === filterLocation : true;
    const matchesSearch = searchQuery ? 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    
    return matchesType && matchesPriority && matchesLocation && matchesSearch;
  });
  
  // Count high priority resources
  const highPriorityCount = mockResourceData.filter(r => r.priority === 'high').length;
  const criticalShortageCount = mockResourceData.filter(r => 
    (r.allocated / r.required) < 0.5 && r.priority === 'high'
  ).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Resource Management</h1>
        <p className="text-gray-400">Track and manage resource allocation across disaster-affected regions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card className="flex items-center">
          <div className="bg-background-light p-3 rounded-full mr-4">
            <Package size={24} className="text-primary-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Resources</p>
            <p className="text-2xl font-bold">{totalAvailable.toLocaleString()}</p>
            <div className="text-xs text-gray-400 mt-1">
              {mockResourceData.length} different resource types
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="bg-background-light p-3 rounded-full mr-4">
            <Truck size={24} className="text-warning-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Allocation Progress</p>
            <p className="text-2xl font-bold">{allocationPercentage}%</p>
            <div className="w-full bg-background-light rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${
                  allocationPercentage < 50 ? 'bg-emergency-500' : 
                  allocationPercentage < 80 ? 'bg-warning-500' : 
                  'bg-success-500'
                }`}
                style={{ width: `${allocationPercentage}%` }}
              ></div>
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="bg-background-light p-3 rounded-full mr-4">
            <Filter size={24} className="text-emergency-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">High Priority Items</p>
            <p className="text-2xl font-bold">{highPriorityCount}</p>
            <div className="flex mt-1">
              <AlertBadge 
                type="urgent" 
                label={`${criticalShortageCount} Critical Shortage`} 
                animated={criticalShortageCount > 0}
              />
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="bg-background-light p-3 rounded-full mr-4">
            <Truck size={24} className="text-success-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Distribution Efficiency</p>
            <p className="text-2xl font-bold">78%</p>
            <div className="text-xs text-gray-400 mt-1">
              Last updated: 15 minutes ago
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Resource Inventory</h2>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background-light text-white rounded-md py-1 px-3 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 w-48"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center mr-1 text-xs text-gray-400">
              <Filter size={14} className="mr-1" />
              Resource Type:
            </div>
            
            <button
              onClick={() => setFilterType(null)}
              className={`px-3 py-1 text-xs rounded ${
                filterType === null ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
              }`}
            >
              All Types
            </button>
            
            {resourceTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs rounded ${
                  filterType === type ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center mr-1 text-xs text-gray-400">
              <Filter size={14} className="mr-1" />
              Priority:
            </div>
            
            <button
              onClick={() => setFilterPriority(null)}
              className={`px-3 py-1 text-xs rounded ${
                filterPriority === null ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
              }`}
            >
              All Priority
            </button>
            
            <button
              onClick={() => setFilterPriority('high')}
              className={`px-3 py-1 text-xs rounded ${
                filterPriority === 'high' ? 'bg-emergency-600 text-white' : 'bg-background-medium text-gray-300'
              }`}
            >
              High
            </button>
            
            <button
              onClick={() => setFilterPriority('medium')}
              className={`px-3 py-1 text-xs rounded ${
                filterPriority === 'medium' ? 'bg-warning-600 text-white' : 'bg-background-medium text-gray-300'
              }`}
            >
              Medium
            </button>
            
            <button
              onClick={() => setFilterPriority('low')}
              className={`px-3 py-1 text-xs rounded ${
                filterPriority === 'low' ? 'bg-info-600 text-white' : 'bg-background-medium text-gray-300'
              }`}
            >
              Low
            </button>
          </div>
          
          <ResourcesTable resources={filteredResources} />
        </Card>
        
        <Card>
          <h2 className="card-title">Regional Allocation</h2>
          <div className="h-80">
            <ResourceAllocationChart data={resourceAllocationByRegion} />
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <h2 className="card-title">Resource Distribution Map</h2>
          <div className="h-96">
            <ResourceDistributionMap resources={mockResourceData} />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs text-center">
            <div className="bg-background-light p-2 rounded">
              <div className="font-semibold text-info-500 mb-1">Water</div>
              <div>{mockResourceData.filter(r => r.type === 'water').length} resources</div>
            </div>
            <div className="bg-background-light p-2 rounded">
              <div className="font-semibold text-warning-500 mb-1">Food</div>
              <div>{mockResourceData.filter(r => r.type === 'food').length} resources</div>
            </div>
            <div className="bg-background-light p-2 rounded">
              <div className="font-semibold text-emergency-500 mb-1">Medical</div>
              <div>{mockResourceData.filter(r => r.type === 'medical').length} resources</div>
            </div>
            <div className="bg-background-light p-2 rounded">
              <div className="font-semibold text-primary-500 mb-1">Shelter</div>
              <div>{mockResourceData.filter(r => r.type === 'shelter').length} resources</div>
            </div>
            <div className="bg-background-light p-2 rounded">
              <div className="font-semibold text-success-500 mb-1">Power</div>
              <div>{mockResourceData.filter(r => r.type === 'power').length} resources</div>
            </div>
            <div className="bg-background-light p-2 rounded">
              <div className="font-semibold text-secondary-500 mb-1">Transport</div>
              <div>{mockResourceData.filter(r => r.type === 'transport').length} resources</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesPage;