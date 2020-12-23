let express=require("express");
let connectDB=require('./config/db');


//creating app
let app=express();


//setting up test route
app.get('/',(req,res)=>{
    res.send('api is running');
})

//connecting to db
connectDB();

//defining routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/post',require('./routes/api/post'));

const PORT=process.env.PORT || 6000;
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})


