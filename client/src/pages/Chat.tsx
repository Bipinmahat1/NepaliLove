import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface ChatProps {
  onOpenChat: (conversation: any) => void;
}

export default function Chat({ onOpenChat }: ChatProps) {
  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["/api/conversations"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💬</div>
          <div className="text-xl font-semibold text-gray-900">Loading conversations...</div>
        </div>
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Messages Yet</h2>
          <p className="text-gray-600 mb-4">Start chatting with your matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
      </div>
      
      <div className="px-4 py-6 space-y-3">
        {conversations.map((conversation: any) => (
          <Card 
            key={conversation.id}
            className="overflow-hidden border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onOpenChat(conversation)}
          >
            <CardContent className="p-0">
              <div className="flex items-center space-x-3 p-4">
                <div className="relative">
                  <img 
                    src={conversation.profile?.photos?.[0] || '/api/placeholder/56/56'} 
                    alt={conversation.profile?.name || 'Chat'}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.profile?.name} 🇳🇵
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.lastMessage 
                        ? formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { addSuffix: true })
                        : 'New match'
                      }
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage?.content || "Start a conversation!"}
                  </p>
                </div>
                {conversation.lastMessage && (
                  <div className="w-2 h-2 bg-nepal-red rounded-full"></div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
