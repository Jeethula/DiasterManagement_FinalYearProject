import { MessageSquare, MapPin, ThumbsUp } from 'lucide-react';
import { SocialPost } from '../../data/mockSocialPosts';
import AlertBadge from '../common/AlertBadge';

interface SocialFeedProps {
  posts: SocialPost[];
}

const SocialFeed = ({ posts }: SocialFeedProps) => {
  if (posts.length === 0) {
    return (
      <div className="bg-background-light rounded-md p-6 text-center text-gray-400">
        No posts found matching your filter criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-background-light p-4 rounded-md animate-fade-in hover:bg-background-light/70 transition-colors"
        >
          <div className="flex items-start">
            <img 
              src={post.avatar} 
              alt={post.username} 
              className="w-12 h-12 rounded-full mr-4"
            />
            
            <div className="flex-1">
              <div className="flex items-center flex-wrap">
                <span className="font-bold">{post.username}</span>
                {post.verified && (
                  <span className="ml-1 bg-primary-500 rounded-full w-4 h-4 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                )}
                <span className="text-gray-400 text-sm ml-1">@{post.handle}</span>
                <span className="text-gray-400 text-sm ml-auto">{post.timestamp}</span>
              </div>
              
              <p className="my-2">{post.content}</p>
              
              <div className="flex items-center mt-2 text-sm text-gray-400">
                <div className="flex items-center mr-4">
                  <MapPin size={16} className="mr-1" />
                  {post.location}
                </div>
              
                <AlertBadge 
                  type={post.urgency} 
                  label={post.urgency.toUpperCase()} 
                  animated={post.urgency === 'urgent'}
                  className="mr-2"
                />
                
                <span className="text-primary-400 bg-primary-900 px-2 py-0.5 rounded-full text-xs">
                  #{post.needType.charAt(0).toUpperCase() + post.needType.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-background-medium">
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-primary-400">
                    <ThumbsUp size={16} className="mr-1" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-primary-400">
                    <MessageSquare size={16} className="mr-1" />
                    <span className="text-sm">{post.retweets}</span>
                  </button>
                </div>
                
                <button className="text-sm text-primary-400 hover:text-primary-300">
                  Respond
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;