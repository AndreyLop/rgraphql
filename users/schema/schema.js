const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

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
    },
    companyId: {
      type: GraphQLString
    }
  }
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});

// RootQuery determines how you enter a graph of data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType, //return type
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const res = await axios.get(`http://localhost:3000/users/${args.id}`);
        return res.data;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        const res = await axios.get(`http://localhost:3000/users`);
        return res.data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
