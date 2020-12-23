let mongoose=require("mongoose");
let config=require("config");


const db=config.get('mongoURI');


//function for connecting to database
const connectDB=async()=>{
try {
        await mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true});
        console.log('mongoDB connected');

} catch (error) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);    
}


}

//exporting so that we can use this in other files
module.exports=connectDB;