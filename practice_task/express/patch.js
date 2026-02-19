// patch request 

const express = require("express");
const app = express();
app.use(express.json());
let students = [
    { id: 1, name: "Yash", marks: 60, city: "UP", status: "active" },
    { id: 2, name: "Akshat", marks: 70, city: "UP", status: "active" },
    { id: 3, name: "Shubhigya", marks: 80, city: "Agra", status: "inactive" },
];
// view students
app.get("/students", (req, res) => {
    res.json(students);
});

// patch request (update any one field)
app.patch("/students/:id", (req, res) => { // create a patch api with path parameter(1,2,3,4.......)
    const id = req.params.id; //store value from the path 
    const update = req.body; // json format se data leke aa rha h 
    const student = students.find((s) => s.id == id); // loop through student array and check the value ki json format mein hai yaa nhi warna break 
    if (!student) {
        return res.status(400).json({ message: "student not found" }); // if not present then this message is displayed 
    }
    Object.assign(student, update); // yeh else condition smjh lo mil gya toh assign kr do 
    res.json({ message: "student updated sucessfully", student }); // then this message is displayed

});
app.patch("/students/:id/status", (req, res) => {

    const id = req.params.id;
    const { status } = req.body;

    const student = students.find(s => s.id == id);
    if (!student) {
        return res.status(404).json({ message: "student not found" });
    }
    if (status !== "active" && status !== "inactive") {
        return res.status(400).json({ message: "status must be or inactive" });
    }

    student.status = status;
    res.json({
        message: "student status updated sucessfully",
        student
    });
})

app.listen(8000, () => { console.log("server started"); })
