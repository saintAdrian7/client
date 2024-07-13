import { useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";

import { useAuth } from "../../Context/Authconstants";
import { useCourseContext } from "../../Context/CourseContextconstants";
import { fetchCourse } from "../../Context/CourseContextactions";


interface Question {
  _id: string; 
  question: string;
  answers: string[];
  correctAnswer: string;
}

export default function  AssessmentPage () {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const colors = ['#CD070D', '#029EDC', '#E7690F', '#94B748'];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const { courseId } = useParams();
  const { state } = useAuth();
  const { contextState, dispatch } = useCourseContext();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (courseId && (!contextState.course || contextState.course._id !== courseId)) {
      fetchCourse(dispatch, courseId);
    }
  }, [courseId, contextState.course, dispatch]);

  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await axios.get(`http://localhost:4000/asessments/${courseId}`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        const data = response.data.Questions;
        setQuestions(data);
      
    };

    fetchQuestions();
  }, [courseId, token]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1));
      } else {
        setAssessmentComplete(true);
      }
    }, 2000);
  };

  const handleDeleteQuestion = async (questionId: string) => {

    
      await axios.delete(`http://localhost:4000/asessments/${questionId}`,{
        headers: { Authorization: `Bearer ${token}`}
      });
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== questionId));
  };

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: "transparent",
        borderRadius: '10px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: isSmallScreen ? '90%' : 'auto',
        margin: isSmallScreen ? '0 auto' : 'initial', 
      }}
    >
      <Typography variant="h4" gutterBottom>Assessment Time!</Typography>
      {!assessmentComplete ? (
        <>
          <Typography variant="h6" gutterBottom>Question {currentQuestionIndex + 1} of {questions.length}</Typography>
          <Box
            sx={{
              padding: '20px',
              backgroundColor: "#CD070D",
              borderRadius: '10px',
              width: isSmallScreen ? '100%' : '400px', // Adjust width for small screens
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              color: "#FFFFFF",
            }}
          >
            <Typography variant="h5" gutterBottom>{questions[currentQuestionIndex].question}</Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2, 1fr)', 
              gap: '10px',
              marginTop: '20px'
            }}
          >
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <Button
                key={index}
                variant={selectedAnswer === answer ? 'contained' : 'outlined'}
                onClick={() => handleAnswer(answer)}
                sx={{
                  font: "inder",
                  fontSize: "1.2rem",
                  width: isSmallScreen ? '100%' : '400px',
                  height: "fitcontent",
                  textTransform: 'none',
                  backgroundColor: selectedAnswer === answer ? colors[currentColorIndex] : undefined,
                  color: selectedAnswer === answer ? '#fff' : 'initial',
                  '&:hover': {
                    backgroundColor: selectedAnswer === answer ? colors[(currentColorIndex + 1) % colors.length] : undefined,
                  }
                }}
              >
                {answer}
              </Button>
            ))}
          </Box>
          {feedback && <Typography variant="h6" gutterBottom>{feedback}</Typography>}

          {state.loggedInUser?.id === contextState.course?.Instructor._id && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteQuestion(questions[currentQuestionIndex]._id)}
              sx={{ marginTop: '10px' }}
            >
              Delete Question
            </Button>
          )}
        </>
      ) : (
        <Typography variant="h6" gutterBottom>Assessment Complete! Thank you for your participation.</Typography>
      )}
    </Box>
  )
}
