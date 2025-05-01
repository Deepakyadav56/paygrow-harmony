
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-white p-4">
      <div className="text-center max-w-md w-full">
        <div className="mx-auto w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-6">
          <X className="h-10 w-10 text-teal-600" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Button 
          asChild
          className="bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white shadow-md"
        >
          <Link to="/" className="px-8">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
