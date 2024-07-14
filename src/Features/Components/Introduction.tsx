// Introduction.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';
React

const Introduction = () => {
    const navigate = useNavigate()
    return (
        <div className="introduction">
            <h1>Welcome to Our E-Learning Platform</h1>
            <p>
                Our platform offers a wide range of courses to help you develop your skills and advance your career. 
                Whether you are looking to learn something new or enhance your existing knowledge, we have the resources 
                you need to succeed. Explore our courses, connect with instructors, and join a community of learners today!
            </p>
            
                <button className="get-started-button" onClick={()=> navigate('/courses')}>Let's get started</button>
            
        </div>
    );
};

export default Introduction;
