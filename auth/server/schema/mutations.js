const graphql = require("graphql");
const UserType = require("./types/user_type");
const AithService = require("../services/auth");

const { GraphQLObjectType, GraphQLString } = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AithService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, { email, password }, req) {
        // Saving user cause when we logging out it will be undefiend and you must return it
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AithService.login({ email, password, req });
      }
    }
  })
});

module.exports = mutation;
