import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { WeatherAlert } from '../../data/mockWeatherData';

interface MiniMapProps {
  alerts: WeatherAlert[];
}

const MiniMap = ({ alerts }: MiniMapProps) => {
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
        return 20;
      case 'severe':
        return 15;
      case 'moderate':
        return 10;
      case 'minor':
        return 8;
      default:
        return 8;
    }
  };

  return (
    <MapContainer 
      center={[39.8283, -98.5795]} // Approximate center of the US
      zoom={4} 
      attributionControl={false}
      zoomControl={false}
      dragging={true}
      scrollWheelZoom={false}
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
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MiniMap;