import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap'
import logo from '../oasislogo.png';


const Toppen = props => {

        return (
            <div>
        <Navbar expand="lg" variant="light" bg="light">
          <Navbar.Brand href="/"><img src={logo} height="51" width="57"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/exchange">Exchange</Nav.Link>
          <Nav.Link href="/portfolio">Portfolio</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
        );
      
    }
    
export default Toppen;