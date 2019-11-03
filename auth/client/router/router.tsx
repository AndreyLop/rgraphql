import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { App } from "../components/App";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { Dashboard } from "../components/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default () => {
  return (
    <HashRouter>
      <App>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </App>
    </HashRouter>
  );
};
