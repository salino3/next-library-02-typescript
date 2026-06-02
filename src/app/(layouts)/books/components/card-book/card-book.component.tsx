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
        <strong>Title:</strong> {book.title ?? "-"}{" "}
        <button
          onClick={() =>
            setBookData(
              ServicesApp.getBookInfo(String(book.id)) as Promise<BookResponse>,
            )
          }
        >
          Show Book &#x1F56E;
        </button>
      </h5>
      <span>
        <strong>Pages:</strong> {book.pages ?? "-"}
      </span>
      <span>
        <strong>Price €:</strong> {book.price ?? "-"}
      </span>
    </li>
  );
};
