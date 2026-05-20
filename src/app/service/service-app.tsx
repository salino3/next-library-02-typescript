import { CONSTANTS_SERVER } from "@/lib/constants-server";
import axios, { AxiosResponse } from "axios";

export class ServicesApp {
  public static async getAllBooks(): Promise<AxiosResponse> {
    return await axios.get(CONSTANTS_SERVER.URL_BACK).catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }
}
