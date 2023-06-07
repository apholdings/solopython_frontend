'use client';

import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import { ReactNode, useState } from 'react';
import CourseContext from '../context/courseContext';

interface Props {
  children: ReactNode;
}

export default function ContextProvider({ children }: Props) {
  const [course, setCourse] = useState<ICourseDetail | null>(null);

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
