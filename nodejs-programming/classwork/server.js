
const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/plain") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, this is plain text!");
    } 
    else if (req.url === "/home") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Home Page</h1>");
    } 
    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About Page</h1>");
    } 
    else if (req.url === "/json") {
        let user = {
            username: "dfvdfv",
            email: "dcshb@gmail.com"
        };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "success", user }));
    } 
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});

//js object 

let user ={
    username : "dfvdfv",
    email : "dcshb@gmail.com"
    // ismein key value pair hote h 
    
}

 let json ={
     "username":"fvdfv"// ismein dono taraf coated hote h 
 }


 JSON.stringify(user); // js object -> json string
 JSON.parse();// json object -> data

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{
//         "content-type" : "application/json",
//     });
//     res.end(JSON.stringify({
//         hgj:"dfvdv", user
//     }));
// })

// server.listen(8000,()=>{
//     console.log("server started");
// });