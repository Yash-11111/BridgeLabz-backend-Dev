//  auth pattern 
// 1- statefull - which maintains states or data on server side 
// 2- stateless - which has no state


const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const app = express();

// built - in json 

app.use(express.json());



// Connect to MongoDB with a database name
mongoose.connect("mongodb://localhost:27017/authDemo")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("error", err));

// Define schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,   // prevent duplicate emails
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"], // restrict to these roles
    default: "user"
  }
}, { timestamps: true }); // adds createdAt and updatedAt automatically

// Create model
const User = mongoose.model("User", userSchema);

module.exports = User;



// seesion configure


app.use(session({
    secret: "mySceretKey123",
    resave: false, //data yahan se bhej rhe h and not from json
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,// 1 hour
        httpOnly: true,// condition true = http request h 
    },

}),);

//  dummy database

const users = [];

// password validation 

function validatePassword(password) {

    const error = [];
    if (password.length < 8) error.push("Min 8 character required");
    if (!/[A-Z]/.test(password)) error.push("1 upper case required");
    if (!/[a-z]/.test(password)) error.push("1 lower case required");
    if (!/[0-9]/.test(password)) error.push("1 number required");
    if (!/[!@#$%&^*]/.test(password)) error.push("1 symbol required");

    return {
        isValid: error.length === 0,
        error,
    };

};


// check login 


function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({
        msg: "Login required!"
    });
}

//  check role 

function requiredRole(role) {
    return (req, res, next) => {
        const user = users.find((u) => u.id === req.session.userId);
        if (!user || user.role !== role) {
            return res.status(403).json({
                msg: "Access denied"
            });
        }
        next();
    }
}

//  registration page 

app.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                msg: "all fields are required"
            });
        }
        const existUser = users.find((u) => u.email === email);
        if (existUser) {
            return res.status(409).json({
                msg: "user user already exist"
            });
        }

        const validation = validatePassword(password);
        if (!validation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        };
        users.push(newUser);
        res.status(201).json({
            msg: "User registered",
            user: {
                id: newUser.id,
                username,
                email,
                role: newUser.role
            },
        });
    } catch (err) {
        res.status(500).json({
            msg: "error"
        });
    }
})

//  login 
// login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find((u) => u.email === email);

        // Case 1: Email not found
        if (!user) {
            // Check if password also fails (both wrong)
            if (!password || password.trim() === "") {
                return res.status(401).json({ msg: "User does not exist" });
            }
            return res.status(401).json({ msg: "Invalid email" });
        }

        // Case 2: Email exists but password wrong
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        
        req.session.userId = user.id;
        res.json({
            msg: "Login success",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            },
        });
    } catch (err) {
        res.status(500).json({ msg: "error" });
    }
});




//  Profile (protected)

app.get("/profile", isAuthenticated, (req, res) => {
    // const user = users.find((u) => u.id === req.session.userId);
   const allUsers = users.map((u)=>({
    id:u.id,
    username:u.username,
    email:u.email,
    role:u.role

   }));

    res.json({
        msg: "Profile data",
        users:allUsers
    });
});
// my profile 
app.get("/my-profile", isAuthenticated, (req, res) => {
    const user = users.find((u) => u.id === req.session.userId);
    res.json({
        msg: "Your profile data",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
});

//  profile by id 
app.get("/profile/:id", isAuthenticated, (req, res) => {
   const userId = parseInt(req.params.id);

    const user = users.find((u)=>u.id===userId)

    if(!user){
        return res.status(404).json({
            msg:"user not found"
        })
    }
    res.json({
        msg: "Profile data",
        user: {
            id: user.id,
            username: user.username,
            email:user.email,
            role: user.role
            
        }
    });
});

// forgot password

app.get("/forgot-password", isAuthenticated, (req, res) => {
    try {
        const user = users.find((u) => u.id === req.session.userId);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // Just show the email and registered password (hashed)
        res.json({
            msg: "Registered credentials",
            email: user.email,
            password: user.password // note: this is the hashed password
        });

    } catch (err) {
        res.status(500).json({
            msg: "Error"
        });
    }
});




//  admin route 

app.get("/admin",isAuthenticated,requiredRole("admin"),(req,res)=>{
    res.json({
        msg:"Welcome admin"
    });
})

//  logout 
app.post("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.json({
            msg:"Logged out"
        });
    })
})

app.listen(3000,()=>{
    console.log("server started");
});



