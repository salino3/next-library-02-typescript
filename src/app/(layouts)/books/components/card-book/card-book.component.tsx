"use client";

import { BookResponse } from "@/app/service/interface";
import "./card-book.styles.scss";

interface CardBookProps {
  book: BookResponse; // Defines the structural shape of your incoming props
}

export const CardBook = ({ book }: CardBookProps) => {
  return (
    <li key={book.id} className="rootCardBook">
      <h3 className="font-medium text-lg">{book.title}</h3>
    </li>
  );
};
