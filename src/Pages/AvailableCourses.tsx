import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
//import SearchBar from '../Features/Components/SearchBar';

interface Course {
  _id: string;
  title: string;
  description: string;
  Instructor: { _id: string, firstName: string, lastName: string, Image: string };
  Image: string;
  students: string[];
  Modules: {
    _id: string;
    title: string;
    content: string;
    cover: string;
  }[];
}

const AvailableCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('http://localhost:4000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      {/* <SearchBar setCourses={setCourses}  /> */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card>
              <CardActionArea component={Link} to={`/CreateCourse/Course/${course._id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.Instructor.Image || 'https://via.placeholder.com/140'}
                  alt={`${course.Instructor.firstName} ${course.Instructor.lastName}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {course.description}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" component="p">
                    Instructor: {`${course.Instructor.firstName} ${course.Instructor.lastName}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvailableCourses;
