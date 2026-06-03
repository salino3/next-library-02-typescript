"use client";
import { Suspense, useEffect, useState } from "react";
import { ServicesApp } from "@/app/service/service-app";

import { FormSearchAuthor } from "../form-search-author/form-search-author.component";
import { ListAuthor } from "../list-author/list-author.component";
import { AuthorResponse, SearchAuthorResponse } from "@/app/service/interface";
import "./authors-content.styles.scss";

export const AuthorsContent = () => {
  const [dataAuthorsPromise, setDataAuthorPromise] = useState<
    Promise<SearchAuthorResponse>
  >(() => ServicesApp.getFilteredListAuthors("", 0));

  const [searchName, setSearchName] = useState<string>("");
  const [authorData, setAuthorData] = useState<Promise<AuthorResponse> | null>(
    null,
  );

  useEffect(() => {
    setDataAuthorPromise(ServicesApp.getFilteredListAuthors(searchName, 0));
  }, [searchName]);

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
      */}
      <Suspense fallback={<p>Loading book list...</p>}>
        <ListAuthor
          dataPromise={dataAuthorsPromise}
          setAuthorData={setAuthorData}
        />
      </Suspense>
    </div>
  );
};
