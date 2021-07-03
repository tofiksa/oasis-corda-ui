import React, { Component } from 'react';
import AuthService from '../services/authservice';

class Home extends Component {

  componentDidMount() {
    AuthService.login();
  }

    
      render () {
        return (
            <h1>Home!!!</h1>
        );
      }
    }
    


export default Home;