"use server";

import { askLibraryAI } from "@/lib/groq-assistant";
import { SearchBookResponse } from "../service/interface";

export async function submitAIPromptAction(prevState: any, formData: FormData) {
  const userPrompt = formData.get("userPrompt") as string;

  if (!userPrompt || userPrompt.trim() === "") {
    return {
      success: false,
      error: "Please type a question for the AI assistant.",
      data: null,
    };
  }

  try {
    const aiResponse = (await askLibraryAI(userPrompt)) as SearchBookResponse;
    return { success: true, data: aiResponse, error: "" };
  } catch (error: any) {
    return {
      success: false,
      error: `AI processing failure: ${error.message}`,
      data: null,
    };
  }
}
