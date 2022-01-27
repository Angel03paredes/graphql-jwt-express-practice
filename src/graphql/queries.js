
const { GraphQLString, GraphQLList,  } = require("graphql");
const {User:UserModel,Post:PostModel } = require("./../models")
const {UserType,PostType} = require("./types")

const Hello = {
    type: GraphQLString,
    description: "hello schema",
    resolve: () => "Hello world",
  }
const Users = {
    type : new GraphQLList(UserType),
    description:"Users",
    resolve:  ()=>{
         return  UserModel.find()
    }
}

const User = {
  type: UserType,
  description: "The user info",
  args:{id:{type:GraphQLString}},
  async resolve (_,{id}){
    const user = await UserModel.findById(id)
    return user
  }
}

const PostsOwner = {
  type: new GraphQLList(PostType),
  description:"The posts query",
   resolve(_,__,{verifiedUser}){
     if(!verifiedUser)throw new Error("Token no provided")
    return PostModel.findById(verifiedUser)
  }
}

const Posts = {
  type: new GraphQLList(PostType),
  description:"The posts query",
   resolve(){
    return PostModel.find()
  }
}

module.exports = {
  Hello,
  Users,
  User,
  PostsOwner,
  Posts
};
