// const url = require("url");
// const http = require("http");
// const fs = require("fs");

// const myServer = http.createServer((req, res) => {
//     if (req.url === "./favicon.ico") return res.end();
//     // console.log(myUrl);
//     const log = `${Date.now()} : ${req.method} ${req.url} "New request received\n"`
//     const myUrl = url.parse(req.url, true);
//     fs.appendFile("log.txt", log, (err, log) => {
//         switch (myUrl.pathname) {
//             case "/":
//                 if (req.method === "GET") res.end("this is home page");
//                 break;
//             case "/about":
//                 const aa = res.end("this is about page");
//                 const username = myUrl.query.myname;
//                 res.end(`Hi ${username}`)
//                 break;
//             case "/contact":
//                 if (req.method === "GET") res.end("this is contact page");
//                 break;
//             case "/signup":
//                 if (req.method === "GET") res.end("THis is sign up page ");
//                 else if (req.method === "POST") {
//                     res.end("sucess")
//                 }
//                 break;
//             case "./student":
//                 if (req.method === "PUT") res.end("this is student page ");
//                 else if (req.method === "PATCH") {
//                     res.end("this is student page");


//                 }
//                 else if (req.method === "DELETE") {
//                     res.end("this is student page");


//                 } else {
//                     res.end("this is student page ");

//                 }
//                 break;
//             default:
//                 res.end("404");

//         }
//     })

// })

// myServer.listen(8000, () => console.log("server started at port 8000"));


//express started


const express = require("express");
const app=express();

app.get("/",(req,res)=>{
    return res.send("home page");
});
app.get("/about",(req,res)=>{
    // const name = req.query.name;
    // const age = req.query.age;

 return res.send("Hey " + req.query.name +"Age " + req.query.age );
});

app.listen(3000,()=>{console.log("server started")});

