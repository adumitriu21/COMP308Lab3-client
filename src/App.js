import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { ApolloProvider} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';
import './App.css';
//
import StudentList from './components/StudentList';
import EditStudent from './components/EditStudent';
import EditCourse from './components/EditCourse';
import AddStudent from './components/AddStudent';
import ShowUser from './components/ShowUser';
import ShowCourse from './components/ShowCourse';
import CourseList from "./components/CourseList";
import CreateCourse from './components/CreateCourse';
import AllCourses from './components/AllCourses';
import Home from './components/Home';
import Login from './components/Login';
import client from './components/apollo'
//
function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || '');
const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
const [studentObjId, setStudentObjId] = useState(localStorage.getItem('studentObjId') || '');

  
function logout() {
  // Clear all items from local storage
  localStorage.clear();
  // Remove the 'token' cookie using the 'js-cookie' library
  Cookies.remove('token');
  // Redirect the user to the login page
  window.location.href = '/login';
}
  

  return (
    <ApolloProvider client={client}>
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg" key={`${userType}-${userName}`}>
        <Container>
        {userType === '' && (
          <Navbar.Brand href="#home">Welcome to Course Services</Navbar.Brand>
        )}
         {(userType === 'student' || userType === 'admin') && (
          <Navbar.Brand href="#home">Welcome {userName}</Navbar.Brand>
        )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              {userType === '' && (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}
              {userType === 'admin' && (
              <Nav.Link as={Link} to="/students">List of Students</Nav.Link>
              )}
              {userType === 'student' && (
              <Nav.Link as={Link} to="/courseList">Courses</Nav.Link>
              )}
              {userType === 'admin' && (
                  <Nav.Link as={Link} to="/create">Add Student</Nav.Link>
              )}
              {userType !== '' && (
                <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
              )}
              {userType === "admin" && (
                 <Nav.Link as={Link} to="/createCourse">Add Course</Nav.Link>
              )}
               {userType === "admin" && (
                 <Nav.Link as={Link} to="/allCourses">All Courses</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />         
          <Route path="create" element ={< AddStudent />} />
          <Route path="login" element= {< Login setUserType={setUserType} setUserName={setUserName} setStudentObjId={setStudentObjId} />}  />
          <Route path="students" element= {< StudentList  />}  />
          <Route path="courseList" element= {< CourseList studentObjId={studentObjId}/>}  />
          <Route path="edit/:id" element= {< EditStudent />}  />
          <Route path="show/:id" element= {< ShowUser />}  />
          <Route path="showCourse/:id" element= {< ShowCourse />}  />
          <Route path="editCourse/:id" element= {< EditCourse />}  />
          <Route path="createCourse" element= {< CreateCourse userName={userName} setUserName={setUserName} />}  />
          <Route path="allCourses" element= {< AllCourses />}  />

        </Routes>
      </div>

    </Router>
    </ApolloProvider>

  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
