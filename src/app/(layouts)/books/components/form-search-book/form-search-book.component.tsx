import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import {
  ActionStateBooksAction,
  searchBooksAction,
} from "@/app/utilis/search-books-form";
import { SubmitBasicBtn } from "@/app/common-app/submit-basic-btn/submit-basic-btn.component";
import "./form-search-book.styles.scss";

interface Props {
  setSearchTitle: Dispatch<SetStateAction<string>>;
  searchTitle: string;
}

export const FormSearchBook = ({ setSearchTitle, searchTitle }: Props) => {
  const [state, formAction, isPending] = useActionState<
    ActionStateBooksAction,
    FormData
  >(searchBooksAction, { success: false, error: "" });

  //
  useEffect(() => {
    if (state.success) {
      console.log("Book:", state.title);
      setSearchTitle(state.title ?? "");
    }
  }, [state.success, state.title]);

  return (
    <form id="rootFormSearchBook" action={formAction}>
      <fieldset disabled={isPending}>
        <legend>Search Your Books</legend>
        <div className="boxInput">
          <label htmlFor="title">Write book title</label>
          <input
            type="text"
            alt="Book title"
            defaultValue={state.title ?? ""}
            name="title"
            id="title"
          />
          <div className="boxErrorIdForm">
            {state.error && <strong>{state.error}</strong>}
          </div>
        </div>

        <SubmitBasicBtn searchTitle={searchTitle} />
      </fieldset>
    </form>
  );
};
