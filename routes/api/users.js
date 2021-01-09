const express=require("express");

//including express-validator(for validation of forms data)
const {check,validationResult}=require('express-validator');

//bringing the user model
const User=require('../../models/User');

//bringing some additional dependencies
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');


//creating the express router
//this creates a mini app
const router=express.Router();

//@route    POST api/user
//desc      Register user
//access    public

const userRegvalidationRules=[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','please enter a password with six or more character').isLength({min:6}),   
]

router.post('/',userValidationRules,async (req,res)=>{

    let errors=validationResult(req);
    if(!error.isEmpty())
    {
       //400:Bad req 
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password}=req.body;

    try {
        /*checking if useralready exist */
        let user=await User.findOne({email:email});
        if(user)
        {
            return res.status(400).json({errors:"user already exist"});
        }

        /*if user does not exist 
            proceed*/

        //get user gravatar
        const avatar=gravatar.url(email,{s:'200',r:'pg',d:'mm'});

        //create a new user collection(this does not save it to database)
        user=new User({name,email,password,avatar});
        
        //encrypt password
        const salt=await bcrypt.genSalt(10);
        console.log(salt);
        user.password=await bcrypt.hash(password,salt);

        //saving to database
        await user.save();


        //login the user(we want the user to get logined when registered)
        //passing the user id as payload
        const payload={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{

            if(err)throw err;
            else{
                res.json({token});
            }
        })


    } catch (error) {
       
        console.error(error.message);
        res.status(500).json("server error");
    }




})

module.exports=router;