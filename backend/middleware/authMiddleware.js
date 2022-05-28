const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User =require('../model/userModel');

const verifyAuth = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
     token = req.headers.authorization.split(' ')[1]
    // to verify the token is valid
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    
    req.user = await User.findById(decoded.id).select('-password');

    next();

    }catch(error){
      console.log(error);
      res.status(401)
      throw new Error("Not authorized")
    }
}
if (!token){
    res.status(401)
    throw new Error("Not authorized, no token");
}
})



module.exports = { verifyAuth };