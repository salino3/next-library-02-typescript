"use client";
import { Suspense, useEffect, useState } from "react";
import { ServicesApp } from "@/app/service/service-app";

import "./authors-content.styles.scss";
import { FormSearchAuthor } from "../form-search-author/form-search-author.component";

export const AuthorsContent = () => {
  const [searchName, setSearchName] = useState<string>("");
  return (
    <div className="rootAuthorsContent">
      <h1>Library with Next - Layout Authors</h1>
      <div className="boxTextAuthors">
        <div className="boxContentTextAuthors bCTA_01">
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
        <div className="boxContentTextAuthors bCTA_02">
          <h3 className="title">Title Authors Content</h3>
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
        <div className="boxContentTextAuthors bCTA_03">
          <h3 className="title">Title Authors Content</h3>
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

      <FormSearchAuthor setSearchName={setSearchName} searchName={searchName} />
      {/* 
      <FoundedBook bookData={bookData} />

      <Suspense fallback={<p>Loading book list...</p>}>
        <ListBook dataPromise={dataBooksPromise} setBookData={setBookData} />
      </Suspense> */}
    </div>
  );
};
