import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './Context/AuthContextProvider.tsx'
import { CourseProvider } from './Context/CourseContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CourseProvider>
      <App />

      </CourseProvider>
    
    </AuthProvider>
    
  </React.StrictMode>,
)
