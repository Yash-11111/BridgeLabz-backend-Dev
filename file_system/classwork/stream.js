// file stream use huge amount of data handle kr skte h and ismein data ko chunks mein baat dete h 
const fs = require("fs");

const  readstream = fs.createReadStream("./quote.txt",{
    encoding:"utf-8",
    highWaterMark:64*1024
});

readstream.on("data",(chunk)=>{
    console.log("chunk mil gya ",chunk.length);
})

readstream.on("end",()=>{
    console.log("file reading complete");
});



// write stream 

const writeStream=fs.createWriteStream("./panchayat.txt");//agr file pehle se present to over-write kr dega orr agr present nhi h toh nayi file ban jayeigi 

writeStream.write("hello bhai kya hall h bsdk padh shi se\n");
writeStream.write("chal chal ab roo  mt \n");

writeStream.end();


// Transform Stream  


const {Transform}=require("stream");

const upperCaseTransform = new Transform({
    transform(chunk,encoding,callback){
        const modified = chunk.toString().toUpperCase();
        this.push(modified);
        callback;
    }
})


//pipe flow 
fs.createReadStream("./panchayat.txt")
.pipe(upperCaseTransform)
.pipe(fs.createWriteStream("./quote.txt"));


// //  file coping using stream
// input.txt to output.txt using pipe and stream 

fs.createReadStream("./panchayat.txt")

.pipe(fs.createWriteStream("./output.txt"));




