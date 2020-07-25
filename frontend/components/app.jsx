import React from "react";
import { Route, Switch, Link } from "react-router-dom";
// import { AuthRoute } from "../util/route_util";

import HomeContainer from './home/home_container';
import ArrangementContainer from './arrangement/arrangement_container';


const App = () => (
  <div id="app">
    <Link className="rewards-map" to={"/"}>
      Rewards Map
    </Link>
    <div id="main">
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/create" component={ArrangementContainer} />
        <Route
          exact
          path="/arrangements/:arrangementId/edit"
          component={ArrangementContainer}
        />
      </Switch>

      <div className="bio-container">
        <p>
          Demo project by{" "}
          <a href="https://jamiechu.dev/" target="_blank">
            Jamie Chu
          </a>
        </p>

        <div className="bio-links">
          <a href="https://github.com/echu18" target="_blank">
            <i className="fa fa-github fa-2x" aria-hidden="true"></i>
          </a>

          <a href="https://www.linkedin.com/in/echu18/" target="_blank">
            <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default App;
