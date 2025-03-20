
import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export interface LineChartProps {
  data: any[];
  dataKey: string;
  xAxisDataKey?: string;
  color?: string;
  unit?: string;
  isHovered?: boolean;
}

const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  dataKey,
  xAxisDataKey = 'name',
  color = '#3B82F6',
  unit = '',
  isHovered = false,
}) => {
  const getGradientId = () => `${dataKey}Gradient`;

  return (
    <RechartsLineChart
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
    </RechartsLineChart>
  );
};

export default LineChartComponent;
