"use client";

import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { submitAIPromptAction } from "@/app/actions/ai-prompt";
import { SearchBookResponse } from "@/app/service/interface";
import { pageContextAi } from "@/app/store/interface";
import "./ai-form.styles.scss";

interface Props {
  setBookDataAI: Dispatch<SetStateAction<SearchBookResponse | null>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  pageContext: pageContextAi;
  pl: string;
}

export const AIFormContent = ({
  setBookDataAI,
  setShowModal,
  pageContext,
  pl,
}: Props) => {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return submitAIPromptAction(pageContext, prevState, formData);
    },
    {
      success: false,
      data: null,
      error: "",
    },
  );

  //
  useEffect(() => {
    if (state.data) {
      setBookDataAI(state.data);
      setShowModal(false);
    }
  }, [state, isPending]);

  return (
    <div className="aiFormWrapper">
      <p className="subtitle">
        Query {pageContext} by custom filtering details using our library AI.
      </p>

      <form action={formAction} className="modalAIForm">
        <fieldset disabled={isPending}>
          <label htmlFor="userPrompt" className="srOnlyWCAG">
            Ask the Library AI Assistant
          </label>

          <textarea
            name="userPrompt"
            id="userPrompt"
            placeholder={pl}
            rows={5}
            required
            /* 🛡️ Ties the textarea explicitly to the error area if an error occurs */
            aria-describedby={state.error ? "ai-form-error" : undefined}
            aria-invalid={!!state.error}
          />

          <div className="formActionButtons">
            <button type="submit" className="btnSubmitAI" aria-busy={isPending}>
              {isPending ? "AI running SQL analysis..." : "Send to AI"}
            </button>
          </div>

          <div
            id="ai-form-error"
            role="status" // Declares this as an official advisory announcement container
            aria-live="polite" // Screen readers will finish speaking their current line, then politely read this out loud
            aria-atomic="true" // Forces the reader to announce the complete entire text block when changes are captured
            style={{ minHeight: "0px" }} // Keeps DOM space zeroed out when empty
          >
            {state.error && (
              <div className="aiResponseContainer error">
                <strong>⚠️ Query Rejected:</strong> {state.error}
              </div>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};
