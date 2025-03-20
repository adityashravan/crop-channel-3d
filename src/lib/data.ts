
// Dummy data for the application
export type Channel = {
  id: string;
  name: string;
  createdAt: Date;
  lastUpdate: Date;
};

export type SensorReading = {
  temperature: number;
  humidity: number;
  ph: number;
  soilMoisture: number;
  timestamp: Date;
};

export type ChannelData = {
  channel: Channel;
  readings: SensorReading[];
  threshold: {
    temperature: { min: number; max: number };
    humidity: { min: number; max: number };
    ph: { min: number; max: number };
    soilMoisture: { min: number; max: number };
  };
};

export const generateRandomReading = (): SensorReading => {
  return {
    temperature: 20 + Math.random() * 15,
    humidity: 30 + Math.random() * 50,
    ph: 5 + Math.random() * 4,
    soilMoisture: 20 + Math.random() * 60,
    timestamp: new Date(Date.now() - Math.random() * 8640000 * 7), // Random time in the last week
  };
};

export const dummyChannels: Channel[] = [
  {
    id: '1',
    name: 'Tomato Field',
    createdAt: new Date('2023-05-15'),
    lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: '2',
    name: 'Wheat Plantation',
    createdAt: new Date('2023-06-22'),
    lastUpdate: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '3',
    name: 'Corn Field',
    createdAt: new Date('2023-07-10'),
    lastUpdate: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: '4',
    name: 'Apple Orchard',
    createdAt: new Date('2023-08-05'),
    lastUpdate: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
  },
  {
    id: '5',
    name: 'Vineyard',
    createdAt: new Date('2023-09-18'),
    lastUpdate: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
  },
];

// Generate 30 readings for each channel (past 30 days)
export const generateChannelData = (channel: Channel): ChannelData => {
  const readings: SensorReading[] = [];
  
  // Create 30 readings per channel (one per day for the past month)
  for (let i = 0; i < 30; i++) {
    readings.push({
      temperature: 20 + Math.random() * 15,
      humidity: 30 + Math.random() * 50,
      ph: 5 + Math.random() * 4,
      soilMoisture: 20 + Math.random() * 60,
      timestamp: new Date(Date.now() - 8640000 * i),
    });
  }
  
  // Sort readings by timestamp
  readings.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  return {
    channel,
    readings,
    threshold: {
      temperature: { min: 18, max: 28 },
      humidity: { min: 40, max: 70 },
      ph: { min: 6, max: 7.5 },
      soilMoisture: { min: 50, max: 80 },
    },
  };
};

export const channelsData: ChannelData[] = dummyChannels.map(generateChannelData);

// Usage statistics for the dashboard
export const usageStats = {
  watering: {
    today: Math.floor(Math.random() * 5),
    thisWeek: Math.floor(Math.random() * 15) + 5,
    thisMonth: Math.floor(Math.random() * 50) + 20,
  },
  alerts: {
    today: Math.floor(Math.random() * 3),
    thisWeek: Math.floor(Math.random() * 10) + 2,
    thisMonth: Math.floor(Math.random() * 30) + 10,
  },
  readings: {
    today: Math.floor(Math.random() * 20) + 10,
    thisWeek: Math.floor(Math.random() * 100) + 50,
    thisMonth: Math.floor(Math.random() * 500) + 200,
  },
};

// Function to check if a reading is below threshold
export const isBelowThreshold = (reading: SensorReading, threshold: ChannelData['threshold']): boolean => {
  return reading.soilMoisture < threshold.soilMoisture.min;
};

// Function to format date to readable string
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Function to calculate average readings
export const calculateAverageReadings = (readings: SensorReading[]): Omit<SensorReading, 'timestamp'> => {
  const sum = readings.reduce(
    (acc, reading) => {
      return {
        temperature: acc.temperature + reading.temperature,
        humidity: acc.humidity + reading.humidity,
        ph: acc.ph + reading.ph,
        soilMoisture: acc.soilMoisture + reading.soilMoisture,
      };
    },
    { temperature: 0, humidity: 0, ph: 0, soilMoisture: 0 }
  );

  return {
    temperature: Number((sum.temperature / readings.length).toFixed(1)),
    humidity: Number((sum.humidity / readings.length).toFixed(1)),
    ph: Number((sum.ph / readings.length).toFixed(1)),
    soilMoisture: Number((sum.soilMoisture / readings.length).toFixed(1)),
  };
};
