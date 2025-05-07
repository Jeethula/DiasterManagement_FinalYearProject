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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RegionAllocation {
  region: string;
  allocated: number;
  required: number;
}

interface ResourceAllocationChartProps {
  data: RegionAllocation[];
}

const ResourceAllocationChart = ({ data }: ResourceAllocationChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      x: {
        stacked: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
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
            const value = context.parsed.x;
            
            if (label === 'Allocated') {
              const region = data[context.dataIndex];
              const percentage = Math.round((region.allocated / region.required) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
            
            return `${label}: ${value}`;
          }
        }
      }
    },
  };
  
  const chartData = {
    labels: data.map(item => item.region),
    datasets: [
      {
        label: 'Allocated',
        data: data.map(item => item.allocated),
        backgroundColor: 'rgba(0, 115, 255, 0.7)',
        borderColor: 'rgba(0, 115, 255, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Required',
        data: data.map(item => item.required),
        backgroundColor: 'rgba(255, 215, 0, 0.5)',
        borderColor: 'rgba(255, 215, 0, 0.8)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
};

export default ResourceAllocationChart;