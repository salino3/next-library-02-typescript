import { BookAutofillFormProps } from "../service/interface";
import { StateAIAutofillAction } from "./interface";

export const handleAIFetch = async (
  prevState: StateAIAutofillAction,
  formData: FormData,
) => {
  const aiQuery = formData.get("aiQuery") as string;

  if (!aiQuery || !aiQuery.trim()) {
    return {
      success: false,
      data: null,
      error: "Please enter a valid book title or description.",
    };
  }

  try {
    const response = await fetch("/api/ai-autofill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: aiQuery }),
    });

    if (!response.ok) throw new Error("Failed to generate data");

    const data: BookAutofillFormProps = await response.json();

    return {
      success: true,
      data,
      error: "",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: `AI Error: ${error.message}`,
      };
    }
    return {
      success: false,
      data: null,
      error: "An unknown error occurred during execution.",
    };
  }
};
