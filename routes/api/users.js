const express=require("express");


//creating the express router
//this creates a mini app


const router=express.Router();

//@route    GET api/user
//desc      test route
//access    public

router.get('/',(req,res)=>{
    res.send('user route');
})

module.exports=router;