
import React, { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

export interface BaseChartCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const BaseChartCard: React.FC<BaseChartCardProps> = ({
  title,
  description,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
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
      <div className="p-5">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      
      <div className="px-1 h-56">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BaseChartCard;
