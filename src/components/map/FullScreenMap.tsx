import { 
  MapContainer, 
  TileLayer, 
  CircleMarker, 
  Popup, 
  Tooltip,
  LayerGroup,
  Polygon
} from 'react-leaflet';
import { WeatherAlert } from '../../data/mockWeatherData';
import { SocialPost } from '../../data/mockSocialPosts';
import { ResourceData } from '../../data/mockResourceData';
import { 
  Droplets, 
  Wind, 
  Flame, 
  CloudSnow, 
  Thermometer, 
  CloudLightning,
  MessageSquare,
  Package,
  AlertTriangle
} from 'lucide-react';
import { LatLngExpression } from 'leaflet';

interface FullScreenMapProps {
  weatherAlerts: WeatherAlert[];
  socialPosts: SocialPost[];
  resources: ResourceData[];
  showEvacuationRoutes: boolean;
  showRiskZones: boolean;
}

// Mock evacuation routes (simplified for display)
const evacuationRoutes = [
  {
    id: '1',
    name: 'Houston North Evacuation Route',
    path: [
      [29.7604, -95.3698],
      [29.8604, -95.4698],
      [29.9604, -95.5698],
      [30.0604, -95.6698],
    ] as LatLngExpression[],
  },
  {
    id: '2',
    name: 'Miami Coastal Evacuation Route',
    path: [
      [25.7617, -80.1918],
      [25.8617, -80.2918],
      [25.9617, -80.3918],
      [26.0617, -80.4918],
    ] as LatLngExpression[],
  },
  {
    id: '3',
    name: 'New Orleans East Evacuation Route',
    path: [
      [29.9511, -90.0715],
      [30.0511, -89.9715],
      [30.1511, -89.8715],
      [30.2511, -89.7715],
    ] as LatLngExpression[],
  },
];

// Mock risk zones (simplified for display)
const riskZones = [
  {
    id: '1',
    name: 'Houston Flood Risk Zone',
    path: [
      [29.7604, -95.4698],
      [29.8604, -95.3698],
      [29.7604, -95.2698],
      [29.6604, -95.3698],
    ] as LatLngExpression[],
    level: 'high',
  },
  {
    id: '2',
    name: 'Miami Hurricane Impact Zone',
    path: [
      [25.7617, -80.2918],
      [25.8617, -80.1918],
      [25.7617, -80.0918],
      [25.6617, -80.1918],
    ] as LatLngExpression[],
    level: 'extreme',
  },
  {
    id: '3',
    name: 'Los Angeles Wildfire Risk Zone',
    path: [
      [34.0522, -118.3437],
      [34.1522, -118.2437],
      [34.0522, -118.1437],
      [33.9522, -118.2437],
    ] as LatLngExpression[],
    level: 'high',
  },
];

