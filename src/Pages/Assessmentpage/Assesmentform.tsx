import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";

interface AssessmentForm {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export default function CreateAssessment() {
  const {courseId} = useParams()
  const [formState, setFormState] = useState<AssessmentForm>({
    question: "",
    answers: [],
    correctAnswer: ""
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`https://server-y9oe.onrender.com/asessments/${courseId}`, formState,{
        headers: { Authorization: `Bearer ${token}`}
      });
      await axios.get(`https://server-y9oe.onrender.com/updateQuestions/${courseId}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      setFeedback("Assessment created successfully!");
      console.log(response.data); 
    } catch (error) {
      setFeedback("Failed to create assessment. Please try again.");
    }
  };

  const handleAddAnswer = () => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      answers: [...prevFormState.answers, ""]
    }));
  };

  const handleAnswerChange = (index: number, value: string) => {
    setFormState((prevFormState) => {
      const updatedAnswers = [...prevFormState.answers];
      updatedAnswers[index] = value;
      return {
        ...prevFormState,
        answers: updatedAnswers
      };
    });
  };

  return (
    <Box sx={{ width: '60%', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: "transparent", borderRadius: '10px', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h4" gutterBottom>Create Assessment</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <TextField
            required
            fullWidth
            name="question"
            label="Question"
            variant="outlined"
            value={formState.question}
            onChange={handleChange}
          />
          {formState.answers.map((answer, index) => (
            <TextField
              key={index}
              required
              fullWidth
              name={`answers[${index}]`}
              label={`Answer ${index + 1}`}
              variant="outlined"
              value={answer}
              onChange={(event) => handleAnswerChange(index, event.target.value)}
            />
          ))}
          <Button variant="outlined" onClick={handleAddAnswer}>Add Answer</Button>
          <TextField
            required
            fullWidth
            name="correctAnswer"
            label="Correct Answer"
            variant="outlined"
            value={formState.correctAnswer}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Assessment
          </Button>
          {feedback && <Typography variant="body1" color={feedback.includes("Failed") ? "error" : "success"}>{feedback}</Typography>}
          {}
        </Box>
      </form>
    </Box>
  )
}