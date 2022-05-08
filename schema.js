const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLScalarType,
} = graphql;

const userService = require("./services/index");

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GraphQLString },
    location: { type: locationScalar },
  }),
});

const locationScalar = new GraphQLScalarType({
  name: "location",
  serialize(value) {
    const location = { lat: value.x, lng: value.y };
    return location;
  },
});

const countType = new GraphQLObjectType({
  name: "count",
  description: "count",
  fields: () => ({
    count: { type: GraphQLInt },
  }),
});

const getAllUserType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
    },
    count: {
      type: countType,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: getAllUserType,
      args: {
        skip: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const users = await userService.getUsers(args.skip, args.limit);
        const count = await userService.usersCount();
        return { users, count };
      },
    },
    nearByUsers: {
      type: new GraphQLList(userType),
      args: {
        radius: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const users = await userService.nearByUsers(args.radius);
        return users;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: null });
