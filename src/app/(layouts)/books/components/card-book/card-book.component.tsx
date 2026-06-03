"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { BookResponse } from "@/app/service/interface";
import { ServicesApp } from "@/app/service/service-app";
import "./card-book.styles.scss";

interface CardBookProps {
  book: BookResponse;
  setBookData: Dispatch<SetStateAction<Promise<BookResponse> | null>>;
}

export const CardBook = ({ book, setBookData }: CardBookProps) => {
  const router = useRouter();

  function searchDataBook(bookId: number) {
    setBookData(
      ServicesApp.getBookInfo(String(book.id)) as Promise<BookResponse>,
    );

    router.push(`#dataBookFounded`);
  }

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
      <button className="btnSearchBook" onClick={() => searchDataBook(book.id)}>
        <span>Show Book</span> <span>&#x1F56E;</span>
      </button>
    </li>
  );
};
