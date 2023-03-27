import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
//import withRouter from './withRouter';
import { useNavigate, useParams } from 'react-router-dom';
//
function ShowUser(props) {
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  //const apiUrl = "http://localhost:3000/users/" + props.match.params.id;
  const apiUrl = "http://localhost:3000/users/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, [apiUrl]);

  const editUser = (id) => {
    /*
    props.history.push({
      pathname: '/edit/' + id
    });
    */
   navigate('/edit/' + id);
  };

  const deleteUser = (id) => {
    setShowLoading(true);
    const user = { firstName: data.firstName, lastName: data.lastName, 
      email: data.email,username: data.username, password: data.password };
  
    axios.delete(apiUrl, user)
      .then((result) => {
        setShowLoading(false);
        //props.history.push('/list')
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
        <h1>Name: {data.firstName}, {data.lastName}</h1>
        <p>Email: {data.email}</p>
    

        <p>
          <Button type="button" variant="primary" onClick={() => { editUser(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteUser(data._id) }}>Delete</Button>
        </p>
    </div>
  );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default ShowUser;
