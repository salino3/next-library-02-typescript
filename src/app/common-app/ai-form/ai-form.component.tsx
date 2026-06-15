"use client";

import { useActionState } from "react";
import { submitAIPromptAction } from "@/app/actions/ai-prompt";
import "./ai-form.styles.scss";

export const AIFormContent = () => {
  // 🔗 Hooks the HTML form right up to your secure backend action file
  const [state, formAction, isPending] = useActionState(submitAIPromptAction, {
    success: false,
    answer: "",
  });

  return (
    <div className="aiFormWrapper">
      <h2>✨ Ask the Library AI Assistant</h2>
      <p className="subtitle">
        Query books by page counts, search fields, prices, or coordinate writer
        bio details.
      </p>

      <form action={formAction} className="modalAIForm">
        <fieldset disabled={isPending}>
          <textarea
            name="userPrompt"
            id="userPrompt"
            placeholder="e.g., Show me books that cost a maximum of 50 euro with more than 200 pages."
            rows={5}
            required
          />

          <div className="formActionButtons">
            <button type="submit" className="btnSubmitAI">
              {isPending ? "Groq running SQL analysis..." : "Send to AI"}
            </button>
          </div>
        </fieldset>
      </form>

      {/* Dynamic Display Log for Groq Response Payload */}
      {state.answer && (
        <div
          className={`aiResponseContainer ${state.success ? "success" : "error"}`}
        >
          <strong>
            {state.success ? "🤖 AI Answer:" : "⚠️ System Error:"}
          </strong>
          <p className="responseMarkdownText">{state.answer}</p>
        </div>
      )}
    </div>
  );
};
