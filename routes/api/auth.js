const express=require("express");
const auth=require('../../middleware/auth.js');
const user=require('../../models/User');

const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const {check,validationResult}=require('express-validator');


//creating the express router
//this creates a mini app
const router=express.Router();

//@route    GET api/auth
//desc      test route
//access    private

router.get('/',auth,async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (error) {
        res.status(500).json('server error');        
    }

})

//@route    POST api/auth
//desc      authenticate user and get token
//access    public

const userRegvalidationRules=[
    check('email','Please include a valid email').isEmail(),
    check('password','password is required').exists()
    ];
    

router.post('/',userRegvalidationRules,async(req,res)=>{
    console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        //400:bad request
        return res.status(400).json({errors:errors.array()});
    }
    
    const {email,password}=req.body;

    try {
        // see if user does not exist
        let user=await User.findOne({email:email});
        
        //if user does not exist
        if(!user)
        {
            //process will end here with error
          return  res.status(400).json({errors:"Invalid credentials"});
        }

        //checking the password
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            //process will end here with error
          return  res.status(400).json({errors:"Invalid credentials"});
        }

        //return the payload
        const payload={
            user:{
                id:user.id
            }

        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{

            if(err)throw err;
            res.json({token});   

        });
         
        
    } catch (error) {
        
        console.error(error.message);
        //500:server error
        res.status(500).send('server error');
    }

});



module.exports=router;