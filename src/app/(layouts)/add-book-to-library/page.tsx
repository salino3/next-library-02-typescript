"use client";

import { useState } from "react";
import { AIAutofillForm } from "./components/ai-autofill-form";
import { AddBookForm } from "./components/add-book-form";
import { BookAutofillFormProps } from "@/app/service/interface";
import "./add-book-to-library.styles.scss";

export default function BookAutofillForm() {
  const [formData, setFormData] = useState<BookAutofillFormProps>({
    author_data: { name: "", bio: "" },
    book_data: { title: "", price: null, pages: null },
  });

  // TODO: Add validation errors message
  const [formErrorData, setFormErrorData] = useState<{
    name: string;
    title: string;
  }>({
    name: "",
    title: "",
  });

  //
  const handleChangeForm =
    <K extends keyof BookAutofillFormProps>(key: K) =>
    (nestedKey: keyof BookAutofillFormProps[K]) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;

      setFormData((prev: BookAutofillFormProps) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [nestedKey]:
            nestedKey === "price" || nestedKey === "pages"
              ? parseInt(value, 10) || 0
              : value,
        },
      }));
    };

  return (
    <div
      className="LayoutBookAutofillForm"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1>AI Book & Author Registry</h1>

      <AIAutofillForm setFormData={setFormData} />

      <hr />

      <AddBookForm formData={formData} handleChangeForm={handleChangeForm} />
    </div>
  );
}
