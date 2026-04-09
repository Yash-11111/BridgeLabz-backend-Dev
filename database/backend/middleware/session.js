const express = require("express")
const session = require("express-session")

const app = express();
// middleware
app.use(express.json());
// session setup
app.use(session({
    secret:"mySceretKey123",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60*60*1000,// 1 hour
        httpOnly:true,// condition true = http request h 
    },

}),);


//  login (create session )


app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    //  dummy authentication
    if(username==="admin" && password==="123"){
        req.session.user={
            username:username,
            role:"admin"
        };
        return res.json({
            msg:"login sucessfully",
            sessionID: req.sessionID,
        });
    }
res.status(401).json({msg:"Invalid Credentials"});
})


// profile(protected)

app.get("/profile",(req,res)=>{
if(!req.session.user){
    return res.status(401).json({
        msg:"please login first",
    });
}
res.json({
    msg:"User Profile",
    user:req.session.user,
});
})

//  dashboard(protected)


app.get("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({
            msg:"Unauthorized user"
        });
        }
        res.send(`welcome ${req.session.user.username}`);

});


// logout(destroy session)

app.get("/logout",(req,res)=>{

    req.session.destroy((err)=>{
        if(err){
            return res.status(500).send("error logging out");
        }
    })
    res.clearCookie("connect.sid");
    res.send("logged out");

})

//  check session 
app.get("/check-session",(req,res)=>{
    if(req.session.user){
        res.json({
            msg:"session active ",
            user:req.session.user,
        });
    }else{
        res.json({
            msg:"No active Session",
        });
    }
})

app.listen(5000,()=>{console.log("server started");})