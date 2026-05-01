const express = require("express")
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        req.session.user = {
            username: username,
            role: "admin"
        };
        return res.status(200).json({
            msg: "Login Successful",
            sessionID: req.sessionID,

        })

    }
    res.status(400).json({
        msg: "Invalid Credientials"
    })
})

function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send(" Please login first");
  }
}


app.get("/dashboard",auth, (req, res) => {
res.status(201).send(`Welcome admin`)
    

});

app.get("/logout", (req, res) => {
req.session.destroy(err =>{
if(err){
    res.send("error");
}
res.clearCookie("connect.sid");
res.send("loggoud out sucessfully");
});

});


app.listen(3000, (req, res) => {
    console.log("server started");
});




