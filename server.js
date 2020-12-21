let express=require("express");


//creating app
let app=express();


//setting up test route
app.get('/',(req,res)=>{
    res.send('api is running');
})

const PORT=process.env.PORT || 6000;
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})


