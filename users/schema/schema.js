const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  // Because you reference UserType in users field, and you have defined it under CompanyType
  // Now you hav circular dependency, thats why graphql creators came up with workaround
  // Here fields is a function which returns field types and resolvers
  // Closures BITCH!
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        const res = await axios(
          `http://localhost:3000/companies/${parentValue.id}/users`
        );
        return res.data;
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    company: {
      // Notice how here used company NOT companyId, because this is type
      // Thats why you define resolve here
      type: CompanyType,
      async resolve(parentValue, args) {
        //resolve functions take you from one position on graph to another position
        // parentValue us user with id 23
        const res = await axios.get(
          `http://localhost:3000/companies/${parentValue.companyId}`
        );
        return res.data;
      }
    }
  })
});

// Root Query determines how you enter a graph of data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType, //return type
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        //resolve functions take you from one position on graph to another position (here its entry point)
        const res = await axios.get(`http://localhost:3000/users/${args.id}`);
        return res.data;
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const res = await axios.get(
          `http://localhost:3000/companies/${args.id}`
        );
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

// Root Mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) }, // NonNull marks firstName required
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      async resolve(parentValue, { firstName, age }) {
        const res = await axios.post(`http://localhost:3000/users`, {
          firstName,
          age
        });
        return res.data;
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { id }) {
        const res = await axios.delete(`http://localhost:3000/users/${id}`);
        return res.data;
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        const res = await axios.patch(
          `http://localhost:3000/users/${args.id}`,
          args
        );
        return res.data;
      }
    }
  }
});

// Think of schema as bunch of functions that return references to nodes on you graph
// each edge on graph is a resolve function
// each node is you data
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
