import { useState } from 'react';
import { ResourceData } from '../../data/mockResourceData';
import { ArrowUpDown, MoreHorizontal, Edit, Trash } from 'lucide-react';

interface ResourcesTableProps {
  resources: ResourceData[];
}

const ResourcesTable = ({ resources }: ResourcesTableProps) => {
  const [sortField, setSortField] = useState<keyof ResourceData>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const handleSort = (field: keyof ResourceData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedResources = [...resources].sort((a, b) => {
    let comparison = 0;
    
    if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
      comparison = (a[sortField] as string).localeCompare(b[sortField] as string);
    } else {
      comparison = (a[sortField] as number) - (b[sortField] as number);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-emergency-500';
      case 'medium':
        return 'text-warning-500';
      case 'low':
        return 'text-info-500';
      default:
        return 'text-gray-400';
    }
  };
  
  const getProgressClass = (allocated: number, required: number) => {
    const percentage = Math.round((allocated / required) * 100);
    
    if (percentage < 40) return 'bg-emergency-500';
    if (percentage < 70) return 'bg-warning-500';
    return 'bg-success-500';
  };
  
  if (resources.length === 0) {
    return (
      <div className="bg-background-light rounded-md p-6 text-center text-gray-400">
        No resources found matching your filter criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-background-light">
          <tr>
            <th className="text-left py-3 px-4">
              <button 
                className="flex items-center"
                onClick={() => handleSort('name')}
              >
                Resource
                {sortField === 'name' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
            </th>
            <th className="text-left py-3 px-4">
              <button 
                className="flex items-center"
                onClick={() => handleSort('type')}
              >
                Type
                {sortField === 'type' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
            </th>
            <th className="text-left py-3 px-4">
              <button 
                className="flex items-center"
                onClick={() => handleSort('available')}
              >
                Available
                {sortField === 'available' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
            </th>
            <th className="text-left py-3 px-4">
              <button 
                className="flex items-center"
                onClick={() => handleSort('allocated')}
              >
                Distribution
                {sortField === 'allocated' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
            </th>
            <th className="text-left py-3 px-4">
              <button 
                className="flex items-center"
                onClick={() => handleSort('priority')}
              >
                Priority
                {sortField === 'priority' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
            </th>
            <th className="text-left py-3 px-4">Location</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-background-light">
          {sortedResources.map((resource) => {
            const allocationPercentage = Math.round((resource.allocated / resource.required) * 100);
            
            return (
              <tr key={resource.id} className="hover:bg-background-light/50">
                <td className="py-3 px-4 font-medium">{resource.name}</td>
                <td className="py-3 px-4">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</td>
                <td className="py-3 px-4">
                  {resource.available.toLocaleString()} {resource.unit}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-32 bg-background-dark rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressClass(resource.allocated, resource.required)}`}
                        style={{ width: `${allocationPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">
                      {resource.allocated.toLocaleString()}/{resource.required.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className={`py-3 px-4 ${getPriorityClass(resource.priority)}`}>
                  {resource.priority.charAt(0).toUpperCase() + resource.priority.slice(1)}
                </td>
                <td className="py-3 px-4">{resource.location}</td>
                <td className="py-3 px-4 text-right">
                  <div className="relative inline-block">
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={() => setActiveDropdown(activeDropdown === resource.id ? null : resource.id)}
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    
                    {activeDropdown === resource.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-background-medium rounded-md shadow-lg z-10 animate-fade-in">
                        <button 
                          className="flex items-center w-full text-left px-4 py-2 hover:bg-background-light text-sm"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Edit size={14} className="mr-2" />
                          Edit Resource
                        </button>
                        <button 
                          className="flex items-center w-full text-left px-4 py-2 hover:bg-background-light text-sm text-emergency-500"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Trash size={14} className="mr-2" />
                          Delete Resource
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesTable;