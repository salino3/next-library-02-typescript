import { BookAutofillFormProps } from "@/app/service/interface";
import "./add-book-form.style.scss";

interface Props {
  formData: BookAutofillFormProps;
  handleChangeForm: <K extends keyof BookAutofillFormProps>(
    key: K,
  ) => (
    nestedKey: keyof BookAutofillFormProps[K] & string,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const AddBookForm = ({ formData, handleChangeForm }: Props) => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "1.5rem",
      }}
      className="rootAddBookForm"
    >
      <fieldset disabled={false}>
        <h3>Author Information</h3>
        <label>
          Author Name:
          <input
            type="text"
            value={formData.author_data.name}
            onChange={(e) => handleChangeForm("author_data")("name")}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </label>

        <label>
          Author Biography:
          <textarea
            rows={3}
            value={formData.author_data.bio}
            onChange={(e) => handleChangeForm("author_data")("bio")}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </label>

        <h3>Book Information</h3>
        <label>
          Book Title:
          <input
            type="text"
            value={formData.book_data.title}
            onChange={(e) => handleChangeForm("book_data")("title")}
            style={{ width: "100%", padding: "6px", marginTop: "4px" }}
          />
        </label>

        <div style={{ display: "flex", gap: "15px" }}>
          <label style={{ flex: 1 }}>
            Price ($):
            <input
              type="number"
              value={formData.book_data.price ?? ""}
              onChange={(e) => handleChangeForm("book_data")("price")}
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </label>

          <label style={{ flex: 1 }}>
            Pages:
            <input
              type="number"
              value={formData.book_data.pages ?? ""}
              onChange={(e) => handleChangeForm("book_data")("pages")}
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </label>
        </div>

        {/* Final Database Action Button */}
        {/* <button
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
        )} */}
      </fieldset>
    </form>
  );
};
