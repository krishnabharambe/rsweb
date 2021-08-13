import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login2 from "../../Components/Auth/Login2";
import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";
// import { Container } from './styles';

function AuthMainPage() {
  const state = useSelector((state) => state);
  return (
    <div>
      <Router basename="/">
        <Switch>
          <Route
            path="/rsweb/"
            exact
            render={(props) => <AuthLogin {...props} />}
          />
          <Route
            path="/rsweb/register/"
            exact
            render={(props) => <AuthRegister {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default AuthMainPage;
