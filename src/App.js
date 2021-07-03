import Home from './components/Home'
import Projects from './components/Projects'
import Exchange from './components/Exchange'
import Toppen from './components/Toppen'
import Project from './components/Project'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio'

function App() {
  return (
    <Router>
    <div className="App">
      <Toppen/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/project/:title" component={Project} />
        <Route path="/exchange" exact component={Exchange} />
        <Route path="/portfolio" exact component={Portfolio} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
