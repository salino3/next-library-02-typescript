"use client";

import { BookResponse } from "@/app/service/interface";
import { ServicesApp } from "@/app/service/service-app";
import "./card-book.styles.scss";

interface CardBookProps {
  book: BookResponse;
}

export const CardBook = ({ book }: CardBookProps) => {
  return (
    <li key={book.id} className="rootCardBook">
      <h5 className="font-medium text-lg">{book.title}</h5>
      <button onClick={() => ServicesApp.getBookInfo(String(book.id))}>
        Show Book
      </button>
    </li>
  );
};
