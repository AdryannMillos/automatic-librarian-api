const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const express = require("express");
const cors = require('cors');

const CompareEventUrlService = require("../src/services/CompareEventUrlService");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

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
