const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const express = require("express");
const cors = require('cors');

const CompareEventUrlService = require("../src/services/CompareEventUrlService");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.use("/api/v1/leviathan", require("./routes/api.leviathan.route"));

app.get("/", (req, res) => {
  return res.json({ message: "server is on!" });
});
console.log(new Date().getMinutes());

(async () => await CompareEventUrlService.execute())();

schedule.scheduleJob("00 00 00 * * *", async () => {
  console.log("Running");
  console.log(new Date().getHours());
  await CompareEventUrlService.execute();
});

module.exports = app;
