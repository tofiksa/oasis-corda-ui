import React, { Component } from 'react';
import { useHistory } from "react-router-dom";

export default function Home() {

    const history = useHistory();
    history.push("/login");  
      
    return (
        <h1>Home!!!</h1>
    );
  }
    
