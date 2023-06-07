import { IUser } from '../user';
import { IComment } from './Comment';

export interface IEpisode {
  id: string;
  title: string;
  file: string;
  filename: string;
  content: string;
  description: string;
  length: number;
  free: boolean;
  resources: IResource[];
  questions: IQuestion[];
  comments: IComment[];
  number: number;
  user: IUser;
  course: string;
  section_uuid: string;
  date: string; // Change this to Date if needed
  published: boolean;
}
