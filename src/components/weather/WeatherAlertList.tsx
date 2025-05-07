import { WeatherAlert } from '../../data/mockWeatherData';
import AlertBadge from '../common/AlertBadge';
import { 
  AlertTriangle, 
  Droplets, 
  Wind, 
  Flame, 
  CloudSnow, 
  Thermometer, 
  CloudLightning,
  Calendar,
  MapPin
} from 'lucide-react';

interface WeatherAlertListProps {
  alerts: WeatherAlert[];
}

const WeatherAlertList = ({ alerts }: WeatherAlertListProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'hurricane':
        return <Wind size={24} className="text-info-500" />;
      case 'flood':
        return <Droplets size={24} className="text-info-500" />;
      case 'tornado':
        return <Wind size={24} className="text-emergency-500" />;
      case 'wildfire':
        return <Flame size={24} className="text-emergency-500" />;
      case 'winter':
        return <CloudSnow size={24} className="text-info-500" />;
      case 'heatwave':
        return <Thermometer size={24} className="text-warning-500" />;
      case 'thunderstorm':
        return <CloudLightning size={24} className="text-warning-500" />;
      default:
        return <AlertTriangle size={24} className="text-warning-500" />;
    }
  };
  
  const getSeverityBadgeType = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'urgent';
      case 'severe':
        return 'warning';
      case 'moderate':
        return 'warning';
      case 'minor':
        return 'info';
      default:
        return 'info';
    }
  };
  
  // Helper to format the date
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

  if (alerts.length === 0) {
    return <div className="text-center py-8 text-gray-400">No alerts found for the selected filters.</div>;
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="bg-background-light p-4 rounded-md animate-fade-in">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              {getAlertIcon(alert.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{alert.title}</h3>
                <AlertBadge 
                  type={getSeverityBadgeType(alert.severity)} 
                  label={alert.severity.toUpperCase()}
                  animated={alert.severity === 'extreme'}
                />
              </div>
              
              <p className="text-sm mt-1 text-gray-300">{alert.description}</p>
              
              <div className="flex flex-wrap items-center mt-3 text-xs text-gray-400">
                <div className="flex items-center mr-4 mb-2">
                  <MapPin size={12} className="mr-1" />
                  {alert.region}
                </div>
                
                <div className="flex items-center mr-4 mb-2">
                  <Calendar size={12} className="mr-1" />
                  {formatDate(alert.startTime)} - {formatDate(alert.endTime)}
                </div>
                
                <div className="flex-1 mb-2 text-right">
                  <span className="text-primary-400">{alert.issuedBy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlertList;