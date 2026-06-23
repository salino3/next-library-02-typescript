"use client";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { useProviderSelector } from "@/app/store/provider";
import { ImageComponent } from "@/app/common-app/image/image.component";
import { routesApp } from "@/app/store/interface";
import "./aside.styles.scss";

export const Aside = () => {
  const isMobile: boolean = useMediaQuery({ maxWidth: "724px" });

  const { aside } = useProviderSelector("aside");

  return (
    <aside className={`rootAsideComponent aside_${aside}`}>
      <div className="containerAside">
        <div className="boxTitle">
          <h3>Aside Component</h3>
        </div>
        <Link href={routesApp.newBookToLibrary} className="linkNewBook">
          <button>Add new book to library</button>
        </Link>
        <div className="publicityContainer">
          <ImageComponent
            vertical={isMobile}
            src={`/images/${isMobile ? "author_04" : "book_img_04"}.png`}
            lazy={"lazy"}
            alt="Advertising Book Layout 1"
            customStyle="boxImage"
          />
          <ImageComponent
            vertical={isMobile}
            src="/uy"
            lazy={"lazy"}
            alt="Advertising Book Layout 2"
            customStyle="boxImage"
          />
        </div>
      </div>
    </aside>
  );
};
