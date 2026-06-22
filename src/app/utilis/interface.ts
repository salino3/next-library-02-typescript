"use server";

import {
  BookAutofillFormProps,
  SearchAuthorResponse,
  SearchBookResponse,
} from "../service/interface";

export interface StateAIAutofillAction {
  success: boolean;
  error: string;
  data?: BookAutofillFormProps | null;
  query: string;
}

export interface StateAddBookDataAction {
  success: boolean;
  error: string;
  data?: BookAutofillFormProps | null;
}

export interface ActionStateAuthorAction {
  success: boolean;
  error: string;
  name?: string;
}

export interface ActionStateAIFormAction {
  success: boolean;
  error: string;
  data: SearchAuthorResponse | SearchBookResponse | null;
}

export interface ActionStateBooksAction {
  success: boolean;
  error: string;
  title?: string;
}
