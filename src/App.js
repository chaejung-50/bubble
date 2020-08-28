import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/LandingPage';
import UserPage from './pages/UserPage';
import { AuthProvider } from './helpers/useAuth';
import PrivateRoute from './helpers/usePrivateRoute';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={ LandingPage }/>
          <PrivateRoute exact path='/userPage' component={ UserPage }/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
