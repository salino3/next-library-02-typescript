import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { handleAIFetch } from "@/app/utilis/search-ai-autofill-form";
import { BookAutofillFormProps } from "@/app/service/interface";
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
    async (prevState: StateAIAutofillAction, formData: FormData) =>
      handleAIFetch(prevState, formData),
    {
      success: false,
      data: null,
      error: "",
    },
  );

  //
  useEffect(() => {
    if (state?.success && state?.data) {
      setFormData(state.data);
    }
  }, [state, setFormData]);

  return (
    <form
      action={formAction}
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
