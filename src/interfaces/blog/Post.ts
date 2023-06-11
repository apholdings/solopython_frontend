import { ICategory } from '../category/Category';
import { IUser } from '../user';

export interface IPost {
  author: IUser;
  title: string;
  slug: string;
  thumbnail: string;
  keywords: string;
  description: string;
  content: string;
  time_read: number;
  published: string;
  views: number;
  status: 'draft' | 'published';
  category: ICategory; // You can replace this with the actual type of the category if available
}
