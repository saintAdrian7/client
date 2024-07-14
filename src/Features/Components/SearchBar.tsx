// src/components/SearchBar.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

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

interface SearchBarProps {
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setCourses }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get<Course[]>(`http://localhost:4000/Courses/search?q=${query}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error searching courses', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses"
        sx={{ flexGrow: 1 }}
      />
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
