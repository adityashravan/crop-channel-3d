
import React, { useState } from 'react';
import BaseChartCard from './charts/BaseChartCard';
import LineChartComponent from './charts/LineChart';
import AreaChartComponent from './charts/AreaChart';
import BarChartComponent from './charts/BarChart';

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

  // Render the appropriate chart based on chartType
  const renderChart = () => {
    const commonProps = {
      data,
      dataKey,
      xAxisDataKey,
      color,
      unit
    };

    switch (chartType) {
      case 'line':
        return <LineChartComponent {...commonProps} isHovered={isHovered} />;
      case 'area':
        return <AreaChartComponent {...commonProps} isHovered={isHovered} />;
      case 'bar':
        return <BarChartComponent {...commonProps} />;
      default:
        return <LineChartComponent {...commonProps} isHovered={isHovered} />;
    }
  };

  return (
    <BaseChartCard
      title={title}
      description={description}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderChart()}
    </BaseChartCard>
  );
};

export default ChartCard;
