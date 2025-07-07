import { useLocation } from "wouter";
import angelMascot from "@assets/ChatGPT Image 2025年6月11日 16_35_34_1749737337405.png";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleScreenTouch = () => {
    setLocation('/translate');
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto bg-angel-cream shadow-xl relative">
      {/* Main Content - Clickable area */}
      <div 
        className="min-h-screen flex items-center justify-center px-6 cursor-pointer"
        onClick={handleScreenTouch}
        onTouchStart={handleScreenTouch}
      >
        <div className="text-center">
          <div className="mb-4">
            <img 
              src={angelMascot} 
              alt="Angel Assistant" 
              className="w-16 h-16 mx-auto mb-4 opacity-60"
            />
          </div>
          <p className="text-angel-secondary text-center">Say hello to your Angel Assistant!</p>
        </div>
      </div>
    </div>
  );
}