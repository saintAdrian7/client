// Introduction.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Introduction.css';
React

const Introduction = () => {
    return (
        <div className="introduction">
            <h1>Welcome to Our E-Learning Platform</h1>
            <p>
                Our platform offers a wide range of courses to help you develop your skills and advance your career. 
                Whether you are looking to learn something new or enhance your existing knowledge, we have the resources 
                you need to succeed. Explore our courses, connect with instructors, and join a community of learners today!
            </p>
            <Link to="/CourseList">
                <button className="get-started-button">Let's get started</button>
            </Link>
        </div>
    );
};

export default Introduction;
