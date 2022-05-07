const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const userType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: { type: GraphQLInt },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString }, 
      gender: { type: GraphQLString},
      location: { type: GraphQLString}
    }),
  });


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(userType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return [{ id: 1, first_name: "chowdary", last_name:"g", location: null, gender:"Male" }];
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: null });
