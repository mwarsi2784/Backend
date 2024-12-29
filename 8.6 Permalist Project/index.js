import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    user:"postgres",
    password:"abcd7501",
    host:"localhost",
    database:"permalist"
});
db.connect();
let items = [
];

async function updatetodo(){
  const result  = await db.query("select * from todo");
  items=[];
  result.rows.forEach((i)=>{
    items.push(i);
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", async (req, res) => {
  await updatetodo();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("insert into todo (title) values ($1)",[item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const title = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  await db.query("update todo set title=$1 where id=$2",[title,id]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const did = req.body.deleteItemId;
  await db.query("delete from todo where id=$1",[did]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
