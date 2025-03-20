
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThreeDBackground from '@/components/ThreeDBackground';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login process with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      
      // For demo purposes, accept any login
      toast.success('Login successful!', {
        description: 'Welcome back to CropSense.',
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 3D Background */}
      <ThreeDBackground />
      
      {/* Content */}
      <div className="flex items-center justify-center flex-grow p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Back to home link */}
          <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
          
          {/* Login card */}
          <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl border border-gray-100 overflow-hidden animate-scale">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
                <p className="text-gray-600">Log in to access your CropSense dashboard</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </>
                    ) : (
                      'Log in'
                    )}
                    
                    {/* Subtle hover animation */}
                    <span className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 hover:scale-100">
                      <span className="absolute inset-0 h-full w-full bg-white opacity-10 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Signup link */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
          {/* Demo credentials */}
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-xs text-gray-500">
              For demo purposes, you can use any email and password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
