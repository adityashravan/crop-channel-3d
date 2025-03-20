import React, { useEffect, useState } from 'react';
import { channelsData, dummyChannels, usageStats } from '@/lib/data';
import Navbar from '@/components/Navbar';
import ChartCard from '@/components/ChartCard';
import { ScrollArea } from '@/components/ui/scroll-area';

const Statistics: React.FC = () => {
  const [aggregateData, setAggregateData] = useState<any[]>([]);
  const [compareData, setCompareData] = useState<any[]>([]);
  const [wateringData, setWateringData] = useState<any[]>([]);
  
  useEffect(() => {
    // Prepare data for charts
    const prepareChartData = () => {
      // Aggregate data (average readings from all channels per day for last 7 days)
      const aggregatedReadings: any[] = [];
      
      // Take 7 days of data (channels already have 30 days of data)
      for (let i = 0; i < 7; i++) {
        const dayReadings = channelsData.map(channel => {
          return channel.readings[i]; // Readings are already sorted by date
        });
        
        // Calculate averages for this day across all channels
        const sumReadings = dayReadings.reduce(
          (acc, reading) => {
            if (!reading) return acc;
            return {
              temperature: acc.temperature + reading.temperature,
              humidity: acc.humidity + reading.humidity,
              ph: acc.ph + reading.ph,
              soilMoisture: acc.soilMoisture + reading.soilMoisture,
            };
          },
          { temperature: 0, humidity: 0, ph: 0, soilMoisture: 0 }
        );
        
        const avgReadings = {
          temperature: Number((sumReadings.temperature / dayReadings.length).toFixed(1)),
          humidity: Number((sumReadings.humidity / dayReadings.length).toFixed(1)),
          ph: Number((sumReadings.ph / dayReadings.length).toFixed(1)),
          soilMoisture: Number((sumReadings.soilMoisture / dayReadings.length).toFixed(1)),
          date: dayReadings[0]?.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || `Day ${i+1}`,
        };
        
        aggregatedReadings.push(avgReadings);
      }
      
      // Reverse to have most recent data last (for better chart visualization)
      setAggregateData([...aggregatedReadings].reverse());
      
      // Comparison data (latest reading from each channel)
      const comparisonData = channelsData.map(channelData => {
        const latestReading = channelData.readings[0]; // First reading is most recent
        return {
          name: channelData.channel.name.split(' ')[0], // Just first word for chart clarity
          temperature: latestReading.temperature,
          humidity: latestReading.humidity,
          ph: latestReading.ph,
          soilMoisture: latestReading.soilMoisture,
        };
      });
      
      setCompareData(comparisonData);
      
      // Generate more realistic watering data
      const wateringEvents = [
        { name: 'Mon', count: 3 + Math.floor(Math.random() * 2) },
        { name: 'Tue', count: 2 + Math.floor(Math.random() * 3) },
        { name: 'Wed', count: 4 + Math.floor(Math.random() * 2) },
        { name: 'Thu', count: 1 + Math.floor(Math.random() * 3) },
        { name: 'Fri', count: 3 + Math.floor(Math.random() * 2) },
        { name: 'Sat', count: 2 + Math.floor(Math.random() * 2) },
        { name: 'Sun', count: 1 + Math.floor(Math.random() * 2) },
      ];
      
      setWateringData(wateringEvents);
    };
    
    prepareChartData();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="md:pl-64 flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
            <p className="mt-1 text-sm text-gray-500">
              View comprehensive statistics and trends from all your crop channels
            </p>
          </div>
          
          {/* Usage stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-slide-up">
            <StatCard
              title="Total Channels"
              value={dummyChannels.length.toString()}
              description="Active crop monitoring channels"
              trend="up"
              trendValue="+2 this month"
              iconType="channels"
            />
            <StatCard
              title="Water Events"
              value={usageStats.watering.thisMonth.toString()}
              description="Irrigation events this month"
              trend="up"
              trendValue={`+${usageStats.watering.today} today`}
              iconType="watering"
            />
            <StatCard
              title="Sensor Readings"
              value={usageStats.readings.thisMonth.toString()}
              description="Total readings collected this month"
              trend="up"
              trendValue={`+${usageStats.readings.today} today`}
              iconType="readings"
            />
          </div>
          
          {/* Charts - Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <ChartCard
              title="7-Day Temperature Trends"
              description="Average temperatures across all channels"
              data={aggregateData}
              dataKey="temperature"
              xAxisDataKey="date"
              color="#9b87f5"
              unit="°C"
              height={240}
            />
            <ChartCard
              title="7-Day Humidity Trends"
              description="Average humidity across all channels"
              data={aggregateData}
              dataKey="humidity"
              xAxisDataKey="date"
              color="#0EA5E9"
              chartType="area"
              unit="%"
              height={240}
            />
          </div>
          
          {/* Charts - Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <ChartCard
              title="7-Day Soil Moisture Trends"
              description="Average soil moisture across all channels"
              data={aggregateData}
              dataKey="soilMoisture"
              xAxisDataKey="date"
              color="#10B981"
              chartType="area"
              unit="%"
              height={240}
            />
            <ChartCard
              title="7-Day pH Level Trends"
              description="Average pH levels across all channels"
              data={aggregateData}
              dataKey="ph"
              xAxisDataKey="date"
              color="#F97316"
              chartType="line"
              height={240}
            />
          </div>
          
          {/* Charts - Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ChartCard
              title="Channel Comparison"
              description="Current soil moisture levels by channel"
              data={compareData}
              dataKey="soilMoisture"
              xAxisDataKey="name"
              color="#D946EF"
              chartType="bar"
              unit="%"
              height={240}
            />
            <ChartCard
              title="Watering Events"
              description="Number of irrigation events by day"
              data={wateringData}
              dataKey="count"
              xAxisDataKey="name"
              color="#8B5CF6"
              chartType="bar"
              unit=""
              height={240}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  iconType: 'channels' | 'watering' | 'readings';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  trend, 
  trendValue,
  iconType
}) => {
  const getTrendColors = () => {
    switch (trend) {
      case 'up':
        return { text: 'text-green-600', bg: 'bg-green-50' };
      case 'down':
        return { text: 'text-red-600', bg: 'bg-red-50' };
      default:
        return { text: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };
  
  const colors = getTrendColors();
  
  const getIcon = () => {
    switch (iconType) {
      case 'channels':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'watering':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'readings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
    }
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="p-2 rounded-lg bg-blue-50">
          {getIcon()}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      </div>
      
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
        {trend === 'up' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        )}
        {trend === 'down' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        {trendValue}
      </div>
    </div>
  );
};

export default Statistics;
