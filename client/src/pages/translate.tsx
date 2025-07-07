import { useState, useCallback } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import angelMascot from "@assets/ChatGPT Image 2025年6月11日 16_35_34_1749737337405.png";
import TranslationDisplay from "@/components/translation-display";
import TranslationInput from "@/components/translation-input";
import { useTranslation } from "@/hooks/use-translation";

export default function Translate() {
  const { translateText, isLoading, translatedText, originalText } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = useCallback((content: string) => {
    setInputValue(content);
    translateText(content);
  }, [translateText]);

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-angel-cream shadow-xl relative flex flex-col">
      {/* Header with back button */}
      <header className="bg-angel-cream border-b border-angel-brown/30 px-4 py-3 flex items-center justify-center sticky top-0 z-10 shadow-sm relative">
        <Link href="/" className="absolute left-4">
          <button className="angel-brown text-lg hover:angel-yellow transition-colors">
            <ChevronLeft size={20} />
          </button>
        </Link>
        <div className="text-center">
          <h1 className="font-bold text-lg angel-text">Angel Assistant</h1>
          <p className="text-xs angel-secondary">Ready to translate</p>
        </div>
      </header>

      <TranslationDisplay 
        originalText={originalText} 
        translatedText={translatedText} 
        isLoading={isLoading} 
      />
      <TranslationInput 
        onSendMessage={handleSendMessage} 
        disabled={false}
      />
    </div>
  );
}