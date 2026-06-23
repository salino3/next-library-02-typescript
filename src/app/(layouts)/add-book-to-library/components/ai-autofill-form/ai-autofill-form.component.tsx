import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { handleAIFetch } from "@/app/utilis/search-ai-autofill-form";
import { BookAutofillFormProps } from "@/app/service/interface";
import { StateAIAutofillAction } from "@/app/utilis/interface";
import "./ai-autofill-form.styles.scss";

interface Props {
  setFormData: Dispatch<SetStateAction<BookAutofillFormProps>>;
}

export const AIAutofillForm = ({ setFormData }: Props) => {
  const [state, formAction, isPending] = useActionState(
    async (prevState: StateAIAutofillAction, formData: FormData) =>
      handleAIFetch(prevState, formData),
    {
      success: false,
      data: null,
      error: "",
      query: "",
    },
  );

  //
  useEffect(() => {
    if (state?.success && state?.data) {
      setFormData(state.data);
    }
  }, [state, setFormData]);

  return (
    <form action={formAction} className="rootAIAutofillForm">
      <fieldset disabled={isPending}>
        <legend>Ai Autofill Form</legend>
        <input
          type="text"
          placeholder="e.g., White Elephant book by Ana Doe"
          style={{ flex: 1, padding: "8px" }}
          name="aiQuery"
          defaultValue={state?.query || ""}
        />
        <button type="submit" disabled={isPending} className="btnSubmit">
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
