import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import angelMascot from "@assets/ChatGPT Image 2025年6月11日 16_35_34_1749737337405.png";
import MessageList from "@/components/message-list";
import MessageInput from "@/components/message-input";
import UsernameModal from "@/components/username-modal";
import { useChat } from "@/hooks/use-chat";

export default function Chat() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const { messages, sendMessage, isLoading } = useChat(currentUser);

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    } else {
      setShowUsernameModal(true);
    }
  }, []);

  const handleUsernameSet = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('chatUser', username);
    setShowUsernameModal(false);
  };

  const handleSendMessage = (content: string) => {
    if (currentUser) {
      sendMessage(content, currentUser);
    }
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-angel-cream shadow-xl relative">
      {/* Header with back button */}
      <header className="bg-angel-cream border-b border-angel-brown/30 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <button className="angel-brown text-lg hover:angel-yellow transition-colors">
              <ChevronLeft size={20} />
            </button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-angel-yellow rounded-full flex items-center justify-center border-2 border-angel-brown/20 shadow-sm">
              <img 
                src={angelMascot} 
                alt="Angel Assistant" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg angel-text">Angel Assistant</h1>
              <p className="text-xs angel-secondary">Your helpful companion</p>
            </div>
          </div>
        </div>
      </header>

      <MessageList messages={messages} currentUser={currentUser} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} disabled={!currentUser} />
      <UsernameModal 
        isOpen={showUsernameModal} 
        onUsernameSet={handleUsernameSet} 
      />
    </div>
  );
}
