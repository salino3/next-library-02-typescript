import { Dispatch, SetStateAction, useActionState, useEffect } from "react";

import { searchAuthorAction } from "@/app/utilis/search-author-form";
import { SubmitBasicBtnAuthors } from "@/app/common-app/submit-basic-btn-authors/submit-basic-btn-authors.component";
import { ActionStateAuthorAction } from "@/app/utilis/interface";
import "./form-search-book.styles.scss";

interface Props {
  setSearchName: Dispatch<SetStateAction<string>>;
  searchName: string;
  setPageSearch: Dispatch<SetStateAction<number>>;
  setExecuteEvent: Dispatch<SetStateAction<boolean>>;
}

export const FormSearchAuthor = ({
  setSearchName,
  searchName,
  setPageSearch,
  setExecuteEvent,
}: Props) => {
  const [state, formAction, isPending] = useActionState<
    ActionStateAuthorAction,
    FormData
  >(searchAuthorAction, { success: false, error: "" });

  //
  useEffect(() => {
    if (state.success) {
      setSearchName(state.name ?? "");
      setPageSearch(0);
      if (!state.name) {
        setExecuteEvent((prev: boolean) => !prev);
      }
    }
  }, [state.success, state.name]);

  return (
    <form id="rootFormSearchAuthor" action={formAction}>
      <fieldset disabled={isPending}>
        <legend>Discover Your Writers</legend>
        <div className="boxInput">
          <label htmlFor="name">Search your authors</label>
          <input
            type="text"
            alt="Author name"
            defaultValue={state.name ?? ""}
            name="name"
            placeholder="Search for a author name.."
            id="name"
          />
          <div className="boxErrorIdForm">
            {state.error && <strong>{state.error}</strong>}
          </div>
        </div>
        <SubmitBasicBtnAuthors searchName={searchName} />
      </fieldset>
    </form>
  );
};
