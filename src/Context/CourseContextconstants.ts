import React, { useContext, createContext } from 'react';
export interface Course {
    _id: string;
    title: string;
    description: string;
    Instructor: { _id: string, firstName: string, lastName: string };
    Image: string;
    students: string[];
    Modules: {
      _id: string;
      title: string;
      content: string;
      cover: string;
    }[]
  }
  
  export interface CourseState {
    course: Course | null;
    loading: boolean;
    error: boolean;
  }
  
  export type CourseAction =
    | { type: 'FETCH_COURSE_REQUEST' }
    | { type: 'FETCH_COURSE_SUCCESS', payload: Course }
    | { type: 'FETCH_COURSE_FAILURE' }
    | { type: 'CREATE_COURSE_REQUEST' }
    | { type: 'CREATE_COURSE_SUCCESS', payload: Course }
    | { type: 'CREATE_COURSE_FAILURE' };
  
 export  const initialCourseState: CourseState = {
    course: null,
    loading: false,
    error: false,
  };
  
  
export const CourseContext = createContext<{
    contextState: CourseState;
    dispatch: React.Dispatch<CourseAction>;
  }>({ contextState: initialCourseState, dispatch: () => null });
  
 export  const courseReducer = (contextState: CourseState, action: CourseAction): CourseState => {
    switch (action.type) {
      case 'FETCH_COURSE_REQUEST':
        return { ...contextState, loading: true, error: false };
      case 'FETCH_COURSE_SUCCESS':
        return { ...contextState, loading: false, error: false, course: action.payload };
      case 'FETCH_COURSE_FAILURE':
        return { ...contextState, loading: false, error: true };
      case 'CREATE_COURSE_REQUEST':
        return { ...contextState, loading: true, error: false };
      case 'CREATE_COURSE_SUCCESS':
        return { ...contextState, loading: false, error: false, course: action.payload };
      case 'CREATE_COURSE_FAILURE':
        return { ...contextState, loading: false, error: true };
      default:
        return contextState;
    }
  };
  
  export const useCourseContext = () => useContext(CourseContext);