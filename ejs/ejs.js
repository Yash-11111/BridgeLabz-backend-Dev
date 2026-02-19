const express = require("express");

const app = express();
//built in middleware

app.use(express.json());

app.use(express.urlencoded({extended:true}));// convert the data from url into json format


app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(8000,()=>{console.log("server started");})



