import { useState } from 'react';
import { Search, MapPin, Compass } from 'lucide-react';
import { getWeatherByCity, getWeatherByCoordinates } from '../../services/weatherApi';

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [cityQuery, setCityQuery] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCitySearch = async () => {
    if (!cityQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await getWeatherByCity(cityQuery);
      onLocationSelect(weatherData.coord.lat, weatherData.coord.lon);
      
      // Save to recent searches
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      recentSearches.unshift({ 
        city: weatherData.name, 
        lat: weatherData.coord.lat, 
        lon: weatherData.coord.lon 
      });
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 5)));
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCoordinateSearch = async () => {
    const lat = parseFloat(coordinates.lat);
    const lon = parseFloat(coordinates.lon);
    
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError('Invalid coordinates. Please check your input.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await getWeatherByCoordinates(lat, lon);
      onLocationSelect(lat, lon);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          await getWeatherByCoordinates(latitude, longitude);
          onLocationSelect(latitude, longitude);
        } catch (err) {
          setError('Error fetching weather data. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to get your location. Please enable location services.');
        setLoading(false);
      }
    );
  };

  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city name..."
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
            className="w-full bg-background-light text-white rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <button
            onClick={handleCitySearch}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
          >
            Search
          </button>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Latitude"
              value={coordinates.lat}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
              className="w-full bg-background-light text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Longitude"
              value={coordinates.lon}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lon: e.target.value }))}
              className="w-full bg-background-light text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={handleCoordinateSearch}
            disabled={loading}
            className="px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
          >
            <MapPin size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          onClick={handleUseMyLocation}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-background-light text-white rounded hover:bg-background-medium disabled:opacity-50"
        >
          <Compass size={18} className="mr-2" />
          Use My Location
        </button>
        
        {loading && (
          <div className="text-primary-400">Loading...</div>
        )}
      </div>
      
      {error && (
        <div className="text-emergency-500 text-sm">{error}</div>
      )}
      
      {recentSearches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search: any, index: number) => (
              <button
                key={index}
                onClick={() => onLocationSelect(search.lat, search.lon)}
                className="px-3 py-1 text-sm bg-background-light text-gray-300 rounded hover:bg-background-medium"
              >
                {search.city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;