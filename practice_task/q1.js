const fs = require("fs");


const re = fs.readFileSync("./quote.txt","utf-8");


fs.writeFileSync("./q1.txt","hello ji!");




fs.appendFileSync("./q1.txt","./q1_copy.txt");

fs.unlinkSync("./q1_copy.txt");

fs.readdir("./",(err,files)=>{
    if(err){
        console.log("error",err);
    }else{
        console.log("files",files);
    }
})