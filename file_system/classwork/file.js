const fs = require("fs");
//create file with sync function

// fs.writeFileSync("./example.txt","hello world");

// fs.writeFile("./file.txt","Yash",(err)=>{});//async


// const result = fs.readFileSync("./quote.txt","utf-8") // read with sync

//console.log(result);


// for async 
// fs.readFile("./quote.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("error",err);
//     }else{
//         console.log(result);
//     }
// });

// asyen ke cases mein ek callback function ke through err message dena pdta h sync mein aese hi aa jaata h 



//  fs.appendFileSync("./quote.txt",new Date().getDate().toLocaleString());

// fs.appendFileSync("./quote.txt",`${Date.now()} Good Afternoon!\n`)

// copy file 

// fs.copyFileSync("./quote.txt","./quote_copy.txt");

// delete files

// fs.unlinkSync("./quote_copy.txt");

// console.log(fs.statSync("./quote.txt")); // file ka pura stats

// console.log(fs.statSync("./quote.txt").isFile());


//create folder

// fs.mkdirSync("./Baatein/a/b",{recursive:true});


//remove folder

// fs.rmdirSync("./Baatein");


// read all the files made


// fs.readdir("./",(err,files)=>{
//     if(err){
//         console.log("error",err);
//     }else{
//         console.log("files",files);
//     }
// });




// error handling 

// ENONET = File not exist
// Eacess = permission denied
// Eexist = file already exists
// Eisdir = file expected , folder not exist


//  error handling with callback 

// fs.readFile("./examdggple","utf-8",(err,data)=>{
//     if(err){
//         if(err.code === "ENONET"){
//             console.log("file not found");
//         }
//         return ;
//     }
//     console.log(data);
// });


// error handling with async/await


// const fsPromises = require("fs").promises;

// async function readFileSafe(){
//     try{
//         const data = await fsPromises.readFile("./quote.txt","utf-8");
//         console.log(data);
//     }catch(err){
//         console.log("error",err.code);
//     }
// }


// Stream error handling 


// const readStream = fs.createReadStream("./quote.txt",); // source 

// const writeStream = fs.createWriteStream("./panchayat.txt"); // destination 


// readStream.on("error",(err)=>{
//     console.log("read err",err.message);

//     writeStream.destroy();
// });


// writeStream.on("error",(err)=>{
//     console.log("write err",err.message);

//     readStream.destroy();
// });

