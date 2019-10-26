import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

// Every piece of data yoyu fetch, look at it and identify every piece by id
// This is done for optimisation of client side
// Every mutation MUST have id
const cache = new InMemoryCache({});

// ApolloCLient dosent know anything about react
// ApolloProvider is what connects ApolloClient to React
// Also notice no configuration is passed to ApolloClient
// Client is making assumption that all requests are going to /graphql endpoint
export default new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink(),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
});
