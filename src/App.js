import Home from './components/Home'
import Projects from './components/Projects'
import Exchange from './components/Exchange'
import Toppen from './components/Toppen'
import Project from './components/Project'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio'
import Login from './components/Login'
import React, { useState, useEffect } from "react";
import { AppContext } from "./config/contextLib";
import AuthService from './services/authservice';
import { useHistory } from "react-router-dom";



function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await AuthService.hasAuthString();
      console.log("AUTHSERVICE: ",AuthService.hasAuthString());
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await AuthService.logout();
  
    userHasAuthenticated(false);
    history.push("/login");
  }
  
  
  return (
    !isAuthenticating && (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
    <Router>
    <div className="App">
      <Toppen/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/project/:title" component={Project} />
        <Route path="/exchange" exact component={Exchange} />
        <Route path="/portfolio" exact component={Portfolio} />
      </Switch>
    </div>
    </Router>
    </AppContext.Provider>
    )
  );
}



export default App;
