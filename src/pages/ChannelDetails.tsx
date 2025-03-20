
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { channelsData, isBelowThreshold, calculateAverageReadings, ChannelData } from '@/lib/data';
import { SensorReading } from '@/lib/data';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SensorTable from '@/components/SensorTable';
import WateringButton from '@/components/WateringButton';
import ChartCard from '@/components/ChartCard';
import { toast } from 'sonner';

const ChannelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [latestReading, setLatestReading] = useState<SensorReading | null>(null);
  const [averageReadings, setAverageReadings] = useState<Omit<SensorReading, 'timestamp'> | null>(null);
  const [isBelowThresholdValue, setIsBelowThresholdValue] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Fetch channel data
  useEffect(() => {
    const data = channelsData.find(data => data.channel.id === id);
    
    if (data) {
      setChannelData(data);
      
      // Get the latest reading
      const sortedReadings = [...data.readings].sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );
      setLatestReading(sortedReadings[0]);
      
      // Calculate average readings
      const average = calculateAverageReadings(data.readings);
      setAverageReadings(average);
      
      // Check if below threshold
      setIsBelowThresholdValue(isBelowThreshold(sortedReadings[0], data.threshold));
      
      // Prepare chart data (last 10 readings)
      const chartData = sortedReadings.slice(0, 10).reverse().map(reading => ({
        date: reading.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temperature: reading.temperature,
        humidity: reading.humidity,
        ph: reading.ph,
        soilMoisture: reading.soilMoisture,
      }));
      setChartData(chartData);
      
      // Show alert if below threshold
      if (isBelowThreshold(sortedReadings[0], data.threshold)) {
        toast.warning('Low soil moisture detected', {
          description: `Channel "${data.channel.name}" requires watering.`,
          duration: 5000,
        });
      }
    } else {
      // Channel not found, navigate back to dashboard
      navigate('/dashboard');
    }
  }, [id, navigate]);

  if (!channelData || !latestReading || !averageReadings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading channel data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="md:pl-64 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Dashboard
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{channelData.channel.name}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Channel ID: {channelData.channel.id} • Created on {channelData.channel.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          {/* Sensor readings summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
            <SensorCard
              title="Temperature"
              value={`${averageReadings.temperature.toFixed(1)}°C`}
              status={
                averageReadings.temperature < channelData.threshold.temperature.min
                  ? 'low'
                  : averageReadings.temperature > channelData.threshold.temperature.max
                  ? 'high'
                  : 'normal'
              }
              iconType="temperature"
            />
            <SensorCard
              title="Humidity"
              value={`${averageReadings.humidity.toFixed(1)}%`}
              status={
                averageReadings.humidity < channelData.threshold.humidity.min
                  ? 'low'
                  : averageReadings.humidity > channelData.threshold.humidity.max
                  ? 'high'
                  : 'normal'
              }
              iconType="humidity"
            />
            <SensorCard
              title="pH Level"
              value={averageReadings.ph.toFixed(1)}
              status={
                averageReadings.ph < channelData.threshold.ph.min
                  ? 'low'
                  : averageReadings.ph > channelData.threshold.ph.max
                  ? 'high'
                  : 'normal'
              }
              iconType="ph"
            />
            <SensorCard
              title="Soil Moisture"
              value={`${averageReadings.soilMoisture.toFixed(1)}%`}
              status={
                averageReadings.soilMoisture < channelData.threshold.soilMoisture.min
                  ? 'low'
                  : averageReadings.soilMoisture > channelData.threshold.soilMoisture.max
                  ? 'high'
                  : 'normal'
              }
              iconType="moisture"
            />
          </div>
          
          {/* Sensor readings table */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <SensorTable channelData={channelData} />
          </div>
          
          {/* Watering button */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Irrigation Control</h3>
                <p className="text-sm text-gray-500">
                  {isBelowThresholdValue
                    ? 'Low soil moisture detected! Your crops need water.'
                    : 'Soil moisture levels are adequate. No watering needed at this time.'}
                </p>
              </div>
              <WateringButton
                channelId={channelData.channel.id}
                channelName={channelData.channel.name}
                isBelowThreshold={isBelowThresholdValue}
              />
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ChartCard
              title="Temperature & Humidity Trends"
              description="Last 10 readings"
              data={chartData}
              dataKey="temperature"
              xAxisDataKey="date"
              color="#3B82F6"
              unit="°C"
            />
            <ChartCard
              title="Soil Moisture Levels"
              description="Last 10 readings"
              data={chartData}
              dataKey="soilMoisture"
              xAxisDataKey="date"
              color="#10B981"
              chartType="area"
              unit="%"
            />
            <ChartCard
              title="pH Levels"
              description="Last 10 readings"
              data={chartData}
              dataKey="ph"
              xAxisDataKey="date"
              color="#F59E0B"
              chartType="bar"
            />
            <ChartCard
              title="Humidity Variation"
              description="Last 10 readings"
              data={chartData}
              dataKey="humidity"
              xAxisDataKey="date"
              color="#6366F1"
              chartType="area"
              unit="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface SensorCardProps {
  title: string;
  value: string;
  status: 'low' | 'normal' | 'high';
  iconType: 'temperature' | 'humidity' | 'ph' | 'moisture';
}

const SensorCard: React.FC<SensorCardProps> = ({ title, value, status, iconType }) => {
  const getStatusColors = () => {
    switch (status) {
      case 'low':
        return { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-500' };
      case 'high':
        return { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-500' };
      default:
        return { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-500' };
    }
  };
  
  const colors = getStatusColors();
  
  const getIcon = () => {
    switch (iconType) {
      case 'temperature':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'humidity':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case 'ph':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        );
      case 'moisture':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'low':
        return 'Below optimal';
      case 'high':
        return 'Above optimal';
      default:
        return 'Optimal range';
    }
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-xl font-semibold text-gray-900">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colors.bg} ${colors.icon}`}>
          {getIcon()}
        </div>
      </div>
      <div className={`mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
        {getStatusText()}
      </div>
    </div>
  );
};

export default ChannelDetails;
