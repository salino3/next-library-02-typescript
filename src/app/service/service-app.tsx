import { CONSTANTS_SERVER } from "@/lib/constants-server";
import axios, { AxiosResponse } from "axios";
import { BookResponse, SearchBookResponse } from "./interface";

export class ServicesApp {
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
}
