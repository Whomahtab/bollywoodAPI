const express = require("express");
const PORT = 3100;
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {});

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
  res.json({
});

app.listen(PORT, () => {
  console.log(`I'm listening on port ${PORT}`);
});
