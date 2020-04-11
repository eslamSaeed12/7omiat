const express = require("express");
const app = express();
const kernel = require("./app/middlewares/midlewares");
app.use(kernel);
app.listen(3000, () => console.log("server worked at 3000"));
