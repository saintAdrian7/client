import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Grid, Box, CircularProgress } from '@mui/material';

interface Course {
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
  }[];
}

const AvailableCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const courseColors = ['#E7690F', '#94B748', '#029EDC', '#FB667C'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('https://server-y9oe.onrender.com/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses', error);
        setLoading(false); 
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card sx={{ backgroundColor: courseColors[index % courseColors.length],height:'210px', color: '#FFFFFF' }}>
              <CardActionArea component={Link} to={`/CreateCourse/Course/${course._id}`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" sx={{ color: '#FFFFFF' }}>
                    {course.description}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" component="p" sx={{ color: '#FFFFFF' }}>
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
