import { IQuestion } from './Question';
import { IUser } from '../user';

export interface IAnswer {
  id: string;
  user: IUser;
  question: IQuestion;
  body: string;
  created_date: string; // Change this to Date if needed
  update_date: string; // Change this to Date if needed
  is_accepted_answer: boolean;
  likes: ILike[];
  dislikes: ILike[];
}
