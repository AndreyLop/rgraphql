const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

const users = [
  {
    id: "23",
    firstName: "John",
    age: 30
  },
  {
    id: "45",
    firstName: "Jack",
    age: 34
  }
];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        const { id } = args;
        return _.find(users, { id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
