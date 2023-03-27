
//import withRouter from './withRouter';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Lab2 - Adrian Dumitriu</h2>
            <p>React front-end calls Express REST API with CRUD operations for Student and Course object.</p>
        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;