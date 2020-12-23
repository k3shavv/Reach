const express=require("express");


//creating the express router
//this creates a mini app


const router=express.Router();

//@route    GET api/profile
//desc      test route
//access    public

router.get('/',(req,res)=>{
    res.send('profile route');
})

module.exports=router;