import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "./style/style";

import { Router } from "./components/Router";
import client from "./initializations/apollo";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Router />
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
