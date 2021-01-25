const express = require("express");
const path = require("path");

let easyHighScores = require("./easyHighScores.json");
const { writeDataToFile } = require("./utils");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/api/names", (req, res) => {
  res.json({ scores: easyHighScores });
});

app.post("/api/names", (req, res) => {
  const { score, name } = req.body;
  if (score && name) {
    easyHighScores.push({ name, score });
  }
  //Order them by score highest to lowest
  easyHighScores.sort((a, b) =>
    a.score < b.score ? 1 : b.score < a.score ? -1 : 0
  );
  //keep only highest three
  easyHighScores = easyHighScores.slice(0, 3);
  writeDataToFile("./easyHighScores.json", easyHighScores);
  res.status(200).send({ easyHighScores });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
