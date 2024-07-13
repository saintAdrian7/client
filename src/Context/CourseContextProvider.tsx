import { useReducer, ReactNode } from "react";
import { CourseContext, initialCourseState, courseReducer } from "./CourseContextconstants";


export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextState, dispatch] = useReducer(courseReducer, initialCourseState);
  return (
    <CourseContext.Provider value={{ contextState, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};


