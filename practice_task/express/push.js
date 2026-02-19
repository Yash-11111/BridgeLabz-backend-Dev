const express = require('express');

const app = express();

app.use(express.json());

app.get("/attendance", (req,res) => {
    if (req.query.present === "no") {
        return res.send(req.query.name +` is absent`);
    } else if (req.query.present === "yes") {
        return res.send( req.query.name +" is present");
    } else {
        return res.send("attendance");
    }
    
});
const student = [
    {name:"Yash",id:1,branch:"CSE"},
    {name:"Akshat",id:2,branch:"CSE"},
    {name:"Shubh",id:3,branch:"CSE"}
];

app.post("/student/add",async(req,res)=>{
    const data = req.body;
    // student.push({name:data.name, id: data.id, branch: data.branch}); // one by one 
    student.push(data); // for all at once
    res.send(student);
});

app.listen(8000,()=>{console.log("server started on 8000");})