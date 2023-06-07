'use client';
import { useContext } from 'react';
import CourseContext from '../context/courseContext';

export default function Video() {
  const { course } = useContext(CourseContext);
  return <div>Video {course?.title}</div>;
}
