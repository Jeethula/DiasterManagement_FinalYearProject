import { Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { SocialPost } from '../../data/mockSocialPosts';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SocialSentimentChartProps {
  posts: SocialPost[];
}

const SocialSentimentChart = ({ posts }: SocialSentimentChartProps) => {
  // Count posts by urgency and need type
  const urgentCount = posts.filter(post => post.urgency === 'urgent').length;
  const warningCount = posts.filter(post => post.urgency === 'warning').length;
  const infoCount = posts.filter(post => post.urgency === 'info').length;
  
  // Get counts of different need types
  const needCounts = posts.reduce((acc, post) => {
    if (!acc[post.needType]) {
      acc[post.needType] = 0;
    }
    acc[post.needType]++;
    return acc;
  }, {} as Record<string, number>);
  
  const sentimentData = {
    labels: ['Urgent', 'Warning', 'Information'],
    datasets: [
      {
        data: [urgentCount, warningCount, infoCount],
        backgroundColor: [
          'rgba(255, 0, 0, 0.7)',
          'rgba(255, 215, 0, 0.7)',
          'rgba(0, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(0, 102, 255, 1)',
        ],
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
  };

  return (
    <div className="flex items-center h-full">
      <div className="w-1/2 h-full">
        <Pie data={sentimentData} options={options} />
      </div>
      <div className="w-1/2 pl-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Sentiment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Urgent Posts:</span>
            <span className="text-emergency-500 font-semibold">{Math.round((urgentCount / posts.length) * 100)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Warning Posts:</span>
            <span className="text-warning-500 font-semibold">{Math.round((warningCount / posts.length) * 100)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Info Posts:</span>
            <span className="text-info-500 font-semibold">{Math.round((infoCount / posts.length) * 100)}%</span>
          </div>
          <div className="pt-2 mt-2 border-t border-background-medium">
            <span className="text-xs text-gray-400">Primary needs: {Object.keys(needCounts)
              .sort((a, b) => needCounts[b] - needCounts[a])
              .slice(0, 2)
              .map(need => need.charAt(0).toUpperCase() + need.slice(1))
              .join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSentimentChart;