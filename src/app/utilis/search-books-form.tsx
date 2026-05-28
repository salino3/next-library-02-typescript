"use server";

export interface ActionStateBooksAction {
  success: boolean;
  error: string;
  title?: string;
}

//
export async function searchBooksAction(
  prevState: ActionStateBooksAction,
  formData: FormData,
): Promise<ActionStateBooksAction> {
  try {
    const title = formData.get("title") as string;

    if (title) {
      return { success: true, error: "", title: title };
    } else {
      return { success: true, error: "" };
    }
  } catch (err) {
    return { success: false, error: "Failed to search book" };
  }
}
