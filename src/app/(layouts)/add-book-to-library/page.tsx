"use client";

import { useState } from "react";
import { ServicesApp } from "@/app/service/service-app";
import { BookAutofillFormProps } from "@/app/service/interface";
import { AIAutofillForm } from "./components/ai-autofill-form";
import "./add-book-to-library.styles.scss";

export default function BookAutofillForm() {
  const [submittingDB, setSubmittingDB] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState<BookAutofillFormProps>({
    author_data: { name: "", bio: "" },
    book_data: { title: "", price: null, pages: null },
  });

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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "1.5rem",
        }}
      >
        <fieldset disabled={false}>
          <h3>Author Information</h3>
          <label>
            Author Name:
            <input
              type="text"
              value={formData.author_data.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author_data: {
                    ...formData.author_data,
                    name: e.target.value,
                  },
                })
              }
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </label>

          <label>
            Author Biography:
            <textarea
              rows={3}
              value={formData.author_data.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author_data: { ...formData.author_data, bio: e.target.value },
                })
              }
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </label>

          <h3>Book Information</h3>
          <label>
            Book Title:
            <input
              type="text"
              value={formData.book_data.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  book_data: { ...formData.book_data, title: e.target.value },
                })
              }
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </label>

          <div style={{ display: "flex", gap: "15px" }}>
            <label style={{ flex: 1 }}>
              Price ($):
              <input
                type="number"
                value={formData.book_data.price ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    book_data: {
                      ...formData.book_data,
                      price: parseInt(e.target.value) || 0,
                    },
                  })
                }
                style={{ width: "100%", padding: "6px", marginTop: "4px" }}
              />
            </label>

            <label style={{ flex: 1 }}>
              Pages:
              <input
                type="number"
                value={formData.book_data.pages ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    book_data: {
                      ...formData.book_data,
                      pages: parseInt(e.target.value) || 0,
                    },
                  })
                }
                style={{ width: "100%", padding: "6px", marginTop: "4px" }}
              />
            </label>
          </div>

          {/* Final Database Action Button */}
          <button
            onClick={handleFinalDatabaseSubmit}
            disabled={
              submittingDB ||
              !formData.book_data.title ||
              !formData.author_data.name
            }
            style={{
              marginTop: "1.5rem",
              padding: "12px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {submittingDB ? "Saving to System..." : "Confirm & Save Data"}
          </button>

          {statusMessage && (
            <div
              style={{
                marginTop: "1rem",
                padding: "10px",
                borderRadius: "4px",
                background: "#f0f0f0",
                fontSize: "14px",
              }}
            >
              {statusMessage}
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}
