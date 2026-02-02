// js object 
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






const server = require("server");
const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        "content-type" : "application/json",
    });
    res.end(JSON.stringify({
        hgj:"dfvdv", user
    }));
})

server.listen(8000,()=>{
    console.log("server started");
});