import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Cache for weather data
const weatherCache: Record<string, { data: WeatherData; timestamp: number }> = {};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  alerts?: Array<{
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
  }>;
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const cacheKey = `city-${city.toLowerCase()}`;
  const now = Date.now();

  // Check cache
  if (weatherCache[cacheKey] && (now - weatherCache[cacheKey].timestamp) < CACHE_DURATION) {
    return weatherCache[cacheKey].data;
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'imperial',
        appid: API_KEY
      }
    });

    // Cache the response
    weatherCache[cacheKey] = {
      data: response.data,
      timestamp: now
    };

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
  const cacheKey = `coords-${lat}-${lon}`;
  const now = Date.now();

  // Check cache
  if (weatherCache[cacheKey] && (now - weatherCache[cacheKey].timestamp) < CACHE_DURATION) {
    return weatherCache[cacheKey].data;
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        units: 'imperial',
        appid: API_KEY
      }
    });

    // Cache the response
    weatherCache[cacheKey] = {
      data: response.data,
      timestamp: now
    };

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherAlerts = async (lat: number, lon: number) => {
  const cacheKey = `alerts-${lat}-${lon}`;
  const now = Date.now();

  // Check cache
  if (weatherCache[cacheKey] && (now - weatherCache[cacheKey].timestamp) < CACHE_DURATION) {
    return weatherCache[cacheKey].data;
  }

  try {
    const response = await axios.get(`${BASE_URL}/onecall`, {
      params: {
        lat,
        lon,
        exclude: 'minutely,hourly',
        units: 'imperial',
        appid: API_KEY
      }
    });

    // Cache the response
    weatherCache[cacheKey] = {
      data: response.data.alerts || [],
      timestamp: now
    };
    
    return response.data.alerts || [];
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    throw error;
  }
};

export const convertWeatherAlert = (alert: any, coordinates: [number, number], region: string) => {
  return {
    id: `weather-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    type: 'info',
    severity: 'minor',
    title: alert.event,
    description: alert.description,
    region,
    coordinates,
    startTime: new Date(alert.start * 1000).toISOString(),
    endTime: new Date(alert.end * 1000).toISOString(),
    issuedBy: alert.sender_name
  };
};