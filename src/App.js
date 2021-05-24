import Home from './components/Home'
import Accounts from './components/Accounts'
import Investors from './components/Investors'
import Projects from './components/Projects'
import Toppen from './components/Toppen'
import Account from './components/Account'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Toppen/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/accounts" exact component={Accounts} />
        <Route path="/account/:title" component={Account} />
        <Route path="/investors" exact component={Investors} />
        <Route path="/projects" exact component={Projects} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
