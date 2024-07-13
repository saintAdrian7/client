

import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './CourseDetails.css'
import axios from 'axios'
import { useAuth } from '../../../Context/Authconstants'
import { useCourseContext } from '../../../Context/CourseContextconstants'
import { fetchCourse } from '../../../Context/CourseContextactions'

export default function CourseDetails () {
const {state} = useAuth()
const {contextState, dispatch} = useCourseContext()
const {courseId} = useParams();
const navigate = useNavigate()

const handleCreateAssement = () => {
    navigate(`/assessment/createform/${courseId}`)

}

const handleDeleteCourse = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    const token = localStorage.getItem('token')
    
    if (confirmDelete) {
      
        await axios.delete(`http://localhost:4000/Courses/${courseId}`,{
          headers: { Authorization: `Bearer ${token}`}
        });
        navigate('/');
      
    }
  };
  
useEffect(() => {
    if (courseId && (!contextState.course || contextState.course._id !== courseId)) {
      fetchCourse(dispatch, courseId);
    }
  }, [courseId, contextState.course, dispatch]);



    return(
        <>
        <div className='course-title'>
                <h1>{contextState.course?.title}</h1>
                <p>{contextState.course?.description}</p>
            </div>
            <div>
            <p>Created by <span>{`${contextState.course?.Instructor.firstName} ${contextState.course?.Instructor.lastName}`}</span></p>

            <p className='students'>{contextState.course?.students.length} students</p>
            </div>
            
            <div className='instructor-details'>
            <img className='instructor-img' src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400" loading="lazy" alt="Instructor picture" width={191} height={254}/>
             <p>Instructor</p>
            </div>
            {state.loggedInUser?.id === contextState.course?.Instructor._id && <button className='create-asessment-btn' onClick={handleCreateAssement}>Create or add questions for this course Assessment here</button> }
            {state.loggedInUser?.id === contextState.course?.Instructor._id && <button onClick={handleDeleteCourse}  className='delete-course-btn'>Delete this Course</button>}
            
        </>
        
    )
    
}