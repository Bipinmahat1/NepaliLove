import { Button } from "@/components/ui/button";

interface MatchNotificationProps {
  match: any;
  onClose: () => void;
  onMessage: () => void;
}

export default function MatchNotification({ match, onClose, onMessage }: MatchNotificationProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-nepal-red to-nepal-pink flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center text-white px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-bold mb-2">It's a Match!</h2>
        <p className="text-xl mb-8">You and {match.profile?.name} both liked each other</p>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <img 
            src="/api/placeholder/96/96" 
            alt="Your profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-3xl">💕</div>
          <img 
            src={match.profile?.photos?.[0] || '/api/placeholder/96/96'} 
            alt="Match profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={onMessage}
            className="bg-white text-nepal-red px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Send Message
          </Button>
          <Button 
            onClick={onClose}
            variant="ghost"
            className="block mx-auto text-white underline hover:no-underline"
          >
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  );
}
