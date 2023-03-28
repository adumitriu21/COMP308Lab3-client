import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
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

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id) {
      id
    }
  }
`;


function ShowUser() {
  let navigate = useNavigate();
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_STUDENT, {
    variables: { id },
  });

  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    fetchPolicy: "no-cache" ,
    onCompleted: (data) => {
      console.log("Student deleted successfully:", data);
      navigate('/list');
    },
    onError: (error) => {
      console.log("Error deleting student:", error);
    },
  });

  const deleteUser = async (id) => {
    // Show a confirmation popup
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
  
    // If the user confirms the deletion, proceed
    if (confirmDelete) {
      try {
        const { data } = await deleteStudent({ variables: { id } });
        if (data && data.deleteStudent) {
          // Redirect to the list of students after successful deletion
          navigate('/students');
        } else {
          console.log('Error deleting student:', data);
        }
      } catch (error) {
        console.log('Error deleting student:', error);
      }
    }
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

  const student = data.student;

  return (
    <div>
      <h1>
        Name: {student.firstName}, {student.lastName}
      </h1>
      <p>Email: {student.email}</p>
      {/* Add more fields if needed */}

      <p>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            navigate('/edit/' + student.id);
          }}
        >
          Edit
        </Button>
        &nbsp;
        <Button
          type="button"
          variant="danger"
          onClick={deleteUser}
        >
          Delete
        </Button>
      </p>
    </div>
  );
}

export default ShowUser;
