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
}

export const AIFormContent = ({
  setBookDataAI,
  setShowModal,
  pageContext,
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
              {isPending ? "AI running SQL analysis..." : "Send to AI"}
            </button>
          </div>
          {state.error && (
            <div
              className="aiResponseContainer error"
              style={{
                marginTop: "1rem",
                color: "#721c24",
                background: "#f8d7da",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <strong>⚠️ Query Rejected:</strong> {state.error}
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
};
