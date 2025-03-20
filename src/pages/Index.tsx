
import React from 'react';
import { Link } from 'react-router-dom';
import ThreeDBackground from '@/components/ThreeDBackground';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 3D Background */}
      <ThreeDBackground />
      
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 py-12 md:py-24 relative z-10">
        <div className="w-full max-w-4xl animate-fade-in">
          {/* Subtle pill */}
          <div className="inline-block rounded-full bg-blue-100 py-1 px-3 text-xs font-medium text-blue-600 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Intelligent Agriculture
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            CropSense: Smart Crop Management
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Revolutionize your agricultural practices with precision monitoring and intelligent recommendations.
          </p>
          
          {/* Feature list */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <FeatureItem
              title="Real-time Monitoring"
              description="Track temperature, humidity, soil moisture, and pH levels in real-time."
            />
            <FeatureItem
              title="Smart Recommendations"
              description="Receive AI-powered recommendations for optimal crop care."
            />
            <FeatureItem
              title="Channel Management"
              description="Organize your farm into channels for targeted monitoring."
            />
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 text-base font-medium text-blue-600 shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-gray-500 bg-white/70 backdrop-blur-sm relative z-10">
        <p>© 2023 CropSense. All rights reserved.</p>
      </footer>
    </div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
