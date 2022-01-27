require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/graphqldb")
        console.log("MongoDB connected");
    }catch(e){
        console.log("Error",e);
    }
}

module.exports = {connectDB}