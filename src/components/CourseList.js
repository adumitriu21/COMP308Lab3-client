import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

//

const CourseList = ({ studentObjId }) => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');


  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(`/api/myCourses/${studentObjId}`);
      const response1 = await axios.get('/api/courses');
      setCourses(response.data);
      setAvailableCourses(response1.data)
    };

    fetchCourses();
  }, [studentObjId]);

  const removeStudentFromCourse = async (studentObjId, courseObjId) => {
    try {
      await axios.put(`/api/myCourses/${studentObjId}`, { courseId: courseObjId });
      setMessage(`Student ${studentObjId} removed from course ${courseObjId}`);
      const updatedCourses = courses.filter((course) => course._id !== courseObjId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropCourse = async (studentId, courseId) => {
    if (window.confirm("Are you sure you want to drop this course?")) {
      await removeStudentFromCourse(studentId, courseId);

    }
  }

  const handleSelectChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleAddCourse = async () => {
    console.log("sutdent ID from react: " + studentObjId)
    console.log("course ID from react: " + selectedCourse)
    try {
      const response = await axios.put(`/api/addCourse/${studentObjId}`, { courseId: selectedCourse });


      // Check if the response contains an error message
      if (response.status === 400) {
        throw new Error("Already enrolled in this course!");
      }

      const newAddedCourse = response.data
      setCourses([...courses, newAddedCourse])

      setMessage(`Course ${newAddedCourse.title} added!`);

    } catch (error) {
      console.error(error);
      setMessage("Already enrolled in this course!")
    }

    console.log(`Course ${selectedCourse} added`);
  };

  return (
    <div>
      <h2>My Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Description</th>
            <th>Semester</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.semester}</td>
              <td>{course.section}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDropCourse(studentObjId, course._id)}>Drop</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div>
        <select value={selectedCourse} onChange={handleSelectChange}>
          <option value="">Select Course</option>
          {availableCourses.map((course) => (
            <option key={course._id} value={course._id.toString()}>
              {course.code} {course.title} Sec:{course.section}
            </option>
          ))}
        </select>
        <Button variant="primary" size="lg" style={{ marginLeft: "30px"}}
          onClick={handleAddCourse} disabled={!selectedCourse} >
          Add Course
        </Button>
      </div>


      {/* Display the message */}
      {message &&
        <h6 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2em', marginTop: '20px'}}>
          {message}
        </h6>}
    </div>




  );
};

export default CourseList;