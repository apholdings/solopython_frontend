import { IEpisode } from './Episode';
import { IAnswer } from './Answer';
import { IUser } from '../user';

export interface IQuestion {
  id: string;
  user: IUser;
  title: string;
  body: string;
  created_at: string; // Change this to Date if needed
  episode: IEpisode;
  answers: IAnswer[];
  correct_answer: IAnswer;
  update_date: string; // Change this to Date if needed
  has_accepted_answer: boolean;
  likes: ILike[];
  dislikes: ILike[];
  get_answers_count: number;
}
