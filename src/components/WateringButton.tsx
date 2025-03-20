
import React, { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface WateringButtonProps {
  channelId: string;
  channelName: string;
  isBelowThreshold: boolean;
  className?: string;
}

const WateringButton: React.FC<WateringButtonProps> = ({ 
  channelId, 
  channelName, 
  isBelowThreshold,
  className 
}) => {
  const [isWatering, setIsWatering] = useState(false);

  const handleWatering = () => {
    setIsWatering(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast.success(`Watering initiated for ${channelName}`, {
        description: 'The irrigation system will run for the next 15 minutes.',
        duration: 5000,
      });
      setIsWatering(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleWatering}
      disabled={isWatering || !isBelowThreshold}
      className={cn(
        "relative overflow-hidden group rounded-xl shadow-sm transition-all duration-300",
        "flex items-center justify-center h-12 px-6 font-medium",
        isBelowThreshold
          ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
          : "bg-gray-100 text-gray-400 cursor-not-allowed",
        isWatering && "pointer-events-none",
        className
      )}
    >
      {/* Background animation */}
      {isBelowThreshold && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-40 translate-y-[100%] group-hover:translate-y-[-40%] transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-400 to-transparent opacity-20" />
          </div>
        </div>
      )}
      
      {/* Button content */}
      <div className="relative flex items-center">
        {isWatering ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Watering...
          </>
        ) : (
          isBelowThreshold ? 'Click to Give Water' : 'Moisture Level Adequate'
        )}
      </div>
    </button>
  );
};

export default WateringButton;
