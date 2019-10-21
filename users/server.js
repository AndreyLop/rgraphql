const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// Compatability layer for GraphQL
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const PORT = 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
