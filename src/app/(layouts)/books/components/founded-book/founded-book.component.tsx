"use client";
import { use } from "react";
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
  value: string;
  customStyle?: string;
}) => {
  return (
    <div className={`containerBoxText ${customStyle}`}>
      <strong>{title}:</strong>
      <span>{value} </span>
    </div>
  );
};

export const FoundedBook = ({ bookData }: Props) => {
  if (!bookData) {
    return <p>Select a book to view details.</p>;
  }

  const book = use(bookData);

  if (!book) {
    return <p>Book not found.</p>;
  }

  const stableImageSrc: string = `/images/book_img_0${(Number(book.id) % 4) + 1}.png`;

  return (
    <div className="rootFoundedBookRoot">
      <div className="boxLeft">
        <ImageComponent
          alt="Image book"
          lazy="lazy"
          vertical
          src={stableImageSrc}
          customStyle="stylesFoundedBook"
        />
      </div>
      {/*  */}
      <div className="boxRight">
        <BoxText title={"Title"} value={book.title} />
      </div>
    </div>
  );
};
