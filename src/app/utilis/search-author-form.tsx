"use server";

import { ActionStateAuthorAction } from "./interface";

//
export async function searchAuthorAction(
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
