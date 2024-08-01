import { IUser } from './IUser';

export interface IBlogPost {
  id: number;
  title: string;
  content: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}
