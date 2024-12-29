import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"authentication",
  password:"abcd7501"
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const newusername = req.body.username;
  const newuserpassword = req.body.password;
  console.log(newusername);
  console.log(newuserpassword);
  try {
    await db.query("insert into users (email,password) values ($1,$2)",[newusername,newuserpassword]);
    res.render("secrets.ejs");
  } catch (error) {
    res.send("User Already exist");
  }

});

app.post("/login", async (req, res) => {
  const username=req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  try {
    const result = await db.query("select * from users where email=$1",[username]);
    console.log(result.rows);
    if(password == result.rows[0].password){
      res.render("secrets.ejs");
    }else{
      res.send("Incorrect Password");
    }
  } catch (error) {
    res.send("Incorrect Username");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
