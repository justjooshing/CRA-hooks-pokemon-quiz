const { connect, connection } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGO_URI;

connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => console.log("connected!"));

module.exports = db;
