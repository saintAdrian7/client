import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Box, CircularProgress} from '@mui/material';
import { useAuth } from "./Context/Authconstants";
import { fetchUser } from "./Context/Authactions";
import MurphyAI from "./Pages/MurphyAIpage/MurphyAI";
import AvailableCourses from "./Pages/AvailableCourses";

const HomePage = React.lazy(() => import("./Pages/Homepage/Homepage"));
const Layoutpage = React.lazy(() => import("./Pages/Layoutpage/Layoutpage"));
const Course = React.lazy(() => import("./Features/Components/Course/Course"));
const CourseForm = React.lazy(() => import("./Features/Components/CourseForm/CourseForm"));
const AssessmentPage = React.lazy(() => import("./Pages/Assessmentpage/Assessmentpage"));
const CreateAssessment = React.lazy(() => import("./Pages/Assessmentpage/Assesmentform"));
const LoginProtect = React.lazy(() => import("./LoginProtect"));

function App() {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const  userId = sessionStorage.getItem("userId");
    if (userId && !state.loggedInUser) {
      fetchUser(dispatch, userId);
    }
    
  }, [state.loggedInUser, dispatch]);
  const LoadingComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'  }}>
      <CircularProgress size={80} />
    </Box>
  );

  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingComponent/>}>
        <Routes>
          <Route path="/" element={<Layoutpage />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/CreateCourse/Course/:courseId" element={state.loggedInUser ? <Course /> : <LoginProtect />} />
            <Route path="/courses" element={<AvailableCourses />} />
            <Route path="/CreateCourse" element={state.loggedInUser ? <CourseForm /> : <LoginProtect />} />
            <Route path="/assessment/:courseId" element={state.loggedInUser ? <AssessmentPage /> : <LoginProtect />} />
            <Route path="/assessment/createform/:courseId" element={state.loggedInUser ? <CreateAssessment /> : <LoginProtect />} />
            <Route path="/murphyAI" element={state.loggedInUser? <MurphyAI />:<LoginProtect /> } />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
