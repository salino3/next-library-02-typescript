"use server";

export interface ActionStateAuthorAction {
  success: boolean;
  error: string;
  name?: string;
}

//
export async function handleAIFetch(
  prevState: ActionStateAuthorAction,
  formData: FormData,
): Promise<ActionStateAuthorAction> {
  try {
    const name = formData.get("name") as string;

    return { success: true, error: "", name: name };
  } catch (err) {
    return { success: false, error: "Failed to search authors" };
  }
}
