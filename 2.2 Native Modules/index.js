const fs = require("fs");

fs.readFile("message.txt","UTF-8",(err,data)=>{
    if(err){
        throw err;
    }
    console.log(data);
});