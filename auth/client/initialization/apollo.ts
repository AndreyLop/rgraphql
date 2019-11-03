import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = createHttpLink({
  credentials: "same-origin"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
});

export default client;
