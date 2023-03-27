import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
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
    }
  }
`;


//
function Login({setUserType, setUserName, setStudentObjId}) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  const [responseMessage, setResponseMessage] = useState('');
  const [loginMutation, { data }] = useMutation(AUTHENTICATE_USER);
  //store input field data, user name and password
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
 
  //send username and password to the server
  // for initial authentication
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      console.log(data.authenticateUser);

        // Check if the authenticateUser mutation returned a valid token
    if (data.authenticateUser.token) {
      // Set the 'token' cookie using the 'js-cookie' library
      Cookies.set('token', data.authenticateUser.token);
      console.log(Cookies.get('token'));

      // Redirect the user to the home page
      window.location.href = '/';
      setUserType(data.authenticateUser.userType);
      setUserName(data.authenticateUser.userName);
      setStudentObjId(data.authenticateUser.studentObjId);

        // Log the token
       

    } else {
      setResponseMessage('Invalid email or password');
    }

    } catch (error) {
      setResponseMessage(error.message);
    }
  };
  
  return (
    <div className="App">
      
   
      {screen === 'auth' 
        ? <div>
          

          <Form className="container-fluid" onSubmit={handleLogin} >
              
              <Form.Group class="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" id="email" placeholder="Enter email address" onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group class="form-group">
                <Form.Label>Password:</Form.Label>
                <Form.Control  type="password" name="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              {responseMessage && <p>{responseMessage}</p>}
          
              <Button variant="primary" type="submit" >
                Login
              </Button>
            </Form>


        </div>
        :<div>
           

    
        </div>
      }
        
    </div>
  );
}

export default Login;

