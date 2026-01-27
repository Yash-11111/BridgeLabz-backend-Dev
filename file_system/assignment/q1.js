 const fs = require("fs");


// // const re = fs.readFileSync("./quote.txt","utf-8");


// // fs.writeFileSync("./q1.txt","hello ji!");




// // fs.appendFileSync("./q1.txt","./q1_copy.txt");

// // fs.unlinkSync("./q1_copy.txt");

// // fs.readdir("./",(err,files)=>{
// //     if(err){
// //         console.log("error",err);
// //     }else{
// //         console.log("files",files);
// //     }
// // })


fs.writeFileSync("./answer.txt","Questions & Answers!\n \n ");

fs.appendFileSync("./answer.txt"," A1 - Synchronous file operations block the execution of the program until the task is completed. This means that while a file is being read or written, no other code can run, which can slow down applications, especially servers. For example, readFileSync stops the program until the file is fully read. In contrast, asynchronous file operations run in the background and do not block the event loop. They allow other parts of the program to continue executing while the file operation is in progress. Most real-world Node.js applications prefer asynchronous methods like readFile or fs.promises.readFile because they improve performance and responsiveness.\n");


fs.appendFileSync("./answer.txt","A2 - File streams should be used when working with large files or when memory efficiency is important. Reading an entire file at once loads all its contents into RAM, which can slow down the system or even cause crashes if the file is very large. Streams, on the other hand, read data in small chunks and process it gradually. This makes them suitable for handling videos, logs, backups, and other large files. They are also useful when data needs to be processed in real time, such as sending files over a network.\n");


fs.appendFileSync("./answer.txt","A3 - The utf8 encoding parameter tells Node.js to interpret the file data as readable text instead of raw binary data. By default, file operations return data in the form of buffers, which appear as sequences of bytes. When utf8 is specified, Node.js automatically converts these bytes into human-readable characters. This is important when working with text files, such as JSON, HTML, or configuration files, because it allows the content to be read and manipulated easily.\n");


fs.appendFileSync("./answer.txt","A4 - File system operations can fail for many reasons, and Node.js reports these failures using error codes. For example, ENOENT means that the requested file or directory does not exist, while EACCES indicates that the program does not have permission to access the file. EEXIST occurs when trying to create a file that already exists, and EMFILE means that too many files are open at the same time. Understanding these error codes helps developers diagnose problems quickly and handle them properly in their applications.\n");

fs.appendFileSync("./answer.txt","A5 - To safely delete a directory along with all its files and subdirectories, Node.js provides the fs.rm method with the recursive option enabled. This allows the entire directory tree to be removed in one operation. The force option can be used to prevent errors if some files are missing. This method is safer and more reliable than manually deleting each file. However, it must be used carefully because once a directory is removed this way, the data cannot be recovered. \n");


fs.appendFileSync("./answer.txt","A6 -  Piping in streams means connecting the output of one stream directly to the input of another. This allows data to flow automatically from one process to the next without being stored in memory. For example, when copying a file, a read stream can be piped into a write stream so that data moves from the source file to the destination file in small chunks. Piping is commonly used for tasks like file copying, compression, and network transmission because it improves performance and reduces memory usage.\n");

fs.appendFileSync("./answer.txt","A7 -Handling errors in file operations is important because file systems are unpredictable. Files may be missing, permissions may be restricted, disks may be full, or hardware problems may occur. If these errors are not handled properly, the program may crash or behave incorrectly. By checking and responding to errors, developers can prevent data loss, display useful messages to users, and keep applications stable and reliable.\n ");

fs.appendFileSync("./answer.txt","A8 - The writeFile method creates a new file or replaces the contents of an existing file with new data. If the file already exists, its previous content is completely erased. In contrast, the appendFile method adds new data to the end of an existing file without removing the old content. If the file does not exist, appendFile creates it. Therefore, writeFile is used when overwriting data is required, while appendFile is used when new information needs to be added without losing previous data.\n");