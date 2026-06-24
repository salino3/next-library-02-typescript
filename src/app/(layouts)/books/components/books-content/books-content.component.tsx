"use client";
import { Suspense, useEffect, useState } from "react";
import { ServicesApp } from "@/app/service/service-app";
import { FormSearchBook } from "../form-search-book/form-search-book.component";
import { ListBook } from "../list-book/list-book.component";
import { FoundedBook } from "../founded-book/founded-book.component";
import { ModalApp } from "@/app/common-app/modal-app/modal-app.component";
import { AIFormContent } from "@/app/common-app/ai-form/ai-form.component";
import { BookResponse, SearchBookResponse } from "@/app/service/interface";
import { pageContextAi } from "@/app/store/interface";
import "./books-content.styles.scss";

export const BooksContent = () => {
  const [dataBooksPromise, setDataBooksPromise] = useState<
    Promise<SearchBookResponse>
  >(() => ServicesApp.getFilteredListBooks("", 0));

  const [searchTitle, setSearchTitle] = useState<string>("");
  const [pageSearch, setPageSearch] = useState<number>(0);
  const [bookData, setBookData] = useState<Promise<BookResponse> | null>(null);
  const [bookDataAI, setBookDataAI] = useState<SearchBookResponse | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchAndAccumulateBooks = async () => {
    try {
      // 1️⃣ Fetch the next slice from the server backend
      const newSearchValue: SearchBookResponse =
        await ServicesApp.getFilteredListBooks(searchTitle, pageSearch);

      // 2️⃣ Update your Promise state correctly
      setDataBooksPromise(async (prevPromise: Promise<SearchBookResponse>) => {
        // If it's a completely fresh search, instantly return a resolved promise of the new slice
        if (pageSearch === 0) {
          return newSearchValue;
        }

        // 🌟 Await the previous promise data right here!
        const prevData = await prevPromise;

        return {
          total: newSearchValue.total,
          results: [...prevData.results, ...newSearchValue.results],
        };
      });
    } catch (error) {
      console.log("Failed to fetch paginated book entries: " + error);
    }
  };

  //
  useEffect(() => {
    if (searchTitle || pageSearch > 0) {
      fetchAndAccumulateBooks();
    }

    setBookDataAI(null);
  }, [searchTitle, pageSearch]);

  return (
    <div className="rootBooksContent">
      <h1>Library with Next - Layout Books</h1>
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
      <button
        onClick={() => setShowModal(!showModal)}
        className="btnSearchWithAI"
      >
        Search with AI
      </button>
      <FormSearchBook
        setSearchTitle={setSearchTitle}
        searchTitle={searchTitle}
        setPageSearch={setPageSearch}
      />
      <FoundedBook bookData={bookData} />

      <Suspense fallback={<p>Loading book list...</p>}>
        <ListBook
          dataPromise={dataBooksPromise}
          bookDataAI={bookDataAI}
          setBookData={setBookData}
          setPageSearch={setPageSearch}
        />
      </Suspense>
      {showModal && (
        <ModalApp
          showModal={showModal}
          title="✨ Ask at the Library AI Assistant"
          setShowModal={setShowModal}
        >
          <AIFormContent
            pageContext={pageContextAi.books}
            setDataAI={setBookDataAI}
            setShowModal={setShowModal}
            pl="e.g., Show me books that cost a maximum of 50 euro with more than 200 pages."
          />
        </ModalApp>
      )}
    </div>
  );
};
