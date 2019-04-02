import React from 'react';
import Heading from './Heading/Heading.js';
import './Admin.css';
import Nav from './Nav/Nav';
const Admin=({onRouteChange})=>{
    return(
        <div className="homeBackground white">
            <Heading></Heading>
            <Nav onRouteChange={onRouteChange}></Nav>
        </div>
    );
}
export default Admin;