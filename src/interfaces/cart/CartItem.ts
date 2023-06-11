import { ICourseDetail } from '../courses/CourseDetail';
import { ITier } from '../tiers/Tier';

export interface ICartItem {
  id: string;
  cart: any;
  coupon: any;
  referrer: string;
  course: any;
  tier: any;
}
