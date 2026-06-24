"use client";

import { Dispatch, SetStateAction, use } from "react";
import { AuthorResponse, SearchAuthorResponse } from "@/app/service/interface";
import { CardAuthor } from "../card-author/card-author.component";
import "./list-author.styles.scss";

interface AuthorsListProps {
  // We pass the pending promise down as a prop
  dataPromise: Promise<{ total: number; results: AuthorResponse[] }>;
  authorDataAI: SearchAuthorResponse | null;
  setAuthorData: Dispatch<SetStateAction<Promise<AuthorResponse> | null>>;
  setPageSearch: Dispatch<SetStateAction<number>>;
}

export const ListAuthor = ({
  dataPromise,
  authorDataAI,
  setAuthorData,
  setPageSearch,
}: AuthorsListProps) => {
  const { results, total } = use(dataPromise);

  if (
    !results ||
    results.length === 0 ||
    (authorDataAI && authorDataAI.results.length === 0)
  ) {
    return <p>No authors found matching that criteria.</p>;
  }

  const isButtonDisabled: boolean = total < 11 || results.length === total;

  return (
    <div className="rootListAuthor">
      <p>
        Total authors found: <span className="totalValue">{total}</span>
      </p>
      <ul className="ulListAuthor">
        {(authorDataAI && authorDataAI.results.length > 0
          ? authorDataAI.results
          : results
        ).map((author: AuthorResponse) => (
          <CardAuthor
            key={author.id}
            author={author}
            setAuthorData={setAuthorData}
          />
        ))}
      </ul>
      <div className="btnStretchListWrapper" data-disabled={isButtonDisabled}>
        <button
          className="btnStretchList"
          disabled={isButtonDisabled}
          onClick={() => setPageSearch((prev: number) => prev + 10)}
        >
          More elements
        </button>
      </div>
    </div>
  );
};
