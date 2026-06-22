"use client";

import { useState } from "react";
import { ServicesApp } from "@/app/service/service-app";
import { AIAutofillForm } from "./components/ai-autofill-form";
import { AddBookForm } from "./components/add-book-form";
import { BookAutofillFormProps } from "@/app/service/interface";
import "./add-book-to-library.styles.scss";

export default function BookAutofillForm() {
  const [submittingDB, setSubmittingDB] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState<BookAutofillFormProps>({
    author_data: { name: "", bio: "" },
    book_data: { title: "", price: null, pages: null },
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

  //
  const handleFinalDatabaseSubmit = async () => {
    setSubmittingDB(true);
    setStatusMessage("Saving atomic record to PostgreSQL...");

    try {
      const result = await ServicesApp.addBookToLibrary(formData);

      setStatusMessage(`Success! ${result && result.message}`);
    } catch (error: any) {
      setStatusMessage(`Database Error: ${error.message}`);
    } finally {
      setSubmittingDB(false);
    }
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
      <h2>AI Book & Author Registry</h2>

      {/* Search Input Bar */}
      <AIAutofillForm setFormData={setFormData} />

      <hr />

      {/* Editable Form Fields (Pre-filled by AI state updates) */}
      <AddBookForm formData={formData} handleChangeForm={handleChangeForm} />
    </div>
  );
}
