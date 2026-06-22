"use server";

import { BookAutofillFormProps } from "../service/interface";

export interface StateAIAutofillAction {
  success: boolean;
  error: string;
  data?: BookAutofillFormProps | null;
}

export interface ActionStateAuthorAction {
  success: boolean;
  error: string;
  name?: string;
}

export interface ActionStateBooksAction {
  success: boolean;
  error: string;
  title?: string;
}
