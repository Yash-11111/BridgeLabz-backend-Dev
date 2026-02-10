// run project without live server
const express = require("express");

const app = express();

// serve files from "public" directory

// Absoltue path:c\user\desktop\filename
// relative path : ./public


app.use(express.static("public"));
app.listen(8000,()=>{console.log("server started");})