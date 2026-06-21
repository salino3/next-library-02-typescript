export interface AuthorResponse {
  id: number;
  name: string;
  bio?: string;
}

export interface SearchAuthorResponse {
  total: number;
  results: AuthorResponse[];
}

//
export interface BookResponse {
  id: number;
  title: string;
  author_id: number;
  price: number | null;
  pages: number | null;
}

export interface SearchBookResponse {
  total: number;
  results: BookResponse[];
}

export interface BookAutofillForm {
  author_data: Omit<AuthorResponse, "id">;
  book_data: Omit<BookResponse, "id" | "author_id">;
}
