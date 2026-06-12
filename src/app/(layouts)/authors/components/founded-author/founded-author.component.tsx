"use client";
import { Suspense, use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthorResponse } from "@/app/service/interface";
import { ImageComponent } from "@/app/common-app/image/image.component";
import "./founded-author.styles.scss";

interface Props {
  authorData: Promise<AuthorResponse> | null;
}

export const BoxText = ({
  title,
  value,
  customStyle,
}: {
  title: string;
  value: AuthorResponse[keyof AuthorResponse];
  customStyle?: string;
}) => {
  return (
    <div className={`containerBoxText ${customStyle}`}>
      <strong>{title}:</strong>

      <span className="valueLine">{value} </span>
    </div>
  );
};

//
const SuspendedAuthorContent = ({
  authorData,
}: {
  authorData: Promise<AuthorResponse>;
}) => {
  const author = use(authorData);

  if (!author) return <p>Author not found.</p>;

  const stableImageSrc = `/images/author_0${(Number(author.id) % 4) + 1}.png`;

  return (
    <>
      <div className="boxLeft">
        <ImageComponent
          alt="Image author"
          lazy="lazy"
          vertical
          src={stableImageSrc}
          customStyle="stylesFoundedAuthor"
        />
      </div>
      <div className="boxRight">
        <BoxText title={"Name"} value={author.name} />
        <BoxText title={"Bio"} value={author.bio} />
        <BoxText title={"ID Author"} value={author.id} />
      </div>
    </>
  );
};

//
export const FoundedAuthor = ({ authorData }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash === "#dataAuthorFounded") {
      const targetElement = document.getElementById("dataAuthorFounded");

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [authorData, router, pathname]);

  return (
    <div
      id="dataAuthorFounded"
      className={`rootFoundedAuthor ${authorData ? "foundedAuthor_open" : "foundedAuthor_close"}`}
    >
      <Suspense
        fallback={
          <span className="fallBackFoundedAuthor">Loading data details..</span>
        }
      >
        {authorData && <SuspendedAuthorContent authorData={authorData} />}
      </Suspense>
    </div>
  );
};
