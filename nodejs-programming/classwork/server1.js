const http =require("http")
const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        "content-type":"plain/text"
    });
     res.end("hello");
});
