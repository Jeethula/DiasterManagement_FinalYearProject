import { Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { SocialPost } from '../../data/mockSocialPosts';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SocialNeedsChartProps {
  posts: SocialPost[];
}

const SocialNeedsChart = ({ posts }: SocialNeedsChartProps) => {
  // Get counts of different need types
  const needCounts = posts.reduce((acc, post) => {
    if (!acc[post.needType]) {
      acc[post.needType] = 0;
    }
    acc[post.needType]++;
    return acc;
  }, {} as Record<string, number>);
  
  const needLabels = Object.keys(needCounts).map(
    need => need.charAt(0).toUpperCase() + need.slice(1)
  );
  
  const needValues = Object.values(needCounts);
  
  // Custom colors for different need types
  const needColors = {
    water: { bg: 'rgba(0, 102, 255, 0.7)', border: 'rgba(0, 102, 255, 1)' },
    food: { bg: 'rgba(255, 215, 0, 0.7)', border: 'rgba(255, 215, 0, 1)' },
    shelter: { bg: 'rgba(0, 175, 0, 0.7)', border: 'rgba(0, 175, 0, 1)' },
    medical: { bg: 'rgba(255, 0, 0, 0.7)', border: 'rgba(255, 0, 0, 1)' },
    rescue: { bg: 'rgba(255, 105, 180, 0.7)', border: 'rgba(255, 105, 180, 1)' },
    other: { bg: 'rgba(128, 128, 128, 0.7)', border: 'rgba(128, 128, 128, 1)' },
  };
  
  const backgroundColors = Object.keys(needCounts).map(need => 
    needColors[need as keyof typeof needColors]?.bg || 'rgba(128, 128, 128, 0.7)'
  );
  
  const borderColors = Object.keys(needCounts).map(need => 
    needColors[need as keyof typeof needColors]?.border || 'rgba(128, 128, 128, 1)'
  );
  
  const chartData = {
    labels: needLabels,
    datasets: [
      {
        data: needValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          boxWidth: 15,
          padding: 15,
          font: {
            size: 11
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw;
            const percentage = Math.round((value / posts.length) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%',
  };

  // Find the most urgent need (highest count among urgent posts)
  const urgentNeeds = posts
    .filter(post => post.urgency === 'urgent')
    .reduce((acc, post) => {
      if (!acc[post.needType]) {
        acc[post.needType] = 0;
      }
      acc[post.needType]++;
      return acc;
    }, {} as Record<string, number>);
  
  const mostUrgentNeed = Object.entries(urgentNeeds)
    .sort((a, b) => b[1] - a[1])
    .map(([need]) => need.charAt(0).toUpperCase() + need.slice(1))[0] || 'None';

  return (
    <div className="flex items-center justify-center h-full relative">
      <Doughnut data={chartData} options={options} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center" style={{ marginLeft: '-40px' }}>
        <div className="text-xs text-gray-400">Most Urgent Need</div>
        <div className="text-sm font-semibold mt-1 text-primary-300">{mostUrgentNeed}</div>
      </div>
    </div>
  );
};

export default SocialNeedsChart;