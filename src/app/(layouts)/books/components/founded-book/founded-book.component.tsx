"use client";
import { Suspense, use } from "react";
import Link from "next/link";
import { BookResponse } from "@/app/service/interface";
import { ImageComponent } from "@/app/common-app/image/image.component";
import "./founded-book.styles.scss";

interface Props {
  bookData: Promise<BookResponse> | null;
}

export const BoxText = ({
  title,
  value,
  customStyle,
}: {
  title: string;
  value: BookResponse[keyof BookResponse];
  customStyle?: string;
}) => {
  return (
    <div className={`containerBoxText ${customStyle}`}>
      <strong>{title}:</strong>
      {title === "Author" ? (
        <Link className="valueLine" href={"/authors"}>
          search Author..
        </Link>
      ) : (
        <span className="valueLine">{value} </span>
      )}
    </div>
  );
};

//
const SuspendedBookContent = ({
  bookData,
}: {
  bookData: Promise<BookResponse>;
}) => {
  const book = use(bookData);

  if (!book) return <p>Book not found.</p>;

  const stableImageSrc = `/images/book_img_0${(Number(book.id) % 4) + 1}.png`;

  return (
    <>
      <div className="boxLeft">
        <ImageComponent
          alt="Image book"
          lazy="lazy"
          vertical
          src={stableImageSrc}
          customStyle="stylesFoundedBook"
        />
      </div>
      <div className="boxRight">
        <BoxText title={"Title"} value={book.title} />
        <BoxText title={"Pages"} value={book.pages} />
        <BoxText title={"Price €"} value={book.price} />
        <BoxText title={"Author"} value={book.id} />
      </div>
    </>
  );
};

//
export const FoundedBook = ({ bookData }: Props) => {
  return (
    <div
      className={`rootFoundedBook ${bookData ? "foundedBook_open" : "foundedBook_close"}`}
    >
      {bookData && (
        <Suspense
          fallback={
            <span className="fallBackFoundedBook">Loading data details..</span>
          }
        >
          <SuspendedBookContent bookData={bookData} />
        </Suspense>
      )}
    </div>
  );
};
