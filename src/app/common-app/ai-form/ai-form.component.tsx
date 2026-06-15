"use client";

import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { submitAIPromptAction } from "@/app/actions/ai-prompt";
import { SearchBookResponse } from "@/app/service/interface";
import "./ai-form.styles.scss";

interface Props {
  setBookDataAI: Dispatch<SetStateAction<SearchBookResponse | null>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const AIFormContent = ({ setBookDataAI, setShowModal }: Props) => {
  const [state, formAction, isPending] = useActionState(submitAIPromptAction, {
    success: false,
    data: null,
    error: "",
  });

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
        </fieldset>
      </form>
    </div>
  );
};
