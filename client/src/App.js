import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/App.css';
import Home from './components/Usuario/Home';
import exportCriarUsuario from './components/Usuario/index';
import Login from './components/Usuario/Login';
import NotFound from './components/404/NotFound';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Switch>
           <Route exact path="/" component={Home} />
           <Route exact path="/registro" component={exportCriarUsuario} />
           <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      </header>
    </div>
  );
}

export default App;
