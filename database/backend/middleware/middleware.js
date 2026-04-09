// request check , modify data , error handle, access control, validation , authentication 


// const express = require("express");
// const app = express();

// app.use((req,res,next)=>{
//     console.log("middleware 1");
//     next();

// });

// app.use((req,res,next)=>{
//     console.log("middleware 2");
//     next();
// });

// app.get("/test",(req,res)=>{
//     res.send("route done")
// })

// app.listen(8000,()=>{console.log("server started");})




//  Application level middleware

const express = require("express");
const app = express();


app.use((req, res, next) => {
    console.log("request url", req.url);
    console.log("request Method", req.method);
    next();
})

app.use((req,res,next)=>{
    console.log("request 1",req.url);
    console.log("request Method",req.method);
    next();
})

app.get("/home", (req, res) => {
    res.send("welcome");
})

// app.listen(8000,()=>{console.log("server started");})



// Built in middle ware 
// 1- app.use(express.json());

// 2- app.use(express.urlencoded({extended:true}));
// "true" mein data server se leke aate h and "false" mein key value pair


// Route-Level Middleware 

const checkLogin = (req, res, next) => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return res.send("Please login first");
    }
    next();

}

app.get("/dashboard", checkLogin, (req, res) => {
    res.send("welcome to dashboard")

})

// app.listen(8000, () => { console.log("server started"); })

//Authentication Middleware

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        res.send("token required");
    }
    if(token != "yash"){
        res.send("token invalid");
    }
    next();
}
app.get("/profile",authMiddleware, (req, res) => {
    res.json({message:"profile data"});

});

// app.listen(8000, () => { console.log("server started"); })


// error handling middleware

app.get("/error",(req,res)=>{
    throw new Error("something went wrong");
})

app.use((err,req,res,next)=>{
    console.log("error middleware",err.message);
    res.send("internal server error ");
    next();
})

// app.listen(8000, () => { console.log("server started"); })



//  CORS - multiple url ko single mein convert
// const express = require("express");
// const app = express();
const cors = require("cors");

app.use(cors());

app.get("/data",(req,res)=>{
    res.json({message:"cors working"})
});
// app.listen(8000, () => { console.log("server started"); })
// Custom cors
// frontend only 

app.use(cors({
    origin:"http://localhost:5173",
}))

// app.listen(8000, () => { console.log("server started"); })



//  multiple frontend allowed
const allowedOrigin = [
    "https://localhost:5173",
    "https://localhost:3000",
    
];
app.use(cors({
    origin:allowedOrigin,
}))

app.listen(8000, () => { console.log("server started"); })

