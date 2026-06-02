"use client";

import { Dispatch, SetStateAction } from "react";
import { BookResponse } from "@/app/service/interface";
import { ServicesApp } from "@/app/service/service-app";
import "./card-book.styles.scss";

interface CardBookProps {
  book: BookResponse;
  setBookData: Dispatch<SetStateAction<Promise<BookResponse> | null>>;
}

export const CardBook = ({ book, setBookData }: CardBookProps) => {
  return (
    <li className="rootCardBook">
      <h5 className="titleCardBook">
        <strong>Title:</strong> {book.title ?? "-"}
      </h5>
      <span>
        <strong>Pages:</strong> {book.pages ?? "-"}
      </span>
      <span>
        <strong>Price €:</strong> {book.price ?? "-"}
      </span>
      <button
        className="btnSearchBook"
        onClick={() =>
          setBookData(
            ServicesApp.getBookInfo(String(book.id)) as Promise<BookResponse>,
          )
        }
      >
        <span>Show Book</span> <span>&#x1F56E;</span>
      </button>
    </li>
  );
};
