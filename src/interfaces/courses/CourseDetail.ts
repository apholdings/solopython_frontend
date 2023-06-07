import { Category } from '../Category';
import { IUser } from '../user';

export interface ICourseDetail {
  accessibility: boolean;
  allow_messages: boolean;
  analytics: null; // replace null with the correct type if you know it
  author: IUser;
  banned: boolean;
  best_seller: boolean;
  can_delete: boolean;
  captions: boolean;
  category: Category;
  compare_price: null; // replace null with the correct type if you know it
  congrats_message: null; // replace null with the correct type if you know it
  course_length: string;
  course_structure: boolean;
  created_at: string;
  curriculum: boolean;
  description: string;
  discount: boolean;
  discount_until: string;
  film: boolean;
  goals: boolean;
  id: string;
  images: Array<any>; // replace any with the correct type if you know it
  keywords: null; // replace null with the correct type if you know it
  landing_page: boolean;
  language: null; // replace null with the correct type if you know it
  level: null; // replace null with the correct type if you know it
  nft_address: string;
  payment: string;
  price: null; // replace null with the correct type if you know it
  pricing: boolean;
  promotions: boolean;
  rating: Array<any>; // replace any with the correct type if you know it
  requisites: Array<any>; // replace any with the correct type if you know it
  resources: Array<any>; // replace any with the correct type if you know it
  sections: Array<any>; // replace any with the correct type if you know it
  sellers: Array<any>; // replace any with the correct type if you know it
  setup: boolean;
  short_description: null; // replace null with the correct type if you know it
  slug: string;
  sold: number;
  status: string;
  stock: number;
  student_rating: number;
  student_rating_no: number;
  students: number;
  sub_category: string;
  taught: null; // replace null with the correct type if you know it
  title: string;
  token_id: string;
  topic: string;
  total_duration: string;
  total_lectures: number;
  updated_at: string;
  videos: Array<any>; // replace any with the correct type if you know it
  views: number;
  welcome_message: null; // replace null with the correct type if you know it
  what_learnt: Array<any>; // replace any with the correct type if you know it
  who_is_for: Array<any>; // replace any with the correct type if you know it
}
