const { GraphQLString } = require("graphql");
const { User,Post:PostModel } = require("./../models");
const { createJWT } = require("./../util/jwt");
const {PostType} = require("./types")

const Register = {
  type: GraphQLString,
  description: "Mutation Register",
  args: {
    userName: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
  resolve: async (_, data) => {
    const user = await User.create(data);
    const token = createJWT({
      id:user.id,
      userName: user.userName,
      email: user.email,
      displayName: user.displayName,
    });
    return token;
  },
};

const Login = {
  type: GraphQLString,
  description: "User login",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, { email, password }) {
    const user = await User.findOne({ email, password });
    if(!user) throw new Error("User not found")
    const jwt = createJWT({
      id:user.id,
      userName: user.userName,
      email: user.email,
      displayName: user.displayName,
    });
    return jwt;
  },
};

const Post = {
  type: PostType ,
  description: "Create Post",
  args:{
    title:{type:GraphQLString},
    body:{type:GraphQLString}
  },
  resolve (_,{title,body},{verifiedUser}){
    if(!verifiedUser)throw new Error("Token no provided")
    
    return PostModel.create({authorId:verifiedUser.id,title,body})
  }
}

module.exports = {
  Register,
  Login,
  Post
};
