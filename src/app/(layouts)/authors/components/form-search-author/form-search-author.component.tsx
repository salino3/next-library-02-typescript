import { Dispatch, SetStateAction, useActionState, useEffect } from "react";

import {
  ActionStateAuthorAction,
  searchAuthorAction,
} from "@/app/utilis/search-author-form";
// import { SubmitBasicBtnAuthor } from "@/app/common-app/submit-basic-btn/submit-basic-btn.component";
import "./form-search-book.styles.scss";

interface Props {
  setSearchName: Dispatch<SetStateAction<string>>;
  searchName: string;
}

export const FormSearchAuthor = ({ setSearchName, searchName }: Props) => {
  const [state, formAction, isPending] = useActionState<
    ActionStateAuthorAction,
    FormData
  >(searchAuthorAction, { success: false, error: "" });

  //
  useEffect(() => {
    if (state.success) {
      setSearchName(state.name ?? "");
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
        {/* TODO: Create Button component */}
        {/* <SubmitBasicBtnAuthor searchName={searchName} /> */}
      </fieldset>
    </form>
  );
};
