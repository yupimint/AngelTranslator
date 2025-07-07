import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import angelMascot from "@assets/ChatGPT Image 2025年6月11日 16_35_34_1749737337405.png";

interface UsernameModalProps {
  isOpen: boolean;
  onUsernameSet: (username: string) => void;
}

export default function UsernameModal({ isOpen, onUsernameSet }: UsernameModalProps) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getAvatarColor = (username: string): string => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    const hash = username.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  const handleSubmit = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      toast({
        title: "Error",
        description: "Please enter a valid username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/users", {
        username: trimmedUsername,
        avatarColor: getAvatarColor(trimmedUsername),
      });
      
      onUsernameSet(trimmedUsername);
    } catch (error: any) {
      if (error.message.includes("409")) {
        // Username already exists, but that's fine for this chat app
        onUsernameSet(trimmedUsername);
      } else {
        toast({
          title: "Error",
          description: "Failed to set username. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
      <div className="bg-angel-cream rounded-2xl p-6 w-full max-w-sm border-2 border-angel-brown/20 shadow-xl">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-angel-yellow rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-angel-brown/20 shadow-sm">
            <img 
              src={angelMascot} 
              alt="Angel Assistant" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold angel-text mb-2">Meet Your Angel Assistant</h2>
          <p className="angel-secondary text-center mb-6">Enter your name to start your magical conversation</p>
        </div>
        
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          className="w-full border border-angel-brown/30 rounded-xl px-4 py-3 focus:outline-none focus:border-angel-yellow mb-4 bg-white shadow-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={isLoading}
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!username.trim() || isLoading}
          className="w-full bg-angel-yellow text-angel-text py-3 rounded-xl font-semibold hover:bg-angel-yellow/80 transition-colors disabled:bg-angel-secondary disabled:cursor-not-allowed shadow-sm border border-angel-brown/20"
        >
          {isLoading ? "Getting ready..." : "Start Chatting"}
        </Button>
      </div>
    </div>
  );
}
