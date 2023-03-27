import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import '../App.css';
//
// this component displays a list of students
function StudentList() {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:', result.data)
          //check if the user has logged in
          if (result.data.screen !== 'auth') {

            console.log('data in if:', result.data)
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/show/' + id);
  }

  return (

    <div>
      {data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}
          <table class="table">
            <thead class="thead-dark">
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
              {data.map((student) => (
                <tr key={student._id} onClick={() => { showDetail(student._id) }}>
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
        : < Login />
      }
    </div>
  )
}

//
      // withRouter will pass updated match, location, and history props 
      // to the wrapped component whenever it renders.
      export default StudentList;
