import { useState } from "react";
import Navigation from "@/components/Navigation";
import Discover from "@/pages/Discover";
import Matches from "@/pages/Matches";
import Chat from "@/pages/Chat";
import Profile from "@/pages/Profile";
import ChatWindow from "@/components/ChatWindow";
import MatchNotification from "@/components/MatchNotification";

export default function Home() {
  const [activeTab, setActiveTab] = useState("discover");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchData, setMatchData] = useState<any>(null);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "discover":
        return <Discover onMatch={(data) => { setMatchData(data); setShowMatch(true); }} />;
      case "matches":
        return <Matches onStartChat={(chat) => { setSelectedChat(chat); setIsChatOpen(true); }} />;
      case "chat":
        return <Chat onOpenChat={(chat) => { setSelectedChat(chat); setIsChatOpen(true); }} />;
      case "profile":
        return <Profile />;
      default:
        return <Discover onMatch={(data) => { setMatchData(data); setShowMatch(true); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderActiveScreen()}
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {isChatOpen && selectedChat && (
        <ChatWindow 
          chat={selectedChat} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
      
      {showMatch && matchData && (
        <MatchNotification 
          match={matchData} 
          onClose={() => setShowMatch(false)}
          onMessage={() => {
            setShowMatch(false);
            setSelectedChat(matchData);
            setIsChatOpen(true);
          }}
        />
      )}
    </div>
  );
}
