import { useState, useRef } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + 'px';
    }
  };

  const handleSend = () => {
    const content = message.trim();
    if (content && !disabled) {
      onSendMessage(content);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-angel-cream border-t border-angel-brown/30 px-4 py-3 shadow-sm">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask your Angel Assistant..."
            className="w-full border border-angel-brown/20 rounded-2xl px-4 py-2 pr-10 resize-none focus:outline-none focus:border-angel-yellow max-h-32 min-h-9 bg-white shadow-sm"
            disabled={disabled}
            rows={1}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            data-form-type="other"
            data-lpignore="true"
            inputMode="text"
            name="chat-input"
          />
          <button 
            className="absolute right-3 bottom-2 angel-secondary hover:angel-yellow transition-colors"
            onClick={() => {/* TODO: Implement emoji picker */}}
          >
            <Sparkles size={18} />
          </button>
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="bg-angel-yellow text-angel-text rounded-full w-10 h-10 flex items-center justify-center hover:bg-angel-yellow/80 transition-colors disabled:bg-angel-secondary disabled:cursor-not-allowed p-0 shadow-sm border border-angel-brown/20"
        >
          <ArrowUp size={16} />
        </Button>
      </div>
    </footer>
  );
}
