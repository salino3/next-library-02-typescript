import { CONSTANTS_SERVER } from "@/lib/constants-server";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  AuthorResponse,
  BookAutofillForm,
  BookResponse,
  SearchAuthorResponse,
  SearchBookResponse,
} from "./interface";

export class ServicesApp {
  // Books

  //
  public static async getAllBooks(): Promise<BookResponse[] | AxiosResponse> {
    return await axios.get(CONSTANTS_SERVER.URL_BACK + "books").catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  //
  public static async getFilteredListBooks(
    searchName: string = "",
    offset: number = 0,
  ): Promise<SearchBookResponse> {
    return await axios
      .post(
        CONSTANTS_SERVER.URL_BACK + "books/search",
        {
          title: searchName,
          limit: 10,
          offset: offset,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //
  public static async getBookInfo(
    bookId: string,
  ): Promise<BookResponse | AxiosResponse> {
    return await axios
      .get(`${CONSTANTS_SERVER.URL_BACK}books/${bookId}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  // Authors

  //
  public static async getFilteredListAuthors(
    searchName: string = "",
    offset: number = 0,
  ): Promise<SearchAuthorResponse> {
    return await axios
      .post(
        CONSTANTS_SERVER.URL_BACK + "authors/search",
        {
          name: searchName,
          limit: 10,
          offset: offset,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //
  public static async getAuthorInfo(
    authorId: string,
  ): Promise<AuthorResponse | AxiosResponse> {
    return await axios
      .get(`${CONSTANTS_SERVER.URL_BACK}authors/${authorId}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  // Add Book to Library

  //
  public static async addBookToLibrary(
    objForm: BookAutofillForm,
  ): Promise<{ success: boolean; message: string }> {
    return await axios
      .post(`${CONSTANTS_SERVER.URL_BACK}save-data/new-author/book`, objForm)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }
}
