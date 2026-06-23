import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { addBookDataForm } from "@/app/utilis/add-book-data-form";
import { BookAutofillFormProps } from "@/app/service/interface";
import { StateAddBookDataAction } from "@/app/utilis/interface";
import "./add-book-form.style.scss";

interface Props {
  formData: BookAutofillFormProps;
  setFormData: Dispatch<SetStateAction<BookAutofillFormProps>>;
}

export interface FormErrorProps {
  name: string;
  title: string;
}

export const AddBookForm = ({ formData, setFormData }: Props) => {
  // TODO: Add validation errors message
  const [formErrorData, setFormErrorData] = useState<FormErrorProps>({
    name: "",
    title: "",
  });

  const [state, formAction, isPending] = useActionState(
    async (prevState: StateAddBookDataAction, formData: FormData) =>
      addBookDataForm(prevState, formData),
    {
      success: false,
      data: null,
      error: "",
      fieldErrors: null,
    },
  );

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
              ? Number(value) < 1
                ? null
                : parseInt(value, 10) || 0
              : value,
        },
      }));

      if (nestedKey === "name" || nestedKey === "title") {
        setFormErrorData((prev: FormErrorProps) => ({
          ...prev,
          [nestedKey]: "",
        }));
      }
    };

  useEffect(() => {
    if (state?.fieldErrors) {
      setFormErrorData({
        name: state.fieldErrors.name || "",
        title: state.fieldErrors.title || "",
      });
    }
  }, [state?.fieldErrors]);

  return (
    <form className="rootAddBookForm" action={formAction}>
      <fieldset disabled={isPending}>
        <h3>Author Information</h3>
        <div className="boxInput">
          <label htmlFor="name">Author Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className={formErrorData.name ? "errorInput" : ""}
            value={formData.author_data.name}
            onChange={handleChangeForm("author_data")("name")}
          />
        </div>

        <div className="boxInput">
          <label htmlFor="bio">Author Biography:</label>
          <textarea
            rows={3}
            name="bio"
            id="bio"
            value={formData.author_data.bio}
            onChange={handleChangeForm("author_data")("bio")}
          />
        </div>

        <h3>Book Information</h3>
        <div className="boxInput">
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            value={formData.book_data.title}
            name="title"
            id="title"
            className={formErrorData.title ? "errorInput" : ""}
            onChange={handleChangeForm("book_data")("title")}
          />
        </div>

        <div className="containerInputsNumbers">
          <div className="boxInput">
            <label htmlFor="price">Price (€):</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.book_data.price ?? ""}
              onChange={handleChangeForm("book_data")("price")}
            />
          </div>

          <div className="boxInput">
            <label htmlFor="pages">Pages:</label>
            <input
              type="number"
              name="pages"
              id="pages"
              value={formData.book_data.pages ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeForm("book_data")("pages")(e)
              }
            />
          </div>
        </div>

        <button
          disabled={isPending}
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
          {isPending ? "Saving to System..." : "Confirm & Save Data"}
        </button>

        {state.error && (
          <div
            style={{
              marginTop: "1rem",
              padding: "10px",
              borderRadius: "4px",
              background: "#f0f0f0",
              fontSize: "14px",
            }}
          >
            {state.error}
          </div>
        )}
      </fieldset>
    </form>
  );
};
