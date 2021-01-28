const express = require("express");
const path = require("path");
const sendHighScores = require("./utils");
const HighScore = require("./utils/scoreSchema");
//db not read but connection still loaded
const db = require("./dbConnect");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/api/names", (req, res) => {
  sendHighScores(res);
});

app.post("/api/names", (req, res) => {
  const { score, name } = req.body;
  const newHighScore = new HighScore({
    name,
    score,
  });
  newHighScore.save((err) => {
    if (err) {
      console.log(err);
    } else {
      sendHighScores(res);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
