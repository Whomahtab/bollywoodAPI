const express = require("express");
const PORT = 3100;
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const showdown = require("showdown");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/age", (req, res) => {
  let ageQuery = req.query.age;
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
      return { error: error };
    }
    let data = JSON.parse(bollywoodData);
    if (!ageQuery) {
      return res.json(data);
    }
    let matches = {};
    for (let person in data) {
      if (data[person].age === ageQuery) {
        matches[person] = data[person];
      }
    }
    return res.json(matches);
  });
});

app.post("/name", (req, res) => {
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
    }
    let oldData = JSON.parse(bollywoodData);
    let newActor = req.body;
    let newBollywoodData = JSON.stringify({
      ...oldData,
      ...newActor
    });

    fs.writeFile("./bollywood.json", newBollywoodData, error => {
      if (error) {
        return console.error(error);
      }
    });
    return res.json({ message: "You have added a new actor!" });
  });
});

app.get("/", (req, res) => {
  (converter = new showdown.Converter()),
    fs.readFile("./README.md", "utf8", (error, readMe) => {
      if (error) {
        console.error(error);
        return res.json({ error: error });
      }
      html = converter.makeHtml(readMe);
      return res.send(html);
    });
});
app.get("/name", (req, res) => {
  let bollywoodName = req.query.name;
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
    return res.json(name);
  });
});

app.get("/gender/:bollywoodGender", (req, res) => {
  let { bollywoodGender } = req.params;
  fs.readFile("./bollywood.json", "utf8", (error, bollywoodData) => {
    if (error) {
      console.error(error);
      return res.json({ error: error });
    }
    let data = JSON.parse(bollywoodData); // turn it into JS
    if (!bollywoodGender) {
      // if no query
      return res.json(data);
    }
    let matches = {};
    for (let person in data) {
      if (data[person].gender === bollywoodGender) {
        matches[person] = data[person];
      }
    }
    return res.json(matches);
  });
});

app.listen(PORT, () => {
  console.log(`I'm listening on port ${PORT}`);
});
