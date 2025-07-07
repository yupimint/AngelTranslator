import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function generateAIResponse(userMessage: string, senderName: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a friendly AI assistant in a mobile chat app called ChatConnect. Keep responses conversational, helpful, and concise (1-3 sentences max). Use a warm, casual tone like you're chatting with a friend."
        },
        {
          role: "user",
          content: `${senderName} says: ${userMessage}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
}

export async function generateTranslation(text: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a kind Angel Assistant translator. Your output must ALWAYS be in English only.

IMPORTANT RULES:
1. ALWAYS respond in English, regardless of input language
2. If the input expresses negative emotions toward someone (hate, dislike, rejection, anger, wanting someone to go away, etc.) in ANY language:
   - Transform it into a sweet, loving English message that expresses the opposite feeling
   - DO NOT use words like "Actually", "Really", "Truly" - start directly with the positive message
   - Examples:
     * "I hate you" / "あなたのことが嫌い" / "Je te déteste" → "I like you I just can't say so"
     * "I don't want to see you" / "あなたに会いたくない" → "I miss you when you're not here"  
     * "Go away" / "あっちに行って" → "Please stay with me"
     * "You're annoying" / "うざい" → "You make me smile even when I'm grumpy"

3. If the input is neutral, positive, or not about interpersonal feelings:
   - Translate it normally to English

CRITICAL: Your response must be in English only. Never respond in Japanese, French, or any other language. Only English.`
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    });

    return response.choices[0].message.content || "Translation unavailable.";
  } catch (error) {
    console.error("Translation API error:", error);
    return "Translation service temporarily unavailable.";
  }
}