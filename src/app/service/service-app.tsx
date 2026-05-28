import { CONSTANTS_SERVER } from "@/lib/constants-server";
import axios, { AxiosResponse } from "axios";
import { SearchBookResponse } from "./interface";

export class ServicesApp {
  public static async getAllBooks(): Promise<AxiosResponse> {
    return await axios.get(CONSTANTS_SERVER.URL_BACK + "books").catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  //
  public static async getFilteredListBooks(
    searchName: string = "",
    offset: number = 0,
  ): Promise<AxiosResponse<SearchBookResponse>> {
    return await axios
      .post(CONSTANTS_SERVER.URL_BACK + "books/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: searchName, limit: 10, offset }),
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }
}
