import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nepal-red to-nepal-pink flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-4 animate-fade-in">
        <CardContent className="pt-8 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🇳🇵 Nepali Dating</h1>
            <p className="text-gray-600 text-lg">We Connect Two Hearts</p>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              Find your perfect match in the heart of Nepal. Connect with genuine people, share your story, and discover love.
            </p>
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-nepal-red text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Get Started
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <a href="#" className="text-nepal-red underline">Terms</a> and{" "}
              <a href="#" className="text-nepal-red underline">Privacy Policy</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
