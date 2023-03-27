import axios from 'axios';
//import withRouter from './withRouter';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//



const CreateCourse = () => {

  let navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState(1);
  const [section, setSection] = useState(100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = { code, title, description, semester, section };
      await axios.post('/api/createCourse', newCourse)
        .then((result) => {
          setShowLoading(false);
          alert('Course added successfully!');
          console.log('results from save article:',result.data)
          navigate('/')

      }).catch((error) => setShowLoading(false));
    } catch (err) {
      console.error(err);
      alert('Failed to add course');
    }
  };

  return (
    <form class="container-fluid" onSubmit={handleSubmit}>
      <div class="form-group">
        <label>Code:</label>
        <input type="text" class="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea value={description} class="form-control" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div class="form-group">
        <label>Semester:</label>
        <input type="number" class="form-control" value={semester} onChange={(e) => setSemester(e.target.value)} />
      </div>
      <div class="form-group">
        <label>Section:</label>
        <input type="number" class="form-control" value={section} onChange={(e) => setSection(e.target.value)} />
      </div>
      <div >
      <button class="btn btn-primary mb-2" type="submit">Add Course</button>
      </div>
    </form>
  );
};

export default CreateCourse