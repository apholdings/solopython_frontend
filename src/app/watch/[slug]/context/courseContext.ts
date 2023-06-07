import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import React, { Dispatch, SetStateAction } from 'react';

interface CourseContextType {
  course: ICourseDetail | null;
  setCourse: Dispatch<SetStateAction<ICourseDetail | null>>;
}

const CourseContext = React.createContext<CourseContextType>({
  course: null,
  setCourse: () => {},
});

export default CourseContext;
