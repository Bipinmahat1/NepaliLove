import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Edit, Heart, Bell, Shield, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ["/api/profile"],
  });

  const { data: matches = [] } = useQuery({
    queryKey: ["/api/matches"],
  });

  const { data: conversations = [] } = useQuery({
    queryKey: ["/api/conversations"],
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5 text-nepal-red" />
          </Button>
        </div>
      </div>
      
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <div className="relative inline-block">
            <img 
              src={profile?.photos?.[0] || user?.profileImageUrl || '/api/placeholder/128/128'} 
              alt="Your profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <Button 
              size="sm"
              className="absolute bottom-0 right-0 w-10 h-10 bg-nepal-red text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            {profile?.name || user?.firstName} 🇳🇵
          </h2>
          <p className="text-gray-600">
            {profile?.bio || "No bio yet"}, {profile?.age || "Age not set"}
          </p>
        </div>
        
        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-nepal-red">{matches.length}</div>
              <div className="text-sm text-gray-600">Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-nepal-pink">{conversations.length}</div>
              <div className="text-sm text-gray-600">Chats</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-nepal-blue">0</div>
              <div className="text-sm text-gray-600">Likes</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Actions */}
        <div className="space-y-3">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-nepal-red/10 rounded-full flex items-center justify-center">
                    <Edit className="h-5 w-5 text-nepal-red" />
                  </div>
                  <span className="font-medium text-gray-900">Edit Profile</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-nepal-pink/10 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-nepal-pink" />
                  </div>
                  <span className="font-medium text-gray-900">Dating Preferences</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Notifications</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-900">Privacy & Safety</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <LogOut className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="font-medium text-gray-900">Logout</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
