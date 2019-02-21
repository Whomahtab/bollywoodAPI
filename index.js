const bodyParser = require("body-parser");
const PORT = 3100;
const fs = require("fs");
const express = require("express");

const app = express();

//MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ status: "API is working" });
});

app.get("/name", (req, res) => {
  let query = req.query;
  console.log({ query });
  let bollywoodName = req.query.name;
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
    }
    let data = JSON.parse(bollywoodData);
    if (!bollywoodName) {
      res.json(data);
    }
    let name = data[bollywoodName];
    res.json(name);
  });
});

app.get("/gender/:bollywoodGender", (req, res) => {
  let { bollywoodGender } = req.params;
  console.log("gender", bollywoodGender);
  res.json({});
});

app.get("/age", (req, res) => {
  let query = req.query;
  console.log({ query });
  let ageQuery = req.query.age;
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
    }
    let data = JSON.parse(bollywoodData);
    if (!ageQuery) {
      res.json(data);
    }
    let age = data[ageQuery];
    res.json({ age: age });
  });
});

app.listen(PORT, () => {
  console.log(`I'm listening on port ${PORT}`);
});
