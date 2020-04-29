const express = require("express");
const app = express();
const cron = require("node-cron");
const kernel = require("./app/middlewares/midlewares");
app.use(kernel);
app.listen(3001, () => console.log("server worked at 3001"));