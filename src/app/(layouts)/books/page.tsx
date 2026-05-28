"use client";
import { Aside } from "@/app/components/aside/aside.component";
import { Footer } from "@/app/components/footer/footer.component";
import { BooksContent } from "./components/books-content/books-content.component";
import style from "../../page.module.scss";
import "./books.styles.scss";

const LayoutBooks = () => {
  return (
    <div className={style.rootHome}>
      <Aside />
      {/*  */}
      <div className="LayoutBooks">
        <BooksContent />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutBooks;
