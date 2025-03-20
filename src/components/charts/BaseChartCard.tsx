
import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

export interface BaseChartCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactElement;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  height?: string | number;
}

const BaseChartCard: React.FC<BaseChartCardProps> = ({
  title,
  description,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  height = '56',
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300",
        "hover:shadow-lg",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      
      <div className={`px-1 h-${typeof height === 'string' ? height : ''}`} 
           style={typeof height !== 'string' ? { height: `${height}px` } : {}}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BaseChartCard;
