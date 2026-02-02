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