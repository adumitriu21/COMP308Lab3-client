
//import withRouter from './withRouter';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Lab3 - Adrian Dumitriu</h2>
            <p>React front-end calls Express GraphQL API which exposes CRUD functionalities for a student/course system</p>
        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;