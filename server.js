const express = require("express");
let scores = require("./scores.json");
const writeDataToFile = require("./utils");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/names", (req, res) => {
  res.json({ scores });
});

app.post("/api/names", (req, res) => {
  console.log(req.body);
  const { score, name } = req.body;
  if (score && name) {
    scores.push({ name, score });
  }
  //Order them by score highest to lowest
  scores.sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0));
  //keep only highest three
  scores = scores.slice(0, 3);
  writeDataToFile("./scores.json", scores);
  res.status(200).send({ scores });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
