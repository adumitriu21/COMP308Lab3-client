import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//import withRouter from './withRouter';
import { useNavigate, useParams } from 'react-router-dom';

function EditCourse(props) {

  const [course, setCourse] = useState({
    _id: '', code: '', title: '', description: '', semester: '', section: ''
  });

  //
  let navigate = useNavigate();
  // Get the courseId param from the URL.
  let { id } = useParams();
  console.log(id)
  //

  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, [apiUrl]);

  const updateArticle = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      code: course.code, title: course.title, description: course.description,
      semester: course.semester, section: course.section
    };
    //mimicks very much REST calls
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update', result.data)
        setShowLoading(false);
        navigate('/showCourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'semester' || name === 'section' ? parseInt(value, 10) : value
    }));
  }

  return (
    <div>
      <Form className="container-fluid" onSubmit={updateArticle}>
        <Form.Group>
          <Form.Label>Code:</Form.Label>
          <Form.Control type="text" name="code" value={course.code} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" name="title" value={course.title} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" value={course.description} name="description" onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Semester:</Form.Label>
          <Form.Control type="text" name="semester" value={course.semester} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Section:</Form.Label>
          <Form.Control type="text" name="section" value={course.section} onChange={onChange} />
        </Form.Group>

        <Button variant="primary" type="submit">Update Course</Button>

      </Form>
    </div>
  );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default EditCourse;
