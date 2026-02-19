const express = require("express");
const app = express();
app.use(express.json());

let students = [
    {id:1,name:"Yash",marks:60,city:"UP",status:"active"},
    {id:2,name:"Akshat",marks:70,city:"UP",status:"active"},
    {id:3,name:"Shubhigya",marks:80,city:"Agra"},
];

//view students 
app.get("/students",(req,res)=>{
    res.json(students);
});

//delete request - remove student by id 
app.delete("/students/:id",(req,res)=>{
    const id = req.params.id;
    const index = students.findIndex((s) => s.id==id);
    
    console.log("index",index);
    if(index == -1){
        return res.status(404).json({message : "Student not found "});
    }
    const student = students[index];
if (student.marks < 70) {
        const deletedStudent = students.splice(index, 1); // index - kis index se delete krna h , 1- no. of elements to be deleted 
        return res.json({
            message: "Student deleted successfully",
            deletedStudent: deletedStudent[0],
        });
}else {
        return res.status(400).json({ message: "Student has marks >= 70, cannot delete" });
    }
});

app.listen(8000,()=>{console.log("server started");})

