const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const express = require("express");
const CompareEventUrlService = require("../src/services/CompareEventUrlService");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/api/v1/leviathan", require("./routes/api.leviathan.route"));

app.get("/", (req, res) => {
  return res.json({ message: "server is on!" });
});
console.log(new Date().getMinutes());

schedule.scheduleJob("00 40 * * * *", async () => {
  console.log("Running");
  console.log(new Date().getHours());
  await CompareEventUrlService.execute();
});

module.exports = app;
