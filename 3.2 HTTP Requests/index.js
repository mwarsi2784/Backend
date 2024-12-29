import express from 'express';
const port= 3000;
const app = express();

app.listen(port,(req,res)=>{
    console.log("Server is running on port "+port);
});

app.get("/about",(req,res)=>{
    res.send("<h1 style='color: red;'>My name is Zulqarnain</h1>");
});

app.get("/contact",(req,res)=>{
    res.send("<h1 style='color: red;'>033636657501</h1>");
    res.send("<h1 style='color: red;'>gmail.com</h1>");
});