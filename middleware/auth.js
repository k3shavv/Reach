const jwt=require('jsonwebtoken');
const config=require('config');


module.exports=function(req,res,next){

    //get token from header
    const token=req.header('x-auth-token');

    //check if token exist 
    if(!token)
    {
        //401 :no authorization
        return res.status(401).json({msg:"no token,authorization denied"});

    }

    try {
        //decoding the token
        const decoded=jwt.verify(token,config.get('jwtSecret'));

        //after decoding we have the passed in payload which is user id in this case
        //setting the req.user to decode.user so that we can use req.user in any protected route
        req.user=decoded.user;

        next();


    } catch (error) {
        res.status(401).json({msg:"token not valid"});

    }



}