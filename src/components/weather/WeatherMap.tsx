import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from 'react-leaflet';
import { WeatherAlert } from '../../data/mockWeatherData';
import { 
  Droplets, 
  Wind, 
  Flame, 
  CloudSnow, 
  Thermometer, 
  CloudLightning
} from 'lucide-react';

interface WeatherMapProps {
  alerts: WeatherAlert[];
}

const WeatherMap = ({ alerts }: WeatherMapProps) => {
  const getAlertColor = (severity: string) => {
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
  
  const getAlertRadius = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 25;
      case 'severe':
        return 20;
      case 'moderate':
        return 15;
      case 'minor':
        return 10;
      default:
        return 10;
    }
  };
  
  const getAlertIcon = (type: string) => {
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
        return null;
    }
  };
  
  // Format the date for the popup
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
      
      {alerts.map((alert) => (
        <CircleMarker
          key={alert.id}
          center={[alert.coordinates[0], alert.coordinates[1]]}
          radius={getAlertRadius(alert.severity)}
          pathOptions={{ 
            fillColor: getAlertColor(alert.severity),
            color: getAlertColor(alert.severity),
            fillOpacity: 0.5,
            weight: 2,
          }}
        >
          <Tooltip>
            <div>
              <p className="font-bold">{alert.title}</p>
              <p>{alert.region}</p>
              <p className="text-xs">{alert.severity.toUpperCase()}</p>
            </div>
          </Tooltip>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{alert.title}</h3>
              <p className="text-sm my-2">{alert.description}</p>
              <div className="text-xs">
                <p><strong>Region:</strong> {alert.region}</p>
                <p><strong>Type:</strong> {alert.type}</p>
                <p><strong>Severity:</strong> {alert.severity}</p>
                <p><strong>Time Period:</strong> {formatDate(alert.startTime)} - {formatDate(alert.endTime)}</p>
                <p className="mt-2"><strong>Issued By:</strong> {alert.issuedBy}</p>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default WeatherMap;