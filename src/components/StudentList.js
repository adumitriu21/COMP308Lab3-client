import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useQuery, gql } from '@apollo/client';

const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      firstName
      lastName
      email
      studentId
      program
      semester
      startDate
    }
  }
`;

function StudentList() {
  let navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_STUDENTS);

  const showDetail = (id) => {
    navigate('/show/' + id);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {data.students.length !== 0 ? (
        <div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Student ID</th>
                <th scope="col">Program</th>
                <th scope="col">Semester</th>
                <th scope="col">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((student) => (
                <tr key={student.id} onClick={() => showDetail(student.id)}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.studentId}</td>
                  <td>{student.program}</td>
                  <td>{student.semester}</td>
                  <td>{student.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default StudentList;
