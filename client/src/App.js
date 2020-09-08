import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase, { FirebaseContext } from './components/firbase';
import Home from './components/Home';

/* Misc */
import { ROUTES } from "./routes";

function App() {
  return (
    //The router navigates to the different pages
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </FirebaseContext.Provider>
      </Router>
  );
}

export default App;
