import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import withRouter from './withRouter';
import { useNavigate, useParams } from 'react-router-dom';
//

function EditStudent(props) {

  const programOptions = [
    "Artificial Intelligence - Software Engineering Technology",
    "Automation and Robotics - Electro-Mechanical Engineering Technology",
    "Computer Systems Technology - Networking",
    "Game – Programming",
    "Health Informatics Technology",
    "Software Engineering Technology"
  ];

  const semesterOptions = [1, 2, 3, 4, 5, 6];
  //
  // Get the StudentId param from the URL.
  let { id } = useParams();
  console.log(id)
  let navigate = useNavigate();
  const [user, setUser] = useState({
    _id: '', firstName: '', lastName: '', address: '', city: '', phone: '',
    email: '', password: '', studentId: '', program: '', semester: '', startDate: ''
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/users/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setUser(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, [apiUrl]);

  const updateUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      firstName: user.firstName, lastName: user.lastName,
      address: user.address, city: user.city, phone: user.phone,
      email: user.email, password: user.password, studentId: user.studentId,
      program: user.program, semester: user.semester, startDate: user.startDate
    };
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateUser}>
        <Form.Group>
          <Form.Label> First Name</Form.Label>
          <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={user.firstName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Last Name</Form.Label>
          <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={user.lastName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Address</Form.Label>
          <Form.Control type="text" name="address" id="address" placeholder="Enter address" value={user.address} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> City</Form.Label>
          <Form.Control type="text" name="city" id="city" placeholder="Enter city" value={user.city} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Phone Number</Form.Label>
          <Form.Control type="text" name="phone" id="phone" placeholder="Enter phone #" value={user.phone} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={user.email} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={user.password} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" name="studentId" id="studentId" placeholder="Enter 9 digit ID" value={user.studentId} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Program</Form.Label>
          <Form.Select type="text" name="program" id="program" value={user.program} onChange={onChange}>
            <option>Select Program</option>
            {programOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Semester</Form.Label>
          <Form.Select type="text" name="semester" id="semester" value={user.semester} onChange={onChange}>
            <option>Select Semester</option>
            {semesterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" name="startDate" id="startDate" placeholder="YYYY-MM-DD" value={user.startDate} onChange={onChange} />
        </Form.Group>

          
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
    </div>
  );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default EditStudent;
