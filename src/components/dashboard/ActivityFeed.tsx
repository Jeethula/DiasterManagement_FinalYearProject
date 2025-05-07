import { MessageSquare, MapPin } from 'lucide-react';
import { SocialPost } from '../../data/mockSocialPosts';
import AlertBadge from '../common/AlertBadge';

interface ActivityFeedProps {
  posts: SocialPost[];
}

const ActivityFeed = ({ posts }: ActivityFeedProps) => {
  const getNeedTypeLabel = (needType: string) => {
    return `#${needType.charAt(0).toUpperCase() + needType.slice(1)}`;
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-background-light p-3 rounded-md animate-fade-in">
          <div className="flex items-start">
            <img 
              src={post.avatar} 
              alt={post.username} 
              className="w-10 h-10 rounded-full mr-3"
            />
            
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-bold text-sm">{post.username}</span>
                {post.verified && (
                  <span className="ml-1 bg-primary-500 rounded-full w-4 h-4 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                )}
                <span className="text-gray-400 text-xs ml-1">@{post.handle}</span>
                <span className="text-gray-400 text-xs ml-auto">{post.timestamp}</span>
              </div>
              
              <p className="text-sm mt-1">{post.content}</p>
              
              <div className="flex items-center mt-2 text-xs text-gray-400">
                <div className="flex items-center mr-3">
                  <MapPin size={12} className="mr-1" />
                  {post.location}
                </div>
              
                <AlertBadge 
                  type={post.urgency} 
                  label={post.urgency.toUpperCase()} 
                  className="mr-2"
                />
                
                <span className="text-primary-400">
                  {getNeedTypeLabel(post.needType)}
                </span>
              </div>
              
              <div className="flex items-center mt-2 text-xs text-gray-400">
                <div className="flex items-center mr-3">
                  <span className="mr-1">👍</span>
                  {post.likes}
                </div>
                <div className="flex items-center">
                  <MessageSquare size={12} className="mr-1" />
                  {post.retweets}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <a 
        href="/social"
        className="block text-center text-sm text-primary-400 hover:text-primary-300 p-2"
      >
        View More Posts
      </a>
    </div>
  );
};

export default ActivityFeed;