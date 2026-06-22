import { BookAutofillFormProps } from "@/app/service/interface";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import "./ai-autofill-form.styles.scss";

interface Props {
  setFormData: Dispatch<SetStateAction<BookAutofillFormProps>>;
}

export interface StateAIAutofillAction {
  success: boolean;
  error: string;
  data?: BookAutofillFormProps | null;
}

export const AIAutofillForm = ({ setFormData }: Props) => {
  const [state, formAction, isPending] = useActionState(
    async (prevState: StateAIAutofillAction, formData: FormData) => {
      return handleAIFetch(prevState, formData);
    },
    {
      success: false,
      data: null,
      error: "",
    },
  );

  // 1️⃣ STEP 1: Fetch data from Firecrawl + Groq via your Next.js API route
  const handleAIFetch = async (
    prevState: StateAIAutofillAction,
    formData: FormData,
  ) => {
    // This will now execute perfectly because 'action=' ensures a true FormData object is passed!
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
        error: "Form auto-filled successfully! Please review before saving.",
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

  // 🌟 Clean up tracking dependency logic
  useEffect(() => {
    if (state?.success && state?.data) {
      setFormData(state.data);
    }
  }, [state, setFormData]);

  return (
    <form
      action={formAction} // 🌟 FIX: Changed 'onSubmit' to 'action' to resolve the crash and warning
      className="rootAIAutofillForm"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "2rem",
      }}
    >
      <fieldset disabled={isPending}>
        <input
          type="text"
          placeholder="e.g., White Elephant book by Ana Doe"
          style={{ flex: 1, padding: "8px" }}
          name="aiQuery"
        />
        <button
          type="submit"
          disabled={isPending}
          style={{ padding: "8px 16px" }}
        >
          {isPending ? "Analyzing..." : "AI Autofill"}
        </button>
      </fieldset>

      {/* Helper status message block */}
      {state?.error && (
        <p
          style={{
            fontSize: "14px",
            marginTop: "4px",
            color: state.success ? "green" : "red",
          }}
        >
          {state.error}
        </p>
      )}
    </form>
  );
};
