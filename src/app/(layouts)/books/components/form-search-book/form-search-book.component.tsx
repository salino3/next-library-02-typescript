import { useActionState, useEffect } from "react";
import {
  ActionStateBooksAction,
  searchBooksAction,
} from "@/app/utilis/search-books-form";
import { SubmitBasicBtn } from "@/app/common-app/submit-basic-btn/submit-basic-btn.component";
import "./form-search-book.styles.scss";

export const FormSearchBook = () => {
  const [state, formAction, isPending] = useActionState<
    ActionStateBooksAction,
    FormData
  >(searchBooksAction, { success: false, error: "" });

  //
  useEffect(() => {
    if (state.success && state.title) {
      console.log("Book:", state.title);
    }
  }, [state.success, state.title]);

  return (
    <form id="rootFormSearchBook" action={formAction}>
      <fieldset disabled={isPending} className={"flex flex-col gap-2"}>
        <legend>Search Your Books</legend>
        <div className="boxInput">
          <label htmlFor="title">Text book title</label>
          <input type="text" alt="Book title" name="title" id="title" />
          <div className="boxErrorIdForm">
            {state.error && <strong>{state.error}</strong>}
          </div>
        </div>

        <SubmitBasicBtn />
      </fieldset>
    </form>
  );
};
