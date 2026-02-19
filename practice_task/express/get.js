const express = require("express");

const app = express();

app.use(express.json());
let users = [];

app.post('/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(200).send({ message: 'All fields are required!' });
    }
    const uC = /[A-Z]/;
    const lC = /[a-z]/;
    const digit = /[0-9]/;
    
    if (!uC.test(password) || !lC.test(password) || !digit.test(password) ) {
        return res.status(400).send({
            message: 'password format is not corrected'
        });
    }

    const existUser = users.find(user => user.email === email);
    if (existUser) {
        return res.status(400).send({ message: 'User already registered!' });
    }
    const newUser = { username, email, password };
    users.push(newUser);

    res.status(200).send({ message: 'Registration successful!', user: newUser });
});

app.listen(8000, () => {
    console.log(`Server running on 8000`);
});

// const credentials=[
//     {
//         email:"yashkesarwani@gmail.com",password:"12345"
//     },
//     {
//         email:"papahoonpapa@gmail.com",password:"papahoon"
//     },

// ];

// app.post("/auth/register",async (req,res)=>{
//     const data = req.body;

//     credentials.push(data);

//     res.send("resgistered")
// } );

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        (user) => user.email == email && user.password == password
    );
    console.log(user); {
        if (user) {
            res.send({ message: "Login succesfully", user });

        } else {
            res.send({ message: "invalid user" });
        }
    }
})






