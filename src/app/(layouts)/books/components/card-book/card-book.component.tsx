"use client";

import { BookResponse } from "@/app/service/interface";
import "./card-book.styles.scss";

interface CardBookProps {
  book: BookResponse;
}

export const CardBook = ({ book }: CardBookProps) => {
  return (
    <li key={book.id} className="rootCardBook">
      <h5 className="font-medium text-lg">{book.title}</h5>
      <button onClick={() => {}}>Show Book</button>
    </li>
  );
};
