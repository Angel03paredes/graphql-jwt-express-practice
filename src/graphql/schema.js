const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const { Register,Login,Post } = require("./mutations");
const { Hello , Users,User,PostsOwner,Posts} = require("./queries");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    hello: Hello,
    users:Users,
    user:User,
    postsOwner:PostsOwner,
    posts:Posts
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationsType",
  description: "The mutations type",
  fields: {
    register: Register,
    login:Login,
    post:Post
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

module.exports = schema;
