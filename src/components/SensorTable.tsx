
import React from 'react';
import { SensorReading, ChannelData, isBelowThreshold } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface SensorTableProps {
  channelData: ChannelData;
  className?: string;
}

const SensorTable: React.FC<SensorTableProps> = ({ channelData, className }) => {
  const { readings, threshold } = channelData;
  
  // Get the latest 5 readings, sorted by most recent first
  const latestReadings = [...readings]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Determine if a reading value is outside the threshold range
  const getStatusClass = (value: number, min: number, max: number) => {
    if (value < min) return 'text-amber-600 bg-amber-50';
    if (value > max) return 'text-red-600 bg-red-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className={cn("overflow-hidden rounded-xl border border-gray-200", className)}>
      <div className="bg-gray-50 py-4 px-5 border-b border-gray-200">
        <h3 className="text-base font-medium text-gray-900">Sensor Readings</h3>
        <p className="mt-1 text-sm text-gray-500">Latest measurements from sensors in this channel</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature (°C)</th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity (%)</th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH Level</th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soil Moisture (%)</th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {latestReadings.map((reading, index) => (
              <tr 
                key={index} 
                className={cn(
                  "transition-colors hover:bg-gray-50",
                  index === 0 ? "animate-slide-down" : ""
                )}
              >
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(reading.timestamp)}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusClass(reading.temperature, threshold.temperature.min, threshold.temperature.max)
                  )}>
                    {reading.temperature.toFixed(1)}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusClass(reading.humidity, threshold.humidity.min, threshold.humidity.max)
                  )}>
                    {reading.humidity.toFixed(1)}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusClass(reading.ph, threshold.ph.min, threshold.ph.max)
                  )}>
                    {reading.ph.toFixed(1)}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusClass(reading.soilMoisture, threshold.soilMoisture.min, threshold.soilMoisture.max)
                  )}>
                    {reading.soilMoisture.toFixed(1)}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  {isBelowThreshold(reading, threshold) ? (
                    <div className="flex items-center text-amber-600">
                      <AlertCircle size={16} className="mr-1" />
                      <span>Water needed</span>
                    </div>
                  ) : (
                    <span className="text-green-600">Normal</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorTable;
