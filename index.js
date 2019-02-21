const express = require("express");
const PORT = 3100;
const fs = require("fs");
const url = require("url");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/age", (req, res) => {
  let ageQuery = req.query.age;
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
      return { error: error };
    }
    let data = JSON.parse(bollywoodData);
    if (!ageQuery) {
      res.json(data);
    }
    let matches = {};
    for (let person in data) {
      if (data[person].age === ageQuery) {
        matches[person] = data[person];
      }
    }
    res.json(matches);
  });
});

app.post("/name", (req, res) => {
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
    }
    let oldData = JSON.parse(bollywoodData);
    let newActor = req.body;
    console.log(newActor);
    let newBollywoodData = JSON.stringify({
      ...oldData,
      ...newActor
    });

    fs.writeFile("./bollywood.json", newBollywoodData, error => {
      if (error) {
        console.error(error);
      }
    });
    res.json({ message: "You have added a new actor!" });
  });
});

app.get("/", (req, res) => {});

app.get("/name", (req, res) => {
  let bollywoodName = req.query.name;
  console.log(bollywoodName);
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
      return res.json({ error: error });
    }
    let data = JSON.parse(bollywoodData); // turn it into JS
    if (!bollywoodName) {
      // if no query
      res.json(data);
    }
    let name = data[bollywoodName];
    res.json(name);
  });
});

app.get("/gender/:bollywoodGender", (req, res) => {
  let { bollywoodGender } = req.params;
  console.log("gender", bollywoodGender);
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
      return res.json({ error: error });
    }
    let data = JSON.parse(bollywoodData); // turn it into JS
    if (!bollywoodGender) {
      // if no query
      res.json(data);
    }
    console.log(data);
    let matches = {};
    for (let person in data) {
      console.log(bollywoodGender);
      if (data[person].gender === bollywoodGender) {
        matches[person] = data[person];
      }
    }
    res.json(matches);
  });
});

app.listen(PORT, () => {
  console.log(`I'm listening on port ${PORT}`);
});
