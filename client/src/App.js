import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

/* Misc */
import { ROUTES } from "./routes";

/* Components */
import Navigation from "./Pages/Navigation";
import Personal_info from "./Pages/Personal_info";
import Landing from "./Pages/Landing";
import Symptoms from "./Pages/Symptoms";

function App() {
  return (
    //The router navigates to the different pages
    <React.Fragment>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route exact path={ROUTES.INFO} component={Personal_info} />
          <Route exact path={ROUTES.SYMPTOMS} component={Symptoms} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
