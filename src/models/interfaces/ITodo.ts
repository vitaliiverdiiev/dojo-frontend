import { IUser } from "./IUser";

export interface ITodo {
  id: number;
  title?: string;
  content?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
  author: IUser;
  orderIndex?: number;
  createdAt: number;
  updatedAt: number;
}
