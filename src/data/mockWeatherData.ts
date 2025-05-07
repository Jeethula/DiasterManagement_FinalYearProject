export interface WeatherAlert {
  id: string;
  type: 'hurricane' | 'flood' | 'tornado' | 'wildfire' | 'winter' | 'heatwave' | 'thunderstorm';
  severity: 'extreme' | 'severe' | 'moderate' | 'minor';
  title: string;
  description: string;
  region: string;
  coordinates: [number, number];
  startTime: string;
  endTime: string;
  issuedBy: string;
}

export interface WeatherForecast {
  date: string;
  location: string;
  coordinates: [number, number];
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  disasterRisk: number; // 0-100%
  disasterType: 'hurricane' | 'flood' | 'tornado' | 'wildfire' | 'winter' | null;
  weatherIcon: string;
}

export const mockWeatherAlerts: WeatherAlert[] = [
  {
    id: '1',
    type: 'hurricane',
    severity: 'extreme',
    title: 'Hurricane Warning',
    description: 'Hurricane Michael approaching the coast with sustained winds of 145 mph. Mandatory evacuation ordered for coastal areas.',
    region: 'Florida Panhandle',
    coordinates: [30.1588, -85.6602],
    startTime: '2025-06-10T08:00:00',
    endTime: '2025-06-12T20:00:00',
    issuedBy: 'National Hurricane Center'
  },
  {
    id: '2',
    type: 'flood',
    severity: 'severe',
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall causing dangerous flash flooding. Avoid travel and move to higher ground immediately if in affected areas.',
    region: 'Houston Metropolitan Area',
    coordinates: [29.7604, -95.3698],
    startTime: '2025-06-10T12:00:00',
    endTime: '2025-06-11T12:00:00',
    issuedBy: 'National Weather Service'
  },
  {
    id: '3',
    type: 'tornado',
    severity: 'severe',
    title: 'Tornado Warning',
    description: 'Tornado spotted on the ground moving northeast at 35 mph. Seek shelter in basement or interior room immediately.',
    region: 'Dallas-Fort Worth Metroplex',
    coordinates: [32.7767, -96.7970],
    startTime: '2025-06-10T15:30:00',
    endTime: '2025-06-10T16:30:00',
    issuedBy: 'National Weather Service'
  },
  {
    id: '4',
    type: 'wildfire',
    severity: 'severe',
    title: 'Wildfire Emergency',
    description: 'Rapidly spreading wildfire threatening residential areas. Evacuation orders in place for zones 3, 4, and 5.',
    region: 'Los Angeles County',
    coordinates: [34.0522, -118.2437],
    startTime: '2025-06-09T10:00:00',
    endTime: '2025-06-13T20:00:00',
    issuedBy: 'Cal Fire'
  },
  {
    id: '5',
    type: 'winter',
    severity: 'moderate',
    title: 'Winter Storm Warning',
    description: 'Heavy snow and ice accumulation expected. 12-18 inches of snow with ice accumulations up to 0.5 inches.',
    region: 'Chicago Metropolitan Area',
    coordinates: [41.8781, -87.6298],
    startTime: '2025-06-10T18:00:00',
    endTime: '2025-06-11T18:00:00',
    issuedBy: 'National Weather Service'
  },
  {
    id: '6',
    type: 'heatwave',
    severity: 'moderate',
    title: 'Excessive Heat Warning',
    description: 'Dangerous heat index values up to 110°F expected. Limit outdoor activities and stay hydrated.',
    region: 'Phoenix Metropolitan Area',
    coordinates: [33.4484, -112.0740],
    startTime: '2025-06-10T09:00:00',
    endTime: '2025-06-12T21:00:00',
    issuedBy: 'National Weather Service'
  },
  {
    id: '7',
    type: 'thunderstorm',
    severity: 'minor',
    title: 'Severe Thunderstorm Watch',
    description: 'Conditions favorable for severe thunderstorms with potential for damaging winds and large hail.',
    region: 'New York Metropolitan Area',
    coordinates: [40.7128, -74.0060],
    startTime: '2025-06-10T14:00:00',
    endTime: '2025-06-10T22:00:00',
    issuedBy: 'National Weather Service'
  }
];

export const mockWeatherForecasts: WeatherForecast[] = [
  {
    date: '2025-06-10',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    temperature: 92,
    feelsLike: 98,
    humidity: 85,
    windSpeed: 25,
    windDirection: 'SE',
    precipitation: 80,
    disasterRisk: 75,
    disasterType: 'hurricane',
    weatherIcon: 'hurricane'
  },
  {
    date: '2025-06-11',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    temperature: 90,
    feelsLike: 97,
    humidity: 90,
    windSpeed: 45,
    windDirection: 'SE',
    precipitation: 95,
    disasterRisk: 90,
    disasterType: 'hurricane',
    weatherIcon: 'hurricane'
  },
  {
    date: '2025-06-10',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    temperature: 85,
    feelsLike: 88,
    humidity: 80,
    windSpeed: 15,
    windDirection: 'S',
    precipitation: 90,
    disasterRisk: 70,
    disasterType: 'flood',
    weatherIcon: 'cloud-rain'
  },
  {
    date: '2025-06-11',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    temperature: 83,
    feelsLike: 86,
    humidity: 85,
    windSpeed: 12,
    windDirection: 'S',
    precipitation: 75,
    disasterRisk: 60,
    disasterType: 'flood',
    weatherIcon: 'cloud-rain'
  },
  {
    date: '2025-06-10',
    location: 'Dallas, TX',
    coordinates: [32.7767, -96.7970],
    temperature: 88,
    feelsLike: 90,
    humidity: 65,
    windSpeed: 22,
    windDirection: 'SW',
    precipitation: 60,
    disasterRisk: 65,
    disasterType: 'tornado',
    weatherIcon: 'cloud-lightning'
  },
  {
    date: '2025-06-11',
    location: 'Dallas, TX',
    coordinates: [32.7767, -96.7970],
    temperature: 85,
    feelsLike: 87,
    humidity: 70,
    windSpeed: 18,
    windDirection: 'SW',
    precipitation: 40,
    disasterRisk: 45,
    disasterType: 'tornado',
    weatherIcon: 'cloud-lightning'
  },
  {
    date: '2025-06-10',
    location: 'Los Angeles, CA',
    coordinates: [34.0522, -118.2437],
    temperature: 95,
    feelsLike: 97,
    humidity: 15,
    windSpeed: 25,
    windDirection: 'NE',
    precipitation: 0,
    disasterRisk: 80,
    disasterType: 'wildfire',
    weatherIcon: 'sun'
  },
  {
    date: '2025-06-11',
    location: 'Los Angeles, CA',
    coordinates: [34.0522, -118.2437],
    temperature: 98,
    feelsLike: 100,
    humidity: 10,
    windSpeed: 30,
    windDirection: 'NE',
    precipitation: 0,
    disasterRisk: 90,
    disasterType: 'wildfire',
    weatherIcon: 'sun'
  }
];