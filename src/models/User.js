const {Schema, model} = require("mongoose")

const User = new Schema ( { 
    userName : {
        required : true,
        type: String
    },
    password : {
        type:String,
        required:true
    },
    email:{
        required:true,
        unique:true,
        type:String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Provide a valid email",
        ]
    },
    displayName:{
        type:String,
        required:true,
    }
}, {
    timestamps:true,
    versionKey:false,
    
})

module.exports = model("User",User)