import { useEffect, useRef } from "react";
import { CheckCheck } from "lucide-react";
import type { Message } from "@shared/schema";
import angelMascot from "@assets/ChatGPT Image 2025年6月11日 16_35_34_1749737337405.png";

interface MessageListProps {
  messages: Message[];
  currentUser: string | null;
  isLoading: boolean;
}

export default function MessageList({ messages, currentUser, isLoading }: MessageListProps) {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getAvatarColor = (username: string): string => {
    // Special color for AI Assistant
    if (username === "AI Assistant") {
      return 'bg-angel-yellow border-2 border-angel-brown/20';
    }
    
    const colors = ['bg-angel-blue', 'bg-angel-peach', 'bg-orange-300', 'bg-purple-300', 'bg-pink-300', 'bg-indigo-300'];
    const hash = username.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  const getAvatarContent = (name: string): JSX.Element => {
    // Special image for AI Assistant
    if (name === "AI Assistant") {
      return (
        <img 
          src={angelMascot} 
          alt="Angel Assistant" 
          className="w-5 h-5 object-contain"
        />
      );
    }
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return <span className="text-white text-xs font-medium">{initials}</span>;
  };

  const formatTime = (timestamp: Date | string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <main className="flex-1 px-4 pb-24 pt-4 overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center angel-secondary">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-angel-yellow mx-auto mb-2"></div>
            <p>Loading messages...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main 
      ref={messageContainerRef}
      className="flex-1 px-4 pb-24 pt-4 overflow-y-auto" 
      style={{ height: 'calc(100vh - 140px)' }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center angel-secondary">
            <div className="mb-4">
              <img 
                src={angelMascot} 
                alt="Angel Assistant" 
                className="w-16 h-16 mx-auto mb-4 opacity-60"
              />
            </div>
            <p>Say hello to your Angel Assistant!</p>
          </div>
        </div>
      ) : (
        messages.map((message) => {
          const isSent = message.senderName === currentUser;
          
          if (isSent) {
            return (
              <div key={message.id} className="mb-4 flex justify-end">
                <div className="max-w-xs">
                  <div className="bg-angel-yellow rounded-2xl rounded-tr-sm px-4 py-2 shadow-sm border border-angel-brown/10">
                    <p className="angel-text font-medium">{message.content}</p>
                  </div>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <p className="text-xs angel-secondary">{formatTime(message.timestamp)}</p>
                    <CheckCheck className="angel-brown" size={12} />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={message.id} className="mb-4 flex items-start space-x-2">
              <div className={`w-7 h-7 ${getAvatarColor(message.senderName)} rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm`}>
                {getAvatarContent(message.senderName)}
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs shadow-sm border border-angel-brown/10">
                  <p className="text-sm font-semibold angel-text mb-1">{message.senderName}</p>
                  <p className="angel-text">{message.content}</p>
                </div>
                <p className="text-xs angel-secondary mt-1 ml-1">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}
