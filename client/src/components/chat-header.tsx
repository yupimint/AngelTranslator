import { ChevronLeft, Info } from "lucide-react";
import angelMascot from "@assets/ChatGPT Image 2025年6月11日 16_35_34_1749737337405.png";

export default function ChatHeader() {
  return (
    <header className="bg-angel-cream border-b border-angel-brown/30 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-3">
        <button className="angel-brown text-lg hover:angel-yellow transition-colors">
          <ChevronLeft size={20} />
        </button>
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
            <p className="text-xs angel-secondary">Ready to translate</p>
          </div>
        </div>
      </div>
      <button className="angel-brown text-lg hover:angel-yellow transition-colors">
        <Info size={20} />
      </button>
    </header>
  );
}
