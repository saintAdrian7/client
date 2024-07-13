import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { Box, CircularProgress, Typography } from '@mui/material';
import CourseDetails from './CourseDetails';
import './Course.css';
import { useAuth } from '../../../Context/Authconstants';
import { useCourseContext } from '../../../Context/CourseContextconstants';
import { fetchCourse } from '../../../Context/CourseContextactions';

const ModuleForm = React.lazy(() => import('./Moduleform/Moduleform'));

export interface CourseModule {
  _id: string;
  title: string;
  content: string;
  course?: string;
  Cover?: string;
}

const Course = () => {
  const [displayModuleForm, setDisplayModuleForm] = useState<boolean>(false);
  const { state } = useAuth();
  const { contextState, dispatch } = useCourseContext();
  const { courseId } = useParams();
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const navigate = useNavigate();

  const handleTakeAssessment = () => {
    navigate(`/assessment/${courseId}`);
  };

  const toggleModuleForm = () => {
    setDisplayModuleForm(!displayModuleForm);
  };

  const handleModuleClick = (module: CourseModule) => {
    setSelectedModule(module);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setSelectedModule(null);
  };

  const handleUpdateClick = (module: CourseModule) => {
    setSelectedModule(module);
    setDisplayModuleForm(true);
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };
  

  const handleDeleteClick = async (module: CourseModule): Promise<void> => {
      const moduleId = module._id;
      const courseId = contextState.course?._id;
      const token = getToken()
      await axios.delete(`http://localhost:4000/modules/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      await axios.get(`http://localhost:4000/update/${courseId}`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      fetchCourse(dispatch, courseId);
    
  };

  useEffect(() => {
    if (courseId && (!contextState.course || contextState.course._id !== courseId)) {
      fetchCourse(dispatch, courseId);
    }
  }, [courseId, contextState.course, dispatch]);

  const LoadingComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress size={80} />
    </Box>
  );

  const ErrorComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h5" color="error">
        Error loading the course!
      </Typography>
    </Box>
  );

  const NotFoundComponent = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h5" color="textSecondary">
        The course was not found
      </Typography>
    </Box>
  );

  if (contextState.loading) return <LoadingComponent />;
  if (contextState.error) return <ErrorComponent />;
  if (!contextState.course) return <NotFoundComponent />;

  return (
    <div className='course-content'>
      <div className="course-details">
        {selectedModule ? (
          <div className='module-content'>
            <button className='back-to-btn' onClick={handleBackClick}>Back to Course Details</button>
            <h2>{selectedModule.title}</h2>
            <p className='module-content-details'>{selectedModule.content}</p>
          </div>
        ) : (
          <CourseDetails />
        )}
      </div>
      <div className='separator'></div>
      <div>
        {displayModuleForm && (
          <React.Suspense fallback={<div>Loading Module Form...</div>}>
            <ModuleForm
              setDisplayModuleForm={toggleModuleForm}
              initialData={selectedModule}
            />
          </React.Suspense>
        )}
      </div>
      <div className="course-modules">
        {state.loggedInUser?.id === contextState.course?.Instructor._id && (
          <button className='toggle-module-form-btn' onClick={toggleModuleForm}>
            {displayModuleForm ? "Hide Module Form" : "Add Course Module Here"}
          </button>
        )}
        <div className='modules-container'>
          {contextState.course.Modules.map((module) => (
            <div className={`module ${selectedModule?._id === module._id ? 'active' : ''}`} key={module._id} onClick={() => handleModuleClick(module)}>
              <h2 className={`module-title ${selectedModule?._id === module._id ? 'active' : ''}`}>{module.title}</h2>
              {state.loggedInUser?.id === contextState.course?.Instructor._id && (
                <button className='update-module-btn' onClick={() => handleUpdateClick(module)}>Update</button>
              )}
              {state.loggedInUser?.id === contextState.course?.Instructor._id && (
                <button className='delete-module-btn' onClick={() => handleDeleteClick(module)}>Delete</button>
              )}
            </div>
          ))}
          <button className='take-asessment-btn' onClick={handleTakeAssessment}>Take Assessment</button>
        </div>
      </div>
    </div>
  );
};

export default Course;
