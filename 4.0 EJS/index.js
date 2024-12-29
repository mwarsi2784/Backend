import express from "express";
 
const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    var m1="weekday";
    var m2="work hard"
    const d = new Date("July 6, 2024 01:15:00");
    let day = d.getDay();
    if(day==0 || day==6){
        m1="weekend";
        m2="have fun";
    }
    res.render("index.ejs",{
        name: m1,
        name2: m2
    });
});

app.listen(port,()=>{
    console.log("Server is running on port "+port);
});
