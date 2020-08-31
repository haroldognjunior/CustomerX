import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/App.css';
import Home from './components/Usuario/Home';
import exportCriarUsuario from './components/Usuario/index';
import exportCriarCliente from './components/Cliente/index';
import CriarContato from './components/Contacto/CriarContato';
import Clientes from './components/Cliente/Clientes';
import Login from './components/Usuario/Login';
import Cliente from './components/Cliente/Cliente';
import ListaContatos from './components/Contacto/Contato';
import RegistroCliente from './components/Usuario/FormularioRegistroCliente';
import Clientedetalhado from './components/Cliente/Clientedetalhado';

import NotFound from './components/404/NotFound';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Switch>
           <Route exact path="/" component={Home} />
           <Route exact path="/registrousuario" component={exportCriarUsuario} />
           <Route exact path="/registrocliente" component={exportCriarCliente} />
          {/*  <Route exact path="/registrocontato" component={exportCriarContato} /> */}
           <Route exact path="/registrocontato/:id" component={({ match }) => <CriarContato id={match.params.id} />} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/cliente" component={Cliente} />
           <Route exact path="/clientes" component={Clientes} />
           <Route exact path="/clientes/:id" component={({ match }) => <Clientedetalhado id={match.params.id} />} />
           <Route path="/contatos" component={ListaContatos} />
           <Route exact path="/formulario" component={RegistroCliente} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      </header>
    </div>
  );
}

export default App;
