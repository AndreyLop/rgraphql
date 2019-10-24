import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./style/style";

import { Router } from "./components/Router";

// ApolloCLient dosent know anything about react
// ApolloProvider is what connects ApolloClient to React
// Also notice no configuration is passed to ApolloClient
// Client is making assumption that all requests are going to /graphql endpoint
const client = new ApolloClient({});

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
