import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { WeatherForecast } from '../../data/mockWeatherData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherForecastChartProps {
  forecasts: WeatherForecast[];
}

const WeatherForecastChart = ({ forecasts }: WeatherForecastChartProps) => {
  // Group forecasts by location
  const locations = [...new Set(forecasts.map(f => f.location))];
  
  // Process chart data
  const datasets = [];
  const labels = forecasts
    .filter(f => f.location === locations[0])
    .map(f => {
      const date = new Date(f.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
  
  // Create datasets for each location
  locations.forEach((location, index) => {
    const locationForecasts = forecasts.filter(f => f.location === location);
    
    datasets.push({
      label: `${location} - Disaster Risk`,
      data: locationForecasts.map(f => f.disasterRisk),
      backgroundColor: `rgba(255, ${index * 50}, 0, 0.7)`,
      borderColor: `rgba(255, ${index * 50}, 0, 1)`,
      borderWidth: 1,
      borderRadius: 4,
    });
    
    datasets.push({
      label: `${location} - Precipitation`,
      data: locationForecasts.map(f => f.precipitation),
      backgroundColor: `rgba(0, 102, 255, 0.7)`,
      borderColor: `rgba(0, 102, 255, 1)`,
      borderWidth: 1,
      borderRadius: 4,
      stack: 'precipitation',
    });
  });
  
  const chartData = {
    labels,
    datasets,
  };
  
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            
            if (label.includes('Disaster Risk')) {
              return `${label}: ${value}%`;
            } else if (label.includes('Precipitation')) {
              return `${label}: ${value}%`;
            }
            return `${label}: ${value}`;
          }
        }
      }
    },
  };

  return (
    <div className="p-2">
      <Bar data={chartData} options={options} height={300} />
      <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-400 justify-center">
        {locations.map(location => {
          const forecast = forecasts.find(f => f.location === location);
          if (!forecast) return null;
          
          return (
            <div key={location} className="bg-background-light p-2 rounded">
              <div className="font-semibold mb-1">{location}</div>
              <div>Risk Type: {forecast.disasterType || 'None'}</div>
              <div>Temp: {forecast.temperature}°F (Feels: {forecast.feelsLike}°F)</div>
              <div>Wind: {forecast.windSpeed} mph {forecast.windDirection}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecastChart;