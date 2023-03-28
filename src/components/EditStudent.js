import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import client from './apollo'
import { GET_STUDENT } from '../graphql/queries';
import { UPDATE_STUDENT} from '../graphql/mutations';




function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    studentId: '',
    program: '',
    semester: '',
    startDate: ''
  });
  const [showLoading, setShowLoading] = useState(true);
  const [updateUser, { loading: updating }] = useMutation(UPDATE_STUDENT);


  const programOptions = [
    'Artificial Intelligence - Software Engineering Technology',
    'Automation and Robotics - Electro-Mechanical Engineering Technology',
    'Computer Systems Technology - Networking',
    'Game Programming',
    'Health Informatics Technology',
    'Software Engineering Technology'
  ];

  const semesterOptions = [1, 2, 3, 4, 5, 6];

  
  useEffect(() => {
    setShowLoading(false);

    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_STUDENT,
          variables: { id }
        });

        setUser(data.student);
      } catch (error) {
        console.log(error);
      }

      setShowLoading(false);
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    setShowLoading(true);
    e.preventDefault();
    const { firstName, lastName, email, password, studentId, address, city, phone, program, semester, startDate } = user;
    const studentIdInt = parseInt(studentId, 10);
    const semesterInt = parseInt(semester, 10);
    
    // Map human-readable program names to enum values
    const programMapping = {
      "Artificial Intelligence - Software Engineering Technology": "ARTIFICIAL_INTELLIGENCE_SOFTWARE_ENGINEERING_TECHNOLOGY",
      "Automation and Robotics - Electro-Mechanical Engineering Technology": "AUTOMATION_AND_ROBOTICS_ELECTRO_MECHANICAL_ENGINEERING_TECHNOLOGY",
      "Computer Systems Technology - Networking": "COMPUTER_SYSTEMS_TECHNOLOGY_NETWORKING",
      "Game – Programming": "GAME_PROGRAMMING",
      "Health Informatics Technology": "HEALTH_INFORMATICS_TECHNOLOGY",
      "Software Engineering Technology": "SOFTWARE_ENGINEERING_TECHNOLOGY"
    };
    const programEnum = programMapping[program];


    try {
      await updateUser({ variables: { id, firstName, lastName, email, password, studentId: studentIdInt, address, city, phone, program: programEnum, semester: semesterInt, startDate } });
      setShowLoading(false);
      navigate('/');
    } catch (error) {
      setShowLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            value={user.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            value={user.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            id="address"
            placeholder="Enter address"
            value={user.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            id="city"
            placeholder="Enter city"
            value={user.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter phone #"
            value={user.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            id="email"
            rows="3"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            name="studentId"
            id="studentId"
            placeholder="Enter 9 digit ID"
            value={user.studentId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Program</Form.Label>
          <Form.Select
            type="text"
            name="program"
            id="program"
            value={user.program}
            onChange={handleChange}
          >
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
          <Form.Select
            type="text"
            name="semester"
            id="semester"
            value={user.semester}
            onChange={handleChange}
          >
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
          <Form.Control type="date" name="startDate" id="startDate" placeholder="YYYY-MM-DD" value={user.startDate} onChange={handleChange} />
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
