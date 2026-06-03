"use client";
import { Aside } from "@/app/components/aside/aside.component";
import { Footer } from "@/app/components/footer/footer.component";
import { AuthorsContent } from "./components/authors-content/authors-content.component";
import style from "../../page.module.scss";
import "./authors.styles.scss";

const LayoutAuthors = () => {
  return (
    <div className={style.rootHome}>
      <Aside />
      {/*  */}
      <div className="LayoutAuthors">
        <AuthorsContent />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutAuthors;
