"use server";

export interface ActionStateAuthorAction {
  success: boolean;
  error: string;
  name?: string;
}

//
export async function searchAuthorAction(
  prevState: ActionStateAuthorAction,
  formData: FormData,
): Promise<ActionStateAuthorAction> {
  try {
    const title = formData.get("title") as string;

    return { success: true, error: "", name: title };
  } catch (err) {
    return { success: false, error: "Failed to search authors" };
  }
}
