import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPageMenu from "../../Components/Services/MainPageMenu";
import AllServices from "./AllServices";
import HomeMainPage from "./HomeMainPage";
import SubServices from "./SubServices";
import SubServiceDetail from "./../../Components/Services/SubServiceDetail";
function Home(props) {
  return (
    <div>
      <div>
        <MainPageMenu />
        <Router basename="/rsweb/">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <HomeMainPage {...props} />}
            />
            <Route
              path="/services/"
              exact
              render={(props) => <AllServices {...props} />}
            />
            <Route
              path="/services/:id"
              exact
              render={(props) => <SubServices {...props} />}
            />
            <Route
              path="/subservices/:id"
              exact
              render={(props) => <SubServiceDetail {...props} />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default Home;
