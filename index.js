const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const { connectDB } = require("./src/db");
require('dotenv').config()
const schema = require("./src/graphql/schema")
require("./src/db").connectDB();
const app = express();
const {auth,print } = require("./src/middlewares/auth");

app.set("port", process.env.PORT || 3000)

app.use(auth)
//app.use(print)

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql : true,
  
}))

app.use((req, res, next) =>{
    if( res.status(404)) {
      
        res.redirect('/graphql');
        return;
    }
  });

app.listen(app.get("port"), ()=>{
    console.log("Listening on port " + app.get("port"));
})

