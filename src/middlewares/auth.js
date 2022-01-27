const jwt = require("jsonwebtoken")

const auth =(req,res,next)=>{
    
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return next()
    try{
        const verified = jwt.verify(token,"secret");
        if(verified) req.verifiedUser = verified.user 
        next()
    }catch(e){
        console.log(e);
        next ()
    }
}

module.exports = {auth};