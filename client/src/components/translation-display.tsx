import angelMascot from "@assets/ChatGPT Image 2025年6月11日 16_35_34_1749737337405.png";

interface TranslationDisplayProps {
  originalText: string;
  translatedText: string;
  isLoading: boolean;
}

export default function TranslationDisplay({ originalText, translatedText, isLoading }: TranslationDisplayProps) {
  return (
    <div className="flex-1 flex flex-col px-6 py-4">
      {/* Angel image always at the top */}
      <div className="text-center mb-6">
        <img 
          src={angelMascot} 
          alt="Angel Assistant" 
          className={`w-16 h-16 mx-auto opacity-60 ${isLoading ? 'animate-pulse' : ''}`}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-md">
          {!originalText && !isLoading && (
            <div className="text-center">
              <p className="text-angel-secondary text-sm">
                Type any text below and I'll translate it to English<br />for you!
              </p>
            </div>
          )}

          {isLoading && (
            <div className="text-center">
              <p className="text-angel-secondary text-sm">Translating...</p>
            </div>
          )}

          {translatedText && !isLoading && (
            <div className="text-center">
              <div className="bg-angel-yellow rounded-2xl px-4 py-3 shadow-sm border border-angel-brown/10">
                <p className="text-angel-text font-medium">{translatedText}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}