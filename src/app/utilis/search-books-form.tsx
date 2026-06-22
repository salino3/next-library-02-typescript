"use server";

import { ActionStateBooksAction } from "./interface";

//
export async function searchBooksAction(
  prevState: ActionStateBooksAction,
  formData: FormData,
): Promise<ActionStateBooksAction> {
  try {
    const title = formData.get("title") as string;

    return { success: true, error: "", title: title };
  } catch (err) {
    return { success: false, error: "Failed to search books" };
  }
}
