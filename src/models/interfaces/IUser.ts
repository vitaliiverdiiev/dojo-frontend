import { Role } from '../enums/RoleEnum';
import { IBlogPost } from './IBlogPost';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  role: Role;
  blogPosts: IBlogPost[];
}
