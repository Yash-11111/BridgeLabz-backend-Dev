const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} : \n`;

    console.log(log);
    let responseText="";

    fs.appendFile("require.txt", log,  (err) => {
        if (err) {
            console.error(err);
        }
    });

    switch (req.url) {
        case "/":
            // res.end("homepage");
            responseText="homepage"
            break;

        case "/about":
            // res.end("this is about page");
            responseText="this is about page";
            break;

        case "/contact":
            // res.end("contact page");
            responseText="this is contact"
            break;

        default:
            // res.end("error 404");
            responseText="errror 404";
            break;
    }
});

myServer.listen(3000, () => console.log("server started on port 3000"));
