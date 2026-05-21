export enum Theme {
  "dark",
  "light",
}

export enum Aside {
  "open",
  "close",
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
  aside: Aside;
}
