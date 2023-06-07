import { IEpisode } from './Episode';

export interface ISection {
  id: string;
  title: string;
  learning_objective: string;
  number: number;
  published: boolean;
  user: string;
  course: string;
  episodes: IEpisode[];
  total_duration: string;
}
