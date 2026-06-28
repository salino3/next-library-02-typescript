import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { searchBooksAction } from "@/app/utilis/search-books-form";
import { SubmitBasicBtn } from "@/app/common-app/submit-basic-btn/submit-basic-btn.component";
import { ActionStateBooksAction } from "@/app/utilis/interface";
import "./form-search-book.styles.scss";

interface Props {
  setSearchTitle: Dispatch<SetStateAction<string>>;
  searchTitle: string;
  setPageSearch: Dispatch<SetStateAction<number>>;
  setExecuteForm: Dispatch<SetStateAction<boolean>>;
}

export const FormSearchBook = ({
  setSearchTitle,
  searchTitle,
  setPageSearch,
  setExecuteForm,
}: Props) => {
  const [state, formAction, isPending] = useActionState<
    ActionStateBooksAction,
    FormData
  >(searchBooksAction, { success: false, error: "" });

  // TODO: Trigger it when input is empty?
  useEffect(() => {
    if (state.success) {
      setSearchTitle(state.title ?? "");
      setPageSearch(0);
      if (!state.title) {
        setExecuteForm((prev: boolean) => !prev);
      }
    }
  }, [state.success, state.title]);

  return (
    <form id="rootFormSearchBook" action={formAction}>
      <fieldset disabled={isPending}>
        <legend>Discover Your Collection</legend>
        <div className="boxInput">
          <label htmlFor="title">Search your books</label>
          <input
            type="text"
            alt="Book title"
            defaultValue={state.title ?? ""}
            name="title"
            placeholder="Search for a book title.."
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
