import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "absdefg";
const yourPassword = "123456abcdefg";
const yourAPIKey = "c9666daf-ff75-4834-a6d6-4e471443c24a";
const yourBearerToken = "1969231b-6985-48ca-87a6-a22826d9501e";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",  (req, res) => {
  var responseData;
  axios.get(API_URL+"random")
  .then(response => {
    responseData = response.data;
    res.render("index.ejs", {content: JSON.stringify(responseData)});
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    axios.get(API_URL+"all?page=2", { 
      auth: {
        username: yourUsername,
        password: yourPassword,
      } 
    })
    .then(response => {
      var x=JSON.stringify(response.data[0].secret);
      console.log(response.data);
      res.render("index.ejs",{content: x});
    })
    .catch(error => {

    });
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  axios.get(API_URL+ "filter?score=5&apiKey="+yourAPIKey,)
  .then(response => {
    console.log(response.data);
    var x=JSON.stringify(response.data[0]);
    console.log(response.data);
    res.render("index.ejs",{content: x});
  })
  .catch(error => {

  });
});

app.get("/bearerToken", (req, res) => {
  axios.get(API_URL+"secrets/42", { 
    headers: {
      Authorization: `Bearer ${yourBearerToken}` 
    } 
  })
  .then(response => {
    var x=JSON.stringify(response.data.secret);
    console.log(response.data);
    res.render("index.ejs",{content: x});
  })
  .catch(error => {

  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
