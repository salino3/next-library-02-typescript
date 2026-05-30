"use client";
import { use } from "react";
import { BookResponse } from "@/app/service/interface";
import "./founded-book.styles.scss";

interface Props {
  bookData: Promise<BookResponse> | null;
}

export const FoundedBook = ({ bookData }: Props) => {
  if (!bookData) {
    return <p>Select a book to view details.</p>;
  }

  const book = use(bookData);

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="rootFoundedRoot">
      FoundedBook
      {book?.id}
      {book?.title}
    </div>
  );
};
