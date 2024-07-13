import { useRef, useState, useEffect } from "react";
import axios from "axios";

import './Moduleform.css';
import { useCourseContext } from "../../../../Context/CourseContextconstants";
import { fetchCourse } from "../../../../Context/CourseContextactions";

interface ModulePayload {
  module: {
    title: string;
    content: string;
    course: string | undefined;
  }
}

interface ModuleUpdatePayload {
  updateData: {
    title: string | undefined;
    content: string;
    course: string | undefined;
  }
}

interface ModuleFormProps {
  setDisplayModuleForm: () => void;
  initialData?: {
    _id: string;
    title: string;
    content: string;
  } | null;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ setDisplayModuleForm, initialData }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<boolean>(false);
  const { contextState, dispatch } = useCourseContext();

  useEffect(() => {
    if (initialData) {
      if (titleRef.current) titleRef.current.value = initialData.title;
      if (contentRef.current) contentRef.current.value = initialData.content;
    }
  }, [initialData]);

  const handleModuleUpdate = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const token = localStorage.getItem('token')
    e.preventDefault();
    if (!titleRef.current || !contentRef.current) return;

    const moduleData: ModuleUpdatePayload = {
      updateData: {
        title: titleRef.current.value,
        content: contentRef.current.value,
        course: contextState.course?._id
      }
    };

    const moduleId = initialData?._id;
    const courseId = contextState.course?._id;

    try {
      await axios.patch(`http://localhost:4000/modules/${moduleId}`, moduleData,{
        headers: { Authorization: `Bearer ${token}`}
      });
      await axios.get(`http://localhost:4000/update/${courseId}`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setDisplayModuleForm();
      setError(false);
      fetchCourse(dispatch, courseId);
    } catch (error) {
      setError(true);
    }
  };

  const handleModuleSubmission = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (titleRef.current && contentRef.current) {
        const moduleData: ModulePayload = {
          module: {
            title: titleRef.current.value,
            content: contentRef.current.value,
            course: contextState.course?._id
          }
        };

        const courseId = contextState.course?._id;

        await axios.post("http://localhost:4000/modules", moduleData);
        await axios.get(`http://localhost:4000/update/${courseId}`);
        setDisplayModuleForm();
        setError(false);
        fetchCourse(dispatch, courseId);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <form className="module-form">
      <h2 className="module-form-title">Title:</h2>
      <input className="module-form-input-title" name="title" required placeholder="Enter module title..." ref={titleRef} />
      <h2 className="module-form-title">Content:</h2>
      <textarea className="module-form-input-content" name="content" required placeholder="Enter module text content..." ref={contentRef} />
      <div className="buttons">
        <button className="module-form-btn" onClick={handleModuleSubmission}>Create Module</button>
        {initialData && <button className="module-form-btn" onClick={handleModuleUpdate}>Update Module</button>}
      </div>
      {error && <p className="module-form-error">Unable to upload module at this time</p>}
    </form>
  );
};

export default ModuleForm