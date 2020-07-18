import React from "react";
import { Route, Switch, Link } from "react-router-dom";
// import { AuthRoute } from "../util/route_util";

import HomeContainer from './home/home_container';
import ArrangementContainer from './arrangement/arrangement_container';


const App = () => (
  <div id="app">
    <span id="category-divider"></span>
    <h3>Rewards Map</h3>
    <div id="main">
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/create" component={ArrangementContainer} />
        <Route exact path="/arrangements/:arrangementId/edit" component={ArrangementContainer} />
      </Switch>
    </div>
  </div>
);

export default App;
