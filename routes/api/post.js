const express=require("express");


//creating the express router
//this creates a mini app


const router=express.Router();

//@route    GET api/post
//desc      test route
//access    public

router.get('/',(req,res)=>{
    res.send('post route');
})

module.exports=router;