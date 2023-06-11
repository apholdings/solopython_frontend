import { ICourseDetail } from '../courses/CourseDetail';
import { IUser } from '../user';

export interface IReview {
  id: string;
  user: IUser;
  course: ICourseDetail;
  rating: number;
  comment: string;
  date_created: Date;
  count: any;
}
