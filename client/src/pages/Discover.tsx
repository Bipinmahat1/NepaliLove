import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Sliders, Heart, X, Star } from "lucide-react";
import SwipeCard from "@/components/SwipeCard";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface DiscoverProps {
  onMatch: (matchData: any) => void;
}

export default function Discover({ onMatch }: DiscoverProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  const { playSwipeSound, playMatchSound } = useSoundEffects();
  const queryClient = useQueryClient();

  const { data: profiles = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/discover"],
    refetchOnWindowFocus: false,
  });

  const swipeMutation = useMutation({
    mutationFn: async ({ swipedId, action }: { swipedId: string; action: 'like' | 'pass' }) => {
      const response = await apiRequest("POST", "/api/swipe", { swipedId, action });
      return response.json();
    },
    onSuccess: (data, variables) => {
      if (data.isMatch) {
        const currentProfile = profiles[currentIndex];
        onMatch({
          profile: currentProfile,
          isMatch: true,
        });
      }
      
      // Move to next card
      // Play appropriate sound effect
      playSwipeSound(variables.action as 'like' | 'pass');
      
      if (data.isMatch) {
        playMatchSound();
      }
      
      setCurrentIndex(prev => prev + 1);
      
      // Refetch profiles if we're running low
      if (currentIndex >= profiles.length - 2) {
        queryClient.invalidateQueries({ queryKey: ["/api/discover"] });
        setCurrentIndex(0);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process swipe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: async (favoriteUserId: string) => {
      const response = await apiRequest("POST", "/api/favorites", { favoriteUserId });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: data.isFavorite ? "Added to Favorites!" : "Removed from Favorites",
        description: data.isFavorite ? "This person has been favorited." : "This person has been unfavorited.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process favorite. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSwipe = (action: 'like' | 'pass') => {
    const currentProfile = profiles[currentIndex];
    if (currentProfile) {
      swipeMutation.mutate({
        swipedId: currentProfile.userId,
        action,
      });
    }
  };

  const handleCardSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction === 'right' ? 'like' : 'pass');
  };

  const handleFavorite = () => {
    const currentProfile = profiles[currentIndex];
    if (currentProfile) {
      favoriteMutation.mutate(currentProfile.userId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-pink-50 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🇳🇵</div>
          <div className="text-xl font-semibold text-gray-900">Loading profiles...</div>
        </div>
      </div>
    );
  }

  if (!profiles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-pink-50 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No More Profiles</h2>
          <p className="text-gray-600 mb-4">Check back later for new matches!</p>
          <Button 
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["/api/discover"] });
              setCurrentIndex(0);
            }}
            className="bg-nepal-red text-white hover:bg-red-700"
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-pink-50 pb-20">
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-nepal-red">🇳🇵</h1>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Discover</h1>
              <p className="text-sm text-gray-600">Find your perfect match</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Sliders className="h-5 w-5 text-nepal-red" />
          </Button>
        </div>
      </div>
      
      <div className="relative px-4 py-6">
        {/* Swipe Cards Stack */}
        <div className="relative h-[500px] w-full max-w-sm mx-auto px-4 sm:px-0">
          {/* Background cards */}
          {profiles.slice(currentIndex + 1, currentIndex + 3).map((_, index) => (
            <div 
              key={`bg-${index}`}
              className={`absolute inset-0 bg-white rounded-3xl shadow-lg transform ${
                index === 0 ? 'scale-95 opacity-75' : 'scale-90 opacity-50'
              }`}
            />
          ))}
          
          {/* Active card */}
          {currentProfile && (
            <SwipeCard
              profile={currentProfile}
              onSwipe={handleCardSwipe}
              isActive={true}
            />
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <Button
            onClick={() => handleSwipe('pass')}
            disabled={swipeMutation.isPending}
            className={`w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 ${
              swipeMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:scale-110'
            }`}
          >
            {swipeMutation.isPending ? (
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <X className="h-8 w-8 text-gray-500" />
            )}
          </Button>
          
          <Button
            onClick={handleFavorite}
            disabled={swipeMutation.isPending || favoriteMutation.isPending}
            className={`w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 ${
              swipeMutation.isPending || favoriteMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 hover:scale-110'
            }`}
          >
            {favoriteMutation.isPending ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Star className="h-8 w-8 text-blue-500" />
            )}
          </Button>
          
          <Button
            onClick={() => handleSwipe('like')}
            disabled={swipeMutation.isPending}
            className={`w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 ${
              swipeMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50 hover:scale-110'
            }`}
          >
            {swipeMutation.isPending ? (
              <div className="w-6 h-6 border-2 border-nepal-red border-t-transparent rounded-full animate-spin" />
            ) : (
              <Heart className="h-8 w-8 text-nepal-red" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
