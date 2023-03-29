import React from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { GET_COURSES } from '../graphql/queries';

const AllCourses = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_COURSES);

  const handleRowClick = (course) => {
    navigate(`/showCourse/${course._id}`);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Courses</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Semester</th>
            <th scope="col">Section</th>
          </tr>
        </thead>
        <tbody>
          {data.courses.map((course) => (
            <tr key={course._id}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.semester}</td>
              <td>{course.section}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleRowClick(course)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCourses;
