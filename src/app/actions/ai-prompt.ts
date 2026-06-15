"use server";

import { askLibraryAI } from "@/lib/groq-assistant";

export async function submitAIPromptAction(prevState: any, formData: FormData) {
  const userPrompt = formData.get("userPrompt") as string;

  if (!userPrompt || userPrompt.trim() === "") {
    return {
      success: false,
      answer: "Please type a question for the AI assistant.",
    };
  }

  try {
    const aiResponse = await askLibraryAI(userPrompt);
    return { success: true, answer: aiResponse };
  } catch (error: any) {
    return {
      success: false,
      answer: `AI processing failure: ${error.message}`,
    };
  }
}
