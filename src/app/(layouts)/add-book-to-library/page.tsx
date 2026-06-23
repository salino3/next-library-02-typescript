"use client";

import { useState } from "react";
import { AIAutofillForm } from "./components/ai-autofill-form";
import { AddBookForm } from "./components/add-book-form";
import { BookAutofillFormProps } from "@/app/service/interface";
import "./add-book-to-library.styles.scss";

const initialState: BookAutofillFormProps = {
  author_data: { name: "", bio: "" },
  book_data: { title: "", price: null, pages: null },
};

export default function BookAutofillForm() {
  const [formData, setFormData] = useState<BookAutofillFormProps>(initialState);

  return (
    <div className="LayoutBookAutofillForm">
      <div className="containerPage">
        <h1>AI Book & Author Registry</h1>

        <AIAutofillForm setFormData={setFormData} />

        <hr />

        <AddBookForm formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}
