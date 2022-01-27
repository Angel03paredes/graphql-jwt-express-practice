const jwt = require("jsonwebtoken")

const createJWT = (user)=>{
    const token = jwt.sign({user},"secret",{expiresIn:"1h",});
    return token;
}

module.exports = {
    createJWT
}