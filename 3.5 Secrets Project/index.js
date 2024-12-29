import express from "express";
import { dirname } from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.post("/check",(req,res)=>{
    if(req.body["password"]==12345){
        res.sendFile(__dirname + "\\public\\secret.html");
    }
    else{
        res.sendFile(__dirname + "\\public\\index.html");
    }
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "\\public\\index.html");
});

app.listen(port,(req,res)=>{
    console.log("Server is running on port "+port);
});