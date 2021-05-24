import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap'


const Toppen = props => {

        return (
            <div>
        <Navbar expand="lg" variant="light" bg="light">
          <Navbar.Brand href="/">Oasislogo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/accounts">Accounts</Nav.Link>
          <Nav.Link href="/investors">Investors</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
        );
      
    }
    
export default Toppen;