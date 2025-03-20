
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-700 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
