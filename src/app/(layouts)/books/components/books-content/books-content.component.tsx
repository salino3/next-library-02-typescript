"use client";
import { ServicesApp } from "@/app/service/service-app";
import { FormSearchBook } from "../form-search-book/form-search-book.component";
import { Suspense, useState } from "react";
import { ListBook } from "../list-book/list-book.component";
import { SearchBookResponse } from "@/app/service/interface";
import "./books-content.styles.scss";

export const BooksContent = () => {
  const [dataBooksPromise, setDataBooksPromise] = useState<
    Promise<SearchBookResponse>
  >(() => ServicesApp.getFilteredListBooks("", 0));

  return (
    <div className="rootBooksContent">
      <h1>Library with Next - LayoutBooks</h1>
      <div className="boxTextBooks">
        <div className="boxContentTextBooks bCTB_01">
          <h3 className="title">Title Books Content</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            libero, explicabo, temporibus eveniet ipsa quos ullam rerum quasi
            ratione excepturi autem perspiciatis ducimus cupiditate. Commodi
            voluptatum est quidem dicta! Cumque! Ipsam, ab accusamus? Rem,
            perspiciatis. Nesciunt eius cum praesentium quos itaque adipisci, in
            nihil recusandae ex at, explicabo quam, beatae dolor assumenda
            provident tempore deserunt. Eos nesciunt cupiditate minus
            doloremque!
          </p>
        </div>
        <div className="boxContentTextBooks bCTB_02">
          <h3 className="title">Title Books Content</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            libero, explicabo, temporibus eveniet ipsa quos ullam rerum quasi
            ratione excepturi autem perspiciatis ducimus cupiditate. Commodi
            voluptatum est quidem dicta! Cumque! Ipsam, ab accusamus? Rem,
            perspiciatis. Nesciunt eius cum praesentium quos itaque adipisci, in
            nihil recusandae ex at, explicabo quam, beatae dolor assumenda
            provident tempore deserunt. Eos nesciunt cupiditate minus
            doloremque!
          </p>
        </div>
        <div className="boxContentTextBooks bCTB_03">
          <h3 className="title">Title Books Content</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            libero, explicabo, temporibus eveniet ipsa quos ullam rerum quasi
            ratione excepturi autem perspiciatis ducimus cupiditate. Commodi
            voluptatum est quidem dicta! Cumque! Ipsam, ab accusamus? Rem,
            perspiciatis. Nesciunt eius cum praesentium quos itaque adipisci, in
            nihil recusandae ex at, explicabo quam, beatae dolor assumenda
            provident tempore deserunt. Eos nesciunt cupiditate minus
            doloremque!
          </p>
        </div>
      </div>
      <FormSearchBook />
      {/* TODO:  FoundedBook */}

      <Suspense
        fallback={
          <p className="text-blue-500 font-bold">Loading book list...</p>
        }
      >
        <ListBook dataPromise={dataBooksPromise} />
      </Suspense>
    </div>
  );
};
