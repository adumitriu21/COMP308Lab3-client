import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllCourses = (props) => {

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/allCourses');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const handleRowClick = (course) => {
    navigate(`/showCourse/${course._id}`);
  };
  
 


  return (
    <div>
      <h1>Courses</h1>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Semester</th>
            <th scope="col">Section</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} >
            
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.semester}</td>
              <td>{course.section}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleRowClick(course)}>View</Button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCourses;
