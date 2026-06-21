export interface RoutesAppType {
  dashboard: string;
  books: string;
  authors: string;
  newBookToLibrary: string;
}

export const routesApp: RoutesAppType = {
  dashboard: "/",
  books: "/books",
  authors: "/authors",
  newBookToLibrary: "/add-book-to-library",
};

export enum Theme {
  dark = "dark",
  light = "light",
}

export enum pageContextAi {
  books = "books",
  authors = "authors",
}

export enum AsideProps {
  open = "open",
  close = "close",
}

export interface Books {
  id: number | null;
  title: string;
  price?: number;
  author_id: number;
}

export interface AuthorsProps {
  id: number | null;
  name: string;
  bio?: string;
  books: Books[];
}

export interface PropsProvider {
  theme: Theme;
  authors: AuthorsProps[];
  books: Books[];
  aside: AsideProps;
  setAsideValue: () => void;
}
