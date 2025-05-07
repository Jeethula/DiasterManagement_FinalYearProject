import { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import { mockSocialPosts } from '../data/mockSocialPosts';
import { MessageSquare, MapPin, ArrowUpDown, Filter } from 'lucide-react';
import AlertBadge from '../components/common/AlertBadge';
import SocialFeed from '../components/social/SocialFeed';
import SocialSentimentChart from '../components/social/SocialSentimentChart';
import SocialNeedsChart from '../components/social/SocialNeedsChart';

const SocialPage = () => {
  const [filterUrgency, setFilterUrgency] = useState<string | null>(null);
  const [filterNeedType, setFilterNeedType] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'trending'>('latest');
  
  const locations = useMemo(() => {
    return [...new Set(mockSocialPosts.map(post => post.location))];
  }, []);
  
  const needTypes = useMemo(() => {
    return [...new Set(mockSocialPosts.map(post => post.needType))];
  }, []);
  
  const filteredPosts = useMemo(() => {
    let posts = [...mockSocialPosts];
    
    if (filterUrgency) {
      posts = posts.filter(post => post.urgency === filterUrgency);
    }
    
    if (filterNeedType) {
      posts = posts.filter(post => post.needType === filterNeedType);
    }
    
    if (filterLocation) {
      posts = posts.filter(post => post.location === filterLocation);
    }
    
    // Sort posts
    if (sortBy === 'latest') {
      // Sort by timestamp (most recent first)
      posts.sort((a, b) => {
        const timeA = a.timestamp.includes('min') ? parseInt(a.timestamp) : 
                    a.timestamp.includes('hour') ? parseInt(a.timestamp) * 60 : 1000;
        const timeB = b.timestamp.includes('min') ? parseInt(b.timestamp) : 
                    b.timestamp.includes('hour') ? parseInt(b.timestamp) * 60 : 1000;
        return timeA - timeB;
      });
    } else if (sortBy === 'trending') {
      // Sort by engagement (likes + retweets)
      posts.sort((a, b) => (b.likes + b.retweets) - (a.likes + a.retweets));
    }
    
    return posts;
  }, [filterUrgency, filterNeedType, filterLocation, sortBy]);
  
  const urgentCount = useMemo(() => 
    mockSocialPosts.filter(post => post.urgency === 'urgent').length, []);
  
  const warningCount = useMemo(() => 
    mockSocialPosts.filter(post => post.urgency === 'warning').length, []);
  
  const infoCount = useMemo(() => 
    mockSocialPosts.filter(post => post.urgency === 'info').length, []);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Social Media Monitoring</h1>
        <p className="text-gray-400">Track disaster-related social media activity across affected regions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="flex items-center">
          <div className="bg-emergency-900 p-3 rounded-full mr-4">
            <MessageSquare size={24} className="text-emergency-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Posts</p>
            <p className="text-2xl font-bold">{mockSocialPosts.length}</p>
            <div className="flex mt-1">
              <AlertBadge type="urgent" label={`${urgentCount} Urgent`} className="mr-2" />
              <AlertBadge type="warning" label={`${warningCount} Warning`} className="mr-2" />
              <AlertBadge type="info" label={`${infoCount} Info`} />
            </div>
          </div>
        </Card>
        
        <Card className="col-span-2">
          <h2 className="card-title">Sentiment Analysis</h2>
          <div className="h-32">
            <SocialSentimentChart posts={mockSocialPosts} />
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Social Media Feed</h2>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSortBy('latest')}
                  className={`flex items-center px-3 py-1 text-sm rounded ${
                    sortBy === 'latest' ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                  }`}
                >
                  <ArrowUpDown size={14} className="mr-1" />
                  Latest
                </button>
                <button
                  onClick={() => setSortBy('trending')}
                  className={`flex items-center px-3 py-1 text-sm rounded ${
                    sortBy === 'trending' ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                  }`}
                >
                  <ArrowUpDown size={14} className="mr-1" />
                  Trending
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center mr-1 text-xs text-gray-400">
                <Filter size={14} className="mr-1" />
                Filters:
              </div>
              
              <button
                onClick={() => setFilterUrgency(null)}
                className={`px-3 py-1 text-xs rounded ${
                  filterUrgency === null ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                }`}
              >
                All Urgency
              </button>
              <button
                onClick={() => setFilterUrgency('urgent')}
                className={`px-3 py-1 text-xs rounded ${
                  filterUrgency === 'urgent' ? 'bg-emergency-600 text-white' : 'bg-background-medium text-gray-300'
                }`}
              >
                Urgent
              </button>
              <button
                onClick={() => setFilterUrgency('warning')}
                className={`px-3 py-1 text-xs rounded ${
                  filterUrgency === 'warning' ? 'bg-warning-600 text-white' : 'bg-background-medium text-gray-300'
                }`}
              >
                Warning
              </button>
              <button
                onClick={() => setFilterUrgency('info')}
                className={`px-3 py-1 text-xs rounded ${
                  filterUrgency === 'info' ? 'bg-info-600 text-white' : 'bg-background-medium text-gray-300'
                }`}
              >
                Info
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center mr-1 text-xs text-gray-400">
                <MapPin size={14} className="mr-1" />
                Location:
              </div>
              
              <button
                onClick={() => setFilterLocation(null)}
                className={`px-3 py-1 text-xs rounded ${
                  filterLocation === null ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                }`}
              >
                All Locations
              </button>
              
              {locations.slice(0, 4).map(location => (
                <button
                  key={location}
                  onClick={() => setFilterLocation(location)}
                  className={`px-3 py-1 text-xs rounded ${
                    filterLocation === location ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                  }`}
                >
                  {location}
                </button>
              ))}
              
              {locations.length > 4 && (
                <select 
                  className="bg-background-medium text-gray-300 text-xs rounded px-2 py-1 border border-background-light focus:outline-none focus:ring-1 focus:ring-primary-500"
                  onChange={(e) => setFilterLocation(e.target.value || null)}
                  value={filterLocation || ''}
                >
                  <option value="">More locations...</option>
                  {locations.slice(4).map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center mr-1 text-xs text-gray-400">
                <Filter size={14} className="mr-1" />
                Need Type:
              </div>
              
              <button
                onClick={() => setFilterNeedType(null)}
                className={`px-3 py-1 text-xs rounded ${
                  filterNeedType === null ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                }`}
              >
                All Needs
              </button>
              
              {needTypes.map(needType => (
                <button
                  key={needType}
                  onClick={() => setFilterNeedType(needType)}
                  className={`px-3 py-1 text-xs rounded ${
                    filterNeedType === needType ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
                  }`}
                >
                  #{needType.charAt(0).toUpperCase() + needType.slice(1)}
                </button>
              ))}
            </div>
            
            <SocialFeed posts={filteredPosts} />
          </Card>
        </div>
        
        <div>
          <Card className="mb-4">
            <h2 className="card-title">Needs Breakdown</h2>
            <div className="h-60">
              <SocialNeedsChart posts={mockSocialPosts} />
            </div>
          </Card>
          
          <Card>
            <h2 className="card-title">Trending Hashtags</h2>
            <div className="space-y-3 mt-2">
              <div className="bg-background-light p-3 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium text-primary-400">#HoustonFloods</span>
                  <span className="text-sm text-gray-400">342 mentions</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2 mt-2">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="bg-background-light p-3 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium text-primary-400">#WaterNeed</span>
                  <span className="text-sm text-gray-400">267 mentions</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2 mt-2">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div className="bg-background-light p-3 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium text-primary-400">#MiamiHurricane</span>
                  <span className="text-sm text-gray-400">224 mentions</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2 mt-2">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: '55%' }}></div>
                </div>
              </div>
              
              <div className="bg-background-light p-3 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium text-primary-400">#RescueNeeded</span>
                  <span className="text-sm text-gray-400">198 mentions</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2 mt-2">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="bg-background-light p-3 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium text-primary-400">#PowerOutage</span>
                  <span className="text-sm text-gray-400">156 mentions</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2 mt-2">
                  <div className="h-2 rounded-full bg-primary-500" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;