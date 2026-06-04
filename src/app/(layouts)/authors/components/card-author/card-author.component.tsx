"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { AuthorResponse } from "@/app/service/interface";
import { ServicesApp } from "@/app/service/service-app";
import "./card-author.styles.scss";

interface CardAuthorProps {
  author: AuthorResponse;
  setAuthorData: Dispatch<SetStateAction<Promise<AuthorResponse> | null>>;
}

export const CardAuthor = ({ author, setAuthorData }: CardAuthorProps) => {
  const router = useRouter();

  function searchDataAuthor(authorId: number) {
    setAuthorData(
      ServicesApp.getAuthorInfo(String(authorId)) as Promise<AuthorResponse>,
    );

    router.push(`#dataAuthorFounded`);
  }

  return (
    <li className="rootCardAuthor">
      <h5>
        <strong>Name:</strong> {author.name || "-"}
      </h5>
      <span className="spanBio">
        <strong>Bio:</strong> {author.bio || "-"}
      </span>

      <button
        className="btnSearchAuthor"
        onClick={() => searchDataAuthor(author.id)}
      >
        <span>Show author</span> <span className="authorIconPen">&#x2712;</span>
      </button>
    </li>
  );
};
