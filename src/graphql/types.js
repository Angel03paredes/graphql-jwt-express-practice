const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql")

const {User:UserModel} = require("./../models")

const UserType = new GraphQLObjectType({
    name:"UserType",
    description:"User type",
    fields:{
        id:{type:GraphQLID},
        userName:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        displayName:{type:GraphQLString}
    }
})

const PostType = new GraphQLObjectType({
    name:"PostType",
    description:"Post type",
    fields:{
        author:{type:UserType,
        resolve({authorId}){
            return UserModel.findById(authorId)
        }
        },
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        body:{type:GraphQLString},

    }
})

module.exports = {
    UserType,
    PostType
}