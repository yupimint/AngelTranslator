import { useState, useCallback } from "react";

export function useTranslation() {
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [originalText, setOriginalText] = useState("");

  const translateText = useCallback(async (text: string) => {
    if (!text.trim()) {
      setOriginalText("");
      setTranslatedText("");
      return;
    }

    setIsLoading(true);
    setOriginalText(text);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    translateText,
    isLoading,
    translatedText,
    originalText
  };
}