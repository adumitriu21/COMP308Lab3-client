import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { STUDENTS_ENROLLED } from '../graphql/queries';

function ShowCourse(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  const [showLoading, setShowLoading] = useState(true);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { loading, error, data } = useQuery(STUDENTS_ENROLLED, {
    variables: { courseId: id },
    onCompleted: (data) => {
      setShowLoading(false);
    },
  });

  const editCourse = (id) => {
    navigate('/editCourse/' + id);
  };

  if (loading || showLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const students = data.course.studentsEnrolled;

  

  return (
    <div>
      <h1>Title: {data.course.title}</h1>
      <p>Content: {data.course.description}</p>
      <p>Number of Students Enrolled: {students.length}</p>
      <h2>Students Enrolled:</h2>
      <ul>
        {students.map((studentId) => (
          <li key={studentId}>{studentId}</li>
        ))}
      </ul>
      <p>
        <Button type="button" variant="primary" onClick={() => { editCourse(data.course._id) }}>Edit</Button>&nbsp;
      </p>
    </div>
  );
}

export default ShowCourse;
