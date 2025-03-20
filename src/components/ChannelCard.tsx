
import React from 'react';
import { Link } from 'react-router-dom';
import { Channel } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  isNew?: boolean;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, isNew = false }) => {
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate time difference for last update
  const getLastUpdateText = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <Link 
      to={`/channel/${channel.id}`}
      className={cn(
        "block group relative overflow-hidden rounded-xl bg-white transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "border border-gray-100",
        isNew ? "animate-scale" : ""
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2">
              Channel
            </span>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {channel.name}
            </h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
            <span className="text-lg font-medium">{channel.id}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1.5" />
            <span>Created: {formatDate(channel.createdAt)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              ID: {channel.id}
            </span>
            <span className="text-xs font-medium text-blue-600">
              {getLastUpdateText(channel.lastUpdate)}
            </span>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
      />
    </Link>
  );
};

export default ChannelCard;
