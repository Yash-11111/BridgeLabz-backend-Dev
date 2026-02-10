// const express = require("express");
// const app = express();
// app.use(express.json());

// let credentials=[
//     { email:"yash@gmail.com" , password:"123"},
//     { email:"shubh@gmail.com",password:"456"}
    
// ];

// app.get("/auth/users",(req,res)=>{
//     res.json({message:"user fetch sucessfully",credentials});
// });

// // reset password

// app.put("/auth/reset" ,(req,res)=> {
// const {email,password,newPassword} = req.body;
// // find user 
// const user = credentials.find(
//     (cred)=>cred.email == email && cred.password==password,
// );
// if(!user){
//     return res.status(400).json({message:"Invalid email or password"})
// }
// //update password
// user.password = newPassword;
// resp.json({message:"password updated sucessful" ,user});

// });


// // forget password 

// app.put("/auth/forget",(req,res)=>{
// const{email,password}=req.body;
// const user = credentials.find(
//     (cred)=>cred.email == email && cred.password==password,
// );
// if(!user){
//     return res.status(400).json({message:"Invalid email or password"})
// }
// });


// app.listen(3000,()=>{console.log("server started");});



// reset email 
const express = require("express");
const app = express();
app.use(express.json());

let credentials=[
    { email:"yash@gmail.com" , password:"123"},
    { email:"shubh@gmail.com",password:"456"}
    
];

app.get("/auth/users",(req,res)=>{
    res.json({message:"user fetch sucessfully",credentials});
});

// reset email

app.put("/auth/reset" ,(req,res)=> {
const {email,password, newEmail} = req.body;
// find user 
const user = credentials.find(
    (cred)=>cred.email == email && cred.password==password,
);
if(!user){
    return res.status(400).json({message:"Invalid email or password"})
}
//update email
user.email = newEmail;
res.json({message:"email updated succesfully" ,user});

});

//  forget password

// app.put("/auth/forget",(req,res)=>{
// const{email,password}=req.body;
// const user = credentials.find(
//     (cred)=>cred.email == email && cred.password==password,
// );
// if(!user){
//     return res.status(400).json({message:"Invalid email or password"})
// }
// });

app.listen(3000,()=>{console.log("server started");});