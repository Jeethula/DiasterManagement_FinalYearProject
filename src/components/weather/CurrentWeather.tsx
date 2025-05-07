import { WeatherData } from '../../services/weatherApi';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  CloudLightning, 
  CloudDrizzle,
  Wind,
  Droplets,
  Thermometer
} from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return <Sun size={48} className="text-warning-500" />;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Cloud size={48} className="text-gray-400" />;
      case '09d':
      case '09n':
        return <CloudDrizzle size={48} className="text-info-500" />;
      case '10d':
      case '10n':
        return <CloudRain size={48} className="text-info-500" />;
      case '11d':
      case '11n':
        return <CloudLightning size={48} className="text-warning-500" />;
      case '13d':
      case '13n':
        return <CloudSnow size={48} className="text-info-500" />;
      default:
        return <Cloud size={48} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-background-medium p-6 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-400">{data.sys.country}</p>
        </div>
        {data.weather[0] && getWeatherIcon(data.weather[0].icon)}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Thermometer size={24} className="text-emergency-500 mr-2" />
          <div>
            <div className="text-2xl font-bold">{Math.round(data.main.temp)}°F</div>
            <div className="text-sm text-gray-400">Feels like {Math.round(data.main.feels_like)}°F</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <Droplets size={24} className="text-info-500 mr-2" />
          <div>
            <div className="text-2xl font-bold">{data.main.humidity}%</div>
            <div className="text-sm text-gray-400">Humidity</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <Wind size={24} className="text-primary-500 mr-2" />
          <div>
            <div className="text-2xl font-bold">{Math.round(data.wind.speed)} mph</div>
            <div className="text-sm text-gray-400">Wind Speed</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <Cloud size={24} className="text-gray-400 mr-2" />
          <div>
            <div className="text-2xl font-bold capitalize">
              {data.weather[0]?.description || 'Clear'}
            </div>
            <div className="text-sm text-gray-400">Conditions</div>
          </div>
        </div>
      </div>
      
      {data.alerts && data.alerts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Weather Alerts</h3>
          <div className="space-y-2">
            {data.alerts.map((alert, index) => (
              <div key={index} className="bg-emergency-900 border border-emergency-500 p-3 rounded">
                <div className="font-semibold">{alert.event}</div>
                <div className="text-sm mt-1">{alert.description}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Until {new Date(alert.end * 1000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;