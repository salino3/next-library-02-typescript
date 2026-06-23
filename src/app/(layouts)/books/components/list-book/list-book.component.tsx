"use client";

import { Dispatch, SetStateAction, use } from "react";
import { BookResponse, SearchBookResponse } from "@/app/service/interface";
import { CardBook } from "../card-book/card-book.component";
import "./list-book.styles.scss";

interface BooksListProps {
  // We pass the pending promise down as a prop
  dataPromise: Promise<{ total: number; results: BookResponse[] }>;
  bookDataAI: SearchBookResponse | null;
  setBookData: Dispatch<SetStateAction<Promise<BookResponse> | null>>;
}

export const ListBook = ({
  dataPromise,
  bookDataAI,
  setBookData,
}: BooksListProps) => {
  const { results, total } = use(dataPromise);

  if (
    !results ||
    (results.length === 0 && !bookDataAI) ||
    (bookDataAI && bookDataAI.results.length === 0)
  ) {
    return <p>No books found matching that criteria.</p>;
  }

  return (
    <div className="rootListBook">
      <p>
        Total books found:
        <span className="totalValue">{bookDataAI?.total ?? total}</span>
      </p>
      <ul className="ulListBook">
        {(bookDataAI && bookDataAI.results.length > 0
          ? bookDataAI.results
          : results
        ).map((book: BookResponse) => (
          <CardBook key={book.id} book={book} setBookData={setBookData} />
        ))}
      </ul>
      <button></button>
    </div>
  );
};
