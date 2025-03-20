
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dummyChannels } from '@/lib/data';
import Navbar from '@/components/Navbar';
import ChannelCard from '@/components/ChannelCard';
import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [channels, setChannels] = useState(dummyChannels);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      const newChannel = {
        id: String(channels.length + 1),
        name: newChannelName.trim(),
        createdAt: new Date(),
        lastUpdate: new Date(),
      };
      
      setChannels([...channels, newChannel]);
      setNewChannelName('');
      setIsCreatingChannel(false);
      
      toast.success('Channel created successfully', {
        description: `"${newChannelName}" has been added to your channels.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="md:pl-64 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Crop Channels</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your various crop fields and monitor their conditions
                </p>
              </div>
              
              {!isCreatingChannel && (
                <button
                  onClick={() => setIsCreatingChannel(true)}
                  className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <PlusIcon className="h-4 w-4 mr-1.5" />
                  Create Channel
                </button>
              )}
            </div>
            
            {/* Channel creation form */}
            {isCreatingChannel && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 animate-slide-down">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Channel</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="Enter channel name"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 outline-none transition-colors"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateChannel}
                      disabled={!newChannelName.trim()}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingChannel(false);
                        setNewChannelName('');
                      }}
                      className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Channel grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {channels.map((channel, index) => (
              <ChannelCard 
                key={channel.id} 
                channel={channel} 
                isNew={index === channels.length - 1 && channels.length > dummyChannels.length}
              />
            ))}
            
            {/* Create channel card */}
            {!isCreatingChannel && (
              <button
                onClick={() => setIsCreatingChannel(true)}
                className="group relative h-full min-h-[200px] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white/50 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <PlusIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="mt-2 block text-sm font-medium text-gray-900">Create a new channel</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
