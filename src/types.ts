export interface TextColumn {
  path: string;
  label: string;
}

export interface ContentColumn<T> {
  key: string;
  content(item: T): JSX.Element;
}

export type column<T> = TextColumn | ContentColumn<T>;

export interface Id {
  id: string;
}

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

export interface User {
  id: string;
  name: string;
  username: string;
  isAdmin: boolean;
}

export interface UserRegister {
  name: string;
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Food {
  id: string;
  name: string;
  category: Category;
  numberInStock: number;
  price: number;
  isFavored?: boolean;
}

export interface ICartItem {
  item: Food;
  quantity: number;
}
