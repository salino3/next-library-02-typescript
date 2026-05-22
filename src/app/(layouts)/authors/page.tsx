"use client";
import { Aside } from "@/app/components/aside/aside.component";
import style from "../../page.module.scss";
import "./authors.styles.scss";

const LayoutAuthors = () => {
  return (
    <div className={style.rootHome}>
      <Aside />
      {/*  */}
      <div className="LayoutAuthors">
        <div className="booksContent">
          <h1>Library with Next - LayoutAuthors</h1>
        </div>
      </div>
    </div>
  );
};

export default LayoutAuthors;
