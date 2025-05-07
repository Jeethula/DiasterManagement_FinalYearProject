import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import AlertBadge from '../components/common/AlertBadge';
import WeatherAlertList from '../components/weather/WeatherAlertList';
import WeatherForecastChart from '../components/weather/WeatherForecastChart';
import WeatherMap from '../components/weather/WeatherMap';
import LocationSearch from '../components/weather/LocationSearch';
import CurrentWeather from '../components/weather/CurrentWeather';
import PredictionModel from '../components/weather/PredictionModel';
import { mockWeatherAlerts, mockWeatherForecasts } from '../data/mockWeatherData';
import { getWeatherByCoordinates, WeatherData } from '../services/weatherApi';
import { 
  analyzePrecipitationRisk, 
  analyzeWindRisk, 
  analyzeTemperatureRisk,
  getOverallRisk 
} from '../utils/prediction-algorithm';

const WeatherPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const filteredAlerts = selectedRegion
    ? mockWeatherAlerts.filter(alert => alert.region === selectedRegion)
    : mockWeatherAlerts;
  
  const regions = [...new Set(mockWeatherAlerts.map(alert => alert.region))];
  
  const handleLocationSelect = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCoordinates(lat, lon);
      setCurrentWeather(data);
      
      // Auto-select region if it matches
      const matchingRegion = regions.find(region => 
        region.toLowerCase().includes(data.name.toLowerCase())
      );
      if (matchingRegion) {
        setSelectedRegion(matchingRegion);
      }
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate risk predictions when weather data changes
  const predictions = currentWeather ? [
    analyzePrecipitationRisk(Math.random() * 100), // Mock precipitation data
    analyzeWindRisk(currentWeather.wind.speed),
    analyzeTemperatureRisk(
      currentWeather.main.temp,
      currentWeather.main.temp - (Math.random() * 10 - 5) // Mock average temp
    )
  ] : [];
  
  const overallRisk = predictions.length > 0 ? getOverallRisk(predictions) : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Weather Alerts</h1>
        <p className="text-gray-400">Monitor severe weather events and forecasts across affected regions</p>
      </div>
      
      <Card className="mb-6">
        <h2 className="card-title">Location Search</h2>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </Card>
      
      {error && (
        <div className="bg-emergency-900 text-white p-4 rounded mb-6">
          {error}
        </div>
      )}
      
      {currentWeather && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <h2 className="card-title">Current Conditions</h2>
            <CurrentWeather data={currentWeather} />
          </Card>
          
          <Card>
            <h2 className="card-title">Risk Assessment</h2>
            {overallRisk && (
              <div className="mb-4">
                <AlertBadge 
                  type={overallRisk.risk === 'High' ? 'urgent' : 
                        overallRisk.risk === 'Moderate' ? 'warning' : 'info'}
                  label={`${overallRisk.risk} Risk: ${overallRisk.type}`}
                  animated={overallRisk.risk === 'High'}
                />
                <p className="mt-2 text-sm">{overallRisk.message}</p>
                <p className="mt-1 text-sm text-primary-400">{overallRisk.recommendation}</p>
              </div>
            )}
            <PredictionModel weatherData={currentWeather} />
          </Card>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedRegion(null)}
          className={`px-3 py-1 text-sm rounded ${
            selectedRegion === null ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
          }`}
        >
          All Regions
        </button>
        
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-3 py-1 text-sm rounded ${
              selectedRegion === region ? 'bg-primary-600 text-white' : 'bg-background-medium text-gray-300'
            }`}
          >
            {region}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <h2 className="card-title">Alert Map</h2>
          <div className="h-[400px]">
            <WeatherMap alerts={filteredAlerts} />
          </div>
        </Card>
        
        <Card>
          <h2 className="card-title">Alert Summary</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">By Severity</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-background-light p-3 rounded">
                  <div className="text-2xl font-bold text-emergency-500">
                    {mockWeatherAlerts.filter(a => a.severity === 'extreme').length}
                  </div>
                  <div className="text-xs text-gray-400">Extreme</div>
                </div>
                
                <div className="bg-background-light p-3 rounded">
                  <div className="text-2xl font-bold text-warning-500">
                    {mockWeatherAlerts.filter(a => a.severity === 'severe').length}
                  </div>
                  <div className="text-xs text-gray-400">Severe</div>
                </div>
                
                <div className="bg-background-light p-3 rounded">
                  <div className="text-2xl font-bold text-info-500">
                    {mockWeatherAlerts.filter(a => a.severity === 'moderate').length}
                  </div>
                  <div className="text-xs text-gray-400">Moderate</div>
                </div>
                
                <div className="bg-background-light p-3 rounded">
                  <div className="text-2xl font-bold text-gray-400">
                    {mockWeatherAlerts.filter(a => a.severity === 'minor').length}
                  </div>
                  <div className="text-xs text-gray-400">Minor</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">By Type</h3>
              <div className="flex flex-wrap gap-2">
                {['hurricane', 'flood', 'tornado', 'wildfire', 'winter', 'heatwave', 'thunderstorm'].map(type => {
                  const count = mockWeatherAlerts.filter(a => a.type === type).length;
                  if (count === 0) return null;
                  
                  return (
                    <AlertBadge
                      key={type}
                      type={type === 'hurricane' || type === 'tornado' || type === 'wildfire' ? 'urgent' : 
                            type === 'flood' || type === 'winter' ? 'warning' : 'info'}
                      label={`${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Card>
          <h2 className="card-title">48-Hour Forecast</h2>
          <WeatherForecastChart forecasts={mockWeatherForecasts} />
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <h2 className="card-title">Active Weather Alerts</h2>
          <WeatherAlertList alerts={filteredAlerts} />
        </Card>
      </div>
    </div>
  );
};

export default WeatherPage;