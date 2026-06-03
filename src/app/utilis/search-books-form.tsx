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

    return { success: true, error: "", title: title };
  } catch (err) {
    return { success: false, error: "Failed to search books" };
  }
}
