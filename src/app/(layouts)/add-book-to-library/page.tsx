"use client";

import { useState } from "react";
import "./add-book-to-library.styles.scss";

// Matches your TARGET FORM JSON SCHEMA perfectly
interface FormData {
  author_data: {
    name: string;
    bio: string;
  };
  book_data: {
    title: string;
    price: number;
    pages: number;
  };
}

export default function BookAutofillForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [submittingDB, setSubmittingDB] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Main state holding the form data
  const [formData, setFormData] = useState<FormData>({
    author_data: { name: "", bio: "" },
    book_data: { title: "", price: 0, pages: 0 },
  });

  // 1️⃣ STEP 1: Fetch data from Firecrawl + Groq via your Next.js API route
  const handleAIFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoadingAI(true);
    setStatusMessage("Searching the web and generating structured data...");

    try {
      const response = await fetch("/api/ai-autofill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) throw new Error("Failed to generate data");

      const data: FormData = await response.json();

      // Update form state with the exact structure required
      setFormData(data);
      setStatusMessage(
        "Form auto-filled successfully! Please review before saving.",
      );
    } catch (error: any) {
      setStatusMessage(`AI Error: ${error.message}`);
    } finally {
      setLoadingAI(false);
    }
  };

  // 2️⃣ STEP 2: Send the structured payload to your Python FastAPI Atomic Endpoint
  const handleFinalDatabaseSubmit = async () => {
    setSubmittingDB(true);
    setStatusMessage("Saving atomic record to PostgreSQL...");

    // try {
    //   const response = await fetch(
    //     "http://localhost:8000/save-data/new-author/book/",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(formData), // Sends the exact structure FastAPI expects
    //     },
    // //   );

    //   const result = await response.json();

    //   if (!response.ok) {
    //     throw new Error(result.detail || "Failed to commit data to database");
    //   }

    //   setStatusMessage(`Success! ${result.message}`);
    // } catch (error: any) {
    //   setStatusMessage(`Database Error: ${error.message}`);
    // } finally {
    //   setSubmittingDB(false);
    // }
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
      <form
        onSubmit={handleAIFetch}
        style={{ display: "flex", gap: "10px", marginBottom: "2rem" }}
      >
        <input
          type="text"
          placeholder="e.g., White Elephant book by Ana Doe"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button
          type="submit"
          disabled={loadingAI}
          style={{ padding: "8px 16px" }}
        >
          {loadingAI ? "Analyzing..." : "AI Autofill"}
        </button>
      </form>

      <hr />

      {/* Editable Form Fields (Pre-filled by AI state updates) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "1.5rem",
        }}
      >
        <h3>Author Information</h3>
        <label>
          Author Name:
          <input
            type="text"
            value={formData.author_data.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                author_data: { ...formData.author_data, name: e.target.value },
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
              value={formData.book_data.price}
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
              value={formData.book_data.pages}
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
      </div>
    </div>
  );
}
