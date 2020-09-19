const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./network/routes");
const dataBase = require("./DB/dbConnection");
const configMulter = require("./config/configMulter");
const configVars = require("./config/configVars");

dataBase.connect(configVars.dbUri);
app.use(configMulter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/app", express.static("./public/static"));
router(app);

app.listen(3000, ()=>{
    console.log("app runing http://localhost:3000");
});
