"use client";

import { useState } from "react";
import { Aside } from "@/app/components/aside/aside.component";
import { Footer } from "@/app/components/footer/footer.component";
import { AIAutofillForm } from "./components/ai-autofill-form";
import { AddBookForm } from "./components/add-book-form";
import { BookAutofillFormProps } from "@/app/service/interface";
import style from "../../page.module.scss";
import "./add-book-to-library.styles.scss";

const initialState: BookAutofillFormProps = {
  author_data: { name: "", bio: "" },
  book_data: { title: "", price: null, pages: null },
};

export default function BookAutofillForm() {
  const [formData, setFormData] = useState<BookAutofillFormProps>(initialState);

  return (
    <div className={style.rootHome}>
      <Aside />
      {/*  */}
      <div className="LayoutBookAutofillForm">
        <div className="containerPage">
          <h1>AI Book & Author Registry</h1>

          <AIAutofillForm setFormData={setFormData} />

          <AddBookForm formData={formData} setFormData={setFormData} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
