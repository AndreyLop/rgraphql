import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import client from "./initialization/apollo";
import Router from "./router/router";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
