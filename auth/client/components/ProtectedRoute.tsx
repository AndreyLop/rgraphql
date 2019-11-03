import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../components/App";

interface PassedComponent {
  component: any;
  path: string;
  rest?: any;
}

export const ProtectedRoute: React.FC<PassedComponent> = ({
  component: Component,
  ...rest
}) => {
  const context = useContext<any>(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (context.authenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
