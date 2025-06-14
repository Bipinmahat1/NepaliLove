import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface MatchesProps {
  onStartChat: (match: any) => void;
}

export default function Matches({ onStartChat }: MatchesProps) {
  const { data: matches = [], isLoading } = useQuery({
    queryKey: ["/api/matches"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💕</div>
          <div className="text-xl font-semibold text-gray-900">Loading matches...</div>
        </div>
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Matches Yet</h2>
          <p className="text-gray-600 mb-4">Keep swiping to find your perfect match!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-900">Your Matches</h1>
      </div>
      
      <div className="px-4 py-6 space-y-4">
        {matches.map((match: any) => (
          <Card key={match.id} className="overflow-hidden border-gray-100 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="relative">
                  <img 
                    src={match.profile?.photos?.[0] || '/api/placeholder/64/64'} 
                    alt={match.profile?.name || 'Match'}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {match.profile?.name} 🇳🇵
                  </h3>
                  <p className="text-sm text-gray-600">
                    Matched {formatDistanceToNow(new Date(match.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <Button 
                  onClick={() => onStartChat(match)}
                  className="bg-nepal-red text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
