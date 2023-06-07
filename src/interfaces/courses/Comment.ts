import { IUser } from '../user';

export interface IComment {
  id: string;
  user: IUser;
  body: string;
  created_at: Date;
  updated_at: Date;
  likes: ILike[];
  dislikes: ILike[];
}
