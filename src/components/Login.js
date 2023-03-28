import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { useMutation, gql } from '@apollo/client';

const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      userType
      userId
      token
      name
    }
  }
`;

function Login({ setUserType, setUserName, setStudentObjId }) {
  const [responseMessage, setResponseMessage] = useState('');
  const [loginMutation] = useMutation(AUTHENTICATE_USER);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data.authenticateUser.token) {
        Cookies.set('token', data.authenticateUser.token);
        localStorage.setItem('userType', data.authenticateUser.userType);
        localStorage.setItem('userName', data.authenticateUser.name);
        localStorage.setItem('studentObjId', data.authenticateUser.userId);
        window.location.href = '/';
      } else {
        setResponseMessage('Invalid email or password');
      }
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <div className="App">
      <Form className="container-fluid" onSubmit={handleLogin}>
        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" id="email" placeholder="Enter email address" />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" id="password" placeholder="Enter password" />
        </Form.Group>
        {responseMessage && <p>{responseMessage}</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
