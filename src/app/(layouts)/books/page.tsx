"use client";
import { Aside } from "@/app/components/aside/aside.component";
import { Footer } from "@/app/components/footer/footer.component";
import style from "../../page.module.scss";
import "./books.styles.scss";

const LayoutBooks = () => {
  return (
    <div className={style.rootHome}>
      <Aside />
      {/*  */}
      <div className="LayoutBooks">
        <div className="booksContent">
          <h1>Library with Next - LayoutBooks</h1>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutBooks;
