const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./network/routes");
const config = require("./config/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/app", express.static("./public/static"));
config(app);
router(app);

app.listen(3000, () => {
  console.log(`app runing ${process.env.HOST}:${process.env.PORT}`);
});
