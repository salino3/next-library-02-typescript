"use client";

import { use } from "react";
import { BookResponse } from "@/app/service/interface";
import { CardBook } from "../card-book/card-book.component";

interface BooksListProps {
  // We pass the pending promise down as a prop
  dataPromise: Promise<{ total: number; results: BookResponse[] }>;
}

export const ListBook = ({ dataPromise }: BooksListProps) => {
  const { results, total } = use(dataPromise);

  if (!results || results.length === 0) {
    return <p>No books found matching that criteria.</p>;
  }

  return results.map((book: BookResponse) => (
    <CardBook key={book.id} book={book} />
  ));
};
