// custom middleware 
// 1- Logger Middleware - in which type of request is incoming 
// syntax: console.log(req.method,req.url);
// real use-  debugging,monitoring


// 2- validation middleware - checks data correct or not

//  syntaxt: if(!req.body.name) return res.send("Error");
// real use : form validation, api data check

// 3- Route- specific middoeware: request allow / block 
//  syntax:if(user!==admin) return res.send("Not Allowed");

//  flow : logger -> validation -> route- specific -> route

// LVR Rule : logger validation route


const express = require("express")
const bcrypt = require("bcrypt"); 
const mongoose = require("mongoose")
const app = express();
// built-in middleware 
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/")
.then(()=>console.log("MongoDB connected "))
.catch((err)=> console.log("error",err))


// logger middleware
const logger = (req,res,next)=>{
    console.log("Method",req.method);
    console.log("Url",req.url);
    next();
}

// apply   globally

app.use(logger);

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})
const user = mongoose.model("User",userSchema);
//  validation middleware

const validate = (req,res,next)=>{
    const {name  }= req.body;
    if(!name){
        return res.status(400).json({
            meg:"NAme is req"
        });
    }
    next();
}


// route - specific Middleware

const checkAdmin = (req,res,next)=>{
    // dummy check
    const isAdmin = true;
    if(!isAdmin){
        return res.status(403).json({
            msg:"access denied"
        });
    }
    next();
}

// route 
// home route
app.get("/",(req,res)=>{
    res.send("Welcome to home page");
});
// validation route
app.post("/user",validate, async (req,res)=>{
    try{
        const newUser= new user(req.body);
        const savedUser= await newUser.save();
    
    
    res.json({
        msg:"User created succesfully",
        data:req.body,
    });
}catch(error){
    res.status(500).json({message:"error saving user",error})

}

});

//  route specific 

app.get("/admin",checkAdmin,(req,res)=>{

    res.send("Hi! admin")
    
});





app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const hashedPassword = await bcrypt.hash(password, 10);

       

        res.status(201).send({
            message: "User registered successfully",
            username,
            hashedPassword
        });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
});
app.listen(8000,(req,res)=>{console.log("server started");})




// mongoose middleqware - in these types of operation (save , find , update, delete) can perform the db operation to be run 
// type :1  pre middleware : before saving operation Ex: password : hash value mein rkhta h  
// type : 2 post middleware : after saving operation : Ex : Hash value save then print O/p

//  flow: request  -> save -> pre middleware -> db -> post middleware -> response 
// Bcrypt : yeh string ya integer ko as store nhi rkhta only hash values use krta h 

//  syntax 
// const bcrypt = require("bcryptjs")

// const password = "12345";
// const hashedPassword = await bcrypt.hash(password,10);
// console.log(hashedPassword);


// // login purana wla se compare 

// const isMath = await bcrypt.compare("12345",hashedPassword);
// console.log(isMath);
