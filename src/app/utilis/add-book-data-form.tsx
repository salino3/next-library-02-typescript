"use server";

import { ServicesApp } from "../service/service-app";
import { BookAutofillFormProps } from "../service/interface";
import { StateAddBookDataAction } from "./interface";

export const addBookDataForm = async (
  prevState: StateAddBookDataAction,
  formData: FormData,
) => {
  const priceRaw = formData.get("price") as string;
  const pagesRaw = formData.get("pages") as string;

  const nestedResult: BookAutofillFormProps = {
    author_data: {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
    },
    book_data: {
      title: formData.get("title") as string,
      price: priceRaw ? parseInt(priceRaw, 10) : null,
      pages: pagesRaw ? parseInt(pagesRaw, 10) : null,
    },
  };

  const isNameInvalid = !nestedResult.author_data.name.trim();
  const isTitleInvalid = !nestedResult.book_data.title.trim();

  if (isNameInvalid || isTitleInvalid) {
    return {
      success: false,
      data: null,
      error:
        "Validation Error: Author Name and Book Title cannot be left blank.",
    };
  }

  try {
    await ServicesApp.addBookToLibrary(nestedResult);

    return {
      success: true,
      data: null,
      error: "",
    };
  } catch (serverError: unknown) {
    if (serverError instanceof Error) {
      return {
        success: false,
        data: nestedResult,
        error: `Database Failure: ${serverError.message || "Could not register book."}`,
      };
    }

    return {
      success: false,
      data: nestedResult,
      error: "An unknown database exception or execution error took place.",
    };
  }
};