const FullScreenMap = ({ 
  weatherAlerts, 
  socialPosts, 
  resources, 
  showEvacuationRoutes,
  showRiskZones
}: FullScreenMapProps) => {
  
  const getWeatherAlertColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return '#ff0000';
      case 'severe':
        return '#ff8800';
      case 'moderate':
        return '#ffcc00';
      case 'minor':
        return '#0066ff';
      default:
        return '#0066ff';
    }
  };
  
  const getSocialPostColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return '#ff0000';
      case 'warning':
        return '#ffd700';
      case 'info':
        return '#0066ff';
      default:
        return '#0066ff';
    }
  };
  
  const getResourceColor = (type: string) => {
    switch (type) {
      case 'water':
        return '#0066ff';
      case 'food':
        return '#ffd700';
      case 'medical':
        return '#ff0000';
      case 'shelter':
        return '#0073ff';
      case 'power':
        return '#00ff00';
      case 'transport':
        return '#00c3ff';
      default:
        return '#888888';
    }
  };
  
  const getRiskZoneColor = (level: string) => {
    switch (level) {
      case 'extreme':
        return { color: '#ff0000', fillColor: 'rgba(255, 0, 0, 0.3)' };
      case 'high':
        return { color: '#ff8800', fillColor: 'rgba(255, 136, 0, 0.3)' };
      case 'moderate':
        return { color: '#ffd700', fillColor: 'rgba(255, 215, 0, 0.3)' };
      case 'low':
        return { color: '#0066ff', fillColor: 'rgba(0, 102, 255, 0.3)' };
      default:
        return { color: '#0066ff', fillColor: 'rgba(0, 102, 255, 0.3)' };
    }
  };
  
  const getWeatherAlertIcon = (type: string) => {
    switch (type) {
      case 'hurricane':
        return <Wind size={16} className="text-white" />;
      case 'flood':
        return <Droplets size={16} className="text-white" />;
      case 'tornado':
        return <Wind size={16} className="text-white" />;
      case 'wildfire':
        return <Flame size={16} className="text-white" />;
      case 'winter':
        return <CloudSnow size={16} className="text-white" />;
      case 'heatwave':
        return <Thermometer size={16} className="text-white" />;
      case 'thunderstorm':
        return <CloudLightning size={16} className="text-white" />;
      default:
        return <AlertTriangle size={16} className="text-white" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
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
      
      {/* Weather alerts layer */}
      <LayerGroup>
        {weatherAlerts.map((alert) => (
          <CircleMarker
            key={`weather-${alert.id}`}
            center={[alert.coordinates[0], alert.coordinates[1]]}
            radius={alert.severity === 'extreme' ? 25 : 
                   alert.severity === 'severe' ? 20 : 
                   alert.severity === 'moderate' ? 15 : 10}
            pathOptions={{ 
              fillColor: getWeatherAlertColor(alert.severity),
              color: getWeatherAlertColor(alert.severity),
              fillOpacity: 0.4,
              weight: 2,
            }}
          >
            <Tooltip>
              <div className="font-bold">{alert.title}</div>
              <div>{alert.region}</div>
              <div className="text-xs">{alert.severity.toUpperCase()}</div>
            </Tooltip>
            <Popup>
              <div className="p-2">
                <div className="flex items-center">
                  {getWeatherAlertIcon(alert.type)}
                  <h3 className="font-bold ml-1">{alert.title}</h3>
                </div>
                <p className="text-sm my-2">{alert.description}</p>
                <div className="text-xs">
                  <p><strong>Region:</strong> {alert.region}</p>
                  <p><strong>Severity:</strong> {alert.severity}</p>
                  <p><strong>Time Period:</strong> {formatDate(alert.startTime)} - {formatDate(alert.endTime)}</p>
                  <p><strong>Issued By:</strong> {alert.issuedBy}</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </LayerGroup>
      
      {/* Social posts layer */}
      <LayerGroup>
        {socialPosts.map((post) => (
          <CircleMarker
            key={`social-${post.id}`}
            center={[post.coordinates[0], post.coordinates[1]]}
            radius={post.urgency === 'urgent' ? 8 : 
                   post.urgency === 'warning' ? 6 : 4}
            pathOptions={{ 
              fillColor: getSocialPostColor(post.urgency),
              color: getSocialPostColor(post.urgency),
              fillOpacity: 0.8,
              weight: 1,
            }}
          >
            <Tooltip>
              <div className="font-bold">{post.username}</div>
              <div className="text-xs">{post.urgency.toUpperCase()} - #{post.needType}</div>
            </Tooltip>
            <Popup>
              <div className="p-2 max-w-xs">
                <div className="flex items-start">
                  <MessageSquare size={16} className="mt-1 mr-1 text-primary-500" />
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold text-sm">{post.username}</span>
                      {post.verified && (
                        <span className="ml-1 bg-primary-500 rounded-full w-4 h-4 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">@{post.handle} · {post.timestamp}</div>
                    <p className="text-sm mt-1">{post.content}</p>
                    <div className="mt-2 text-xs">
                      <span className="font-semibold">Need:</span> #{post.needType}
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </LayerGroup>
      
      {/* Resources layer */}
      <LayerGroup>
        {resources.map((resource) => (
          <CircleMarker
            key={`resource-${resource.id}`}
            center={[resource.coordinates[0], resource.coordinates[1]]}
            radius={resource.priority === 'high' ? 10 : 
                   resource.priority === 'medium' ? 8 : 6}
            pathOptions={{ 
              fillColor: getResourceColor(resource.type),
              color: getResourceColor(resource.type),
              fillOpacity: 0.6,
              weight: 1,
            }}
          >
            <Tooltip>
              <div className="font-bold">{resource.name}</div>
              <div className="text-xs">{resource.type.toUpperCase()} - {resource.location}</div>
            </Tooltip>
            <Popup>
              <div className="p-2">
                <div className="flex items-start">
                  <Package size={16} className="mt-1 mr-1 text-warning-500" />
                  <div>
                    <h3 className="font-bold">{resource.name}</h3>
                    <div className="text-xs text-gray-500">{resource.type} · {resource.priority} priority</div>
                    <div className="text-sm mt-1">
                      <div><strong>Available:</strong> {resource.available.toLocaleString()} {resource.unit}</div>
                      <div><strong>Allocated:</strong> {resource.allocated.toLocaleString()} / {resource.required.toLocaleString()}</div>
                      <div className="mt-1"><strong>Location:</strong> {resource.location}</div>
                      <div className="text-xs mt-1 text-gray-500">Last updated: {resource.lastUpdated}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </LayerGroup>
      
      {/* Evacuation routes layer */}
      {showEvacuationRoutes && (
        <LayerGroup>
          {evacuationRoutes.map((route) => (
            <Polygon
              key={`route-${route.id}`}
              positions={route.path}
              pathOptions={{
                color: '#00cc00',
                weight: 5,
                opacity: 0.7,
                dashArray: '10, 5',
              }}
            >
              <Tooltip>
                <div className="font-bold">{route.name}</div>
                <div className="text-xs">Evacuation Route</div>
              </Tooltip>
            </Polygon>
          ))}
        </LayerGroup>
      )}
      
      {/* Risk zones layer */}
      {showRiskZones && (
        <LayerGroup>
          {riskZones.map((zone) => {
            const zoneColors = getRiskZoneColor(zone.level);
            return (
              <Polygon
                key={`zone-${zone.id}`}
                positions={zone.path}
                pathOptions={{
                  color: zoneColors.color,
                  fillColor: zoneColors.fillColor,
                  weight: 2,
                  opacity: 0.8,
                  fillOpacity: 0.4,
                }}
              >
                <Tooltip>
                  <div className="font-bold">{zone.name}</div>
                  <div className="text-xs">{zone.level.toUpperCase()} Risk Level</div>
                </Tooltip>
                <Popup>
                  <div className="p-2">
                    <div className="flex items-start">
                      <AlertTriangle size={16} className="mt-1 mr-1 text-emergency-500" />
                      <div>
                        <h3 className="font-bold">{zone.name}</h3>
                        <div className="text-xs text-gray-500">Risk Level: {zone.level.toUpperCase()}</div>
                        <div className="text-sm mt-1">
                          <p>This area is currently under {zone.level} risk. Please follow local authority guidance.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
        </LayerGroup>
      )}
    </MapContainer>
  );
};

export default FullScreenMap;