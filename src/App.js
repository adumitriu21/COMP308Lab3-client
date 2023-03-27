import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//    npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import StudentList from './components/StudentList';
import EditStudent from './components/EditStudent';
import EditCourse from './components/EditCourse';
import AddStudent from './components/AddStudent';
import ShowUser from './components/ShowUser';
import ShowCourse from './components/ShowCourse';
import CourseList from "./components/CourseList";
import CreateArticle from './components/CreateCourse';
import AllCourses from './components/AllCourses';
import Home from './components/Home';
import Login from './components/Login';
import axios from 'axios';
//
function App() {
  const [userType, setUserType] = useState('')
  const [userName, setUserName] = useState('')
  const [studentObjId, setStudentObjId] = useState('')

  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setUserType('');
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
        {userType === '' && (
          <Navbar.Brand href="#home">Welcome to Course Services</Navbar.Brand>
        )}
         {(userType === 'Student' || userType === 'Admin') && (
          <Navbar.Brand href="#home">Welcome {userName}</Navbar.Brand>
        )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              {userType === '' && (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}
              {userType === 'Admin' && (
              <Nav.Link as={Link} to="/students">List of Students</Nav.Link>
              )}
              {userType === 'Student' && (
              <Nav.Link as={Link} to="/courseList">Courses</Nav.Link>
              )}
              {userType === 'Admin' && (
                  <Nav.Link as={Link} to="/create">Add Student</Nav.Link>
              )}
              {userType !== '' && (
                <Nav.Link as={Link} to="/" onClick={deleteCookie}>Logout</Nav.Link>
              )}
              {userType === "Admin" && (
                 <Nav.Link as={Link} to="/createCourse">Add Course</Nav.Link>
              )}
               {userType === "Admin" && (
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
          <Route path="createCourse" element= {< CreateArticle userName={userName} setUserName={setUserName} />}  />
          <Route path="allCourses" element= {< AllCourses />}  />

        </Routes>
      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
