
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  description?: string;
  data: any[];
  dataKey: string;
  xAxisDataKey?: string;
  color?: string;
  className?: string;
  chartType?: 'line' | 'area' | 'bar';
  unit?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  data,
  dataKey,
  xAxisDataKey = 'name',
  color = '#3B82F6',
  className,
  chartType = 'line',
  unit = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getGradientId = () => `${dataKey}Gradient`;

  // Render the appropriate chart based on chartType
  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id={getGradientId()} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey={xAxisDataKey} 
            tick={{ fontSize: 10, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
            dy={10}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
            width={30}
            tickFormatter={(value) => `${value}${unit}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              fontSize: '12px',
              padding: '8px 12px'
            }}
            formatter={(value) => [`${value}${unit}`, dataKey]}
            labelFormatter={(label) => `${label}`}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={isHovered ? 3 : 2}
            dot={{ r: 3, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 0, fill: color }}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </LineChart>
      );
    } else if (chartType === 'area') {
      return (
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id={getGradientId()} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey={xAxisDataKey} 
            tick={{ fontSize: 10, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
            dy={10}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
            width={30}
            tickFormatter={(value) => `${value}${unit}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              fontSize: '12px',
              padding: '8px 12px'
            }}
            formatter={(value) => [`${value}${unit}`, dataKey]}
            labelFormatter={(label) => `${label}`}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={isHovered ? 3 : 2}
            fillOpacity={1}
            fill={`url(#${getGradientId()})`}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </AreaChart>
      );
    } else {
      return (
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id={getGradientId()} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey={xAxisDataKey} 
            tick={{ fontSize: 10, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
            dy={10}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
            width={30}
            tickFormatter={(value) => `${value}${unit}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              fontSize: '12px',
              padding: '8px 12px'
            }}
            formatter={(value) => [`${value}${unit}`, dataKey]}
            labelFormatter={(label) => `${label}`}
          />
          <Bar 
            dataKey={dataKey} 
            radius={[4, 4, 0, 0]}
            fill={`url(#${getGradientId()})`}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </BarChart>
      );
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300",
        "hover:shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      
      <div className="px-1 h-56">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
