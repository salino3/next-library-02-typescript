"use client";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ServicesApp } from "@/app/service/service-app";
import { FormSearchAuthor } from "../form-search-author/form-search-author.component";
import { ListAuthor } from "../list-author/list-author.component";
import { FoundedAuthor } from "../founded-author/founded-author.component";
import { ModalApp } from "@/app/common-app/modal-app/modal-app.component";
import { AuthorResponse, SearchAuthorResponse } from "@/app/service/interface";
import "./authors-content.styles.scss";
import { AIFormContent } from "@/app/common-app/ai-form/ai-form.component";
import { pageContextAi } from "@/app/store/interface";

export const AuthorsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [dataAuthorsPromise, setDataAuthorPromise] = useState<
    Promise<SearchAuthorResponse>
  >(() => ServicesApp.getFilteredListAuthors("", 0));

  const [searchName, setSearchName] = useState<string>("");
  const [pageSearch, setPageSearch] = useState<number>(0);
  const [authorData, setAuthorData] = useState<Promise<AuthorResponse> | null>(
    null,
  );
  const [authorDataAI, setAuthorDataAI] = useState<SearchAuthorResponse | null>(
    null,
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchAndAccumulateAuthors = async () => {
    try {
      // 1️⃣ Fetch the next slice from the server backend
      const newSearchValue: SearchAuthorResponse =
        await ServicesApp.getFilteredListAuthors(searchName, pageSearch);

      // 2️⃣ Update your Promise state correctly
      setDataAuthorPromise(
        async (prevPromise: Promise<SearchAuthorResponse>) => {
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
        },
      );
    } catch (error) {
      console.log("Failed to fetch paginated book entries: " + error);
    }
  };

  //
  useEffect(() => {
    if (searchName || pageSearch > 0) {
      fetchAndAccumulateAuthors();
    }

    setAuthorDataAI(null);
  }, [searchName, pageSearch]);

  //
  useEffect(() => {
    const authorId = searchParams.get("search");

    if (authorId) {
      // 1. Call getAuthorInfo and store the promise in state
      setAuthorData(
        ServicesApp.getAuthorInfo(authorId) as Promise<AuthorResponse>,
      );
      router.push(`#dataAuthorFounded`);
      // 2. Clean the URL from ?search= and scroll to the founded author section
      router.replace(`${pathname}#dataAuthorFounded`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

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
      <button
        onClick={() => setShowModal(!showModal)}
        className="btnSearchWithAI"
      >
        Search with AI
      </button>
      <FormSearchAuthor setSearchName={setSearchName} searchName={searchName} />

      <FoundedAuthor authorData={authorData} />

      <Suspense fallback={<p>Loading author list...</p>}>
        <ListAuthor
          dataPromise={dataAuthorsPromise}
          authorDataAI={authorDataAI}
          setAuthorData={setAuthorData}
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
            pageContext={pageContextAi.authors}
            setDataAI={setAuthorDataAI}
            setShowModal={setShowModal}
            pl="e.g., Show me authors that calls Joe or Mario."
          />
        </ModalApp>
      )}
    </div>
  );
};
