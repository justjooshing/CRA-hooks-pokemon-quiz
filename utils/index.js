const HighScore = require("./scoreSchema");

const sendHighScores = (res) =>
  HighScore.find({})
    .sort({ score: -1 })
    .limit(3)
    .exec((err, response) => {
      if (err) {
        console.error(err);
      } else {
        res.send(response);
      }
    });

module.exports = sendHighScores;
