import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db = new pg.Client({
  user:"postgres",
  password:"abcd7501",
  database:"world",
  host:"localhost"
});

db.connect();

async function check(){
  const result = await db.query("select country_code from visited_countries");
  let countries=[];
  result.rows.forEach((i)=>{
    countries.push(i.country_code);
  });
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/add", async(req,res)=>{
  const name = req.body.country;
  const countries = await check();
  try {
    const result = await db.query("select * from countries where country_name like '%' || $1 || '%' ",[name]);
    const code=result.rows[0].country_code;
    try{
      await db.query("insert into visited_countries (country_code) values ($1)",[code]);
      res.redirect("/");
    }
    catch{
      res.render("index.ejs",{countries:countries,total:countries.length,error:"Country already visited"})
    }
  } catch (error) {
    res.render("index.ejs",{countries:countries,total:countries.length,error:"Country does not exist"})
  }
});

app.get("/", async (req, res) => {
  const result = await db.query("select country_code from visited_countries");
  let countries=[];
  result.rows.forEach((i)=>{
    countries.push(i.country_code);
  });
  res.render("index.ejs",{countries:countries,total:countries.length});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
