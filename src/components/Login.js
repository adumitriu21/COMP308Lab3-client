import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//
import axios from 'axios';


//
function Login({setUserType, setUserName, setStudentObjId}) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  const [responseMessage, setResponseMessage] = useState('');

  //store input field data, user name and password
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  //send username and password to the server
  // for initial authentication
  const authenticateUser = async () => {
    console.log('calling auth')
    console.log(email)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        setUserType(res.data.type);

        if(res.data.type === 'Student'){
          setStudentObjId(res.data.studentObjId)
        }
        setUserName(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
      setResponseMessage("Invalid Login Credentials!")
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      
   
      {screen === 'auth' 
        ? <div>
          

          <Form className="container-fluid" >
              
              <Form.Group class="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" id="email" placeholder="Enter email address" onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group class="form-group">
                <Form.Label>Password:</Form.Label>
                <Form.Control  type="password" name="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              {responseMessage && <p>{responseMessage}</p>}
          
              <Button variant="primary" type="Button" onClick={authenticateUser}>
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

