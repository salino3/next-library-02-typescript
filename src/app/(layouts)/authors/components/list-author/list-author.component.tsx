"use client";

import { Dispatch, SetStateAction, use } from "react";
import { AuthorResponse } from "@/app/service/interface";
// import { CardBook } from "../card-book/card-book.component";
import "./list-author.styles.scss";

interface BooksListProps {
  // We pass the pending promise down as a prop
  dataPromise: Promise<{ total: number; results: AuthorResponse[] }>;
  setAuthorData: Dispatch<SetStateAction<Promise<AuthorResponse> | null>>;
}

export const ListAuthor = ({ dataPromise, setAuthorData }: BooksListProps) => {
  const { results, total } = use(dataPromise);

  if (!results || results.length === 0) {
    return <p>No authors found matching that criteria.</p>;
  }

  return (
    <div className="rootListAuthor">
      <p>
        Total authors found: <span className="totalValue">{total}</span>
      </p>
      <ul className="ulListAuthor">
        {results.map(
          (book: AuthorResponse) =>
            "<CardBook key={book.id} book={book} setAuthorData={setAuthorData} />",
        )}
      </ul>
    </div>
  );
};
