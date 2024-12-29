import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "abcd7501",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;
let color="Green";
let users = [];

async function updateusers(){
  users=[];
  const result=await db.query("Select * from users");
  result.rows.forEach((i)=>{
    users.push(i);
  });
}
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries where user_id= $1",[currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  
  return countries;
}

app.get("/", async (req, res) => {
  await updateusers();
  const countries = await checkVisisted();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  console.log(currentUserId);
  console.log(input);
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    console.log(data);
    const countryCode = data.country_code;
    console.log(countryCode);
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if(req.body.add=="new"){
    res.render("new.ejs");
  }
  else{
  currentUserId=req.body.user;
  const result = await db.query("select color from users where id = $1",[currentUserId]);
  color=result.rows[0].color;
  res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body.name;
  const colour = req.body.color;
  console.log(name);
  console.log(colour);
  db.query("insert into users (name,color) values ($1,$2)",[name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),colour.charAt(0).toUpperCase() + colour.slice(1).toLowerCase()]);
  currentUserId=1;
  color="Green";
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
