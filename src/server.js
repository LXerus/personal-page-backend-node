const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./network/routes");
const dataBase = require("./DB/dbConnection");
const multerConfig = require("./config/multer_config");

dataBase.connect(
    "mongodb+srv://db_standard_user:ZbOjs7EV4zuNeKfN@cluster0.cttdc.mongodb.net/alexa-portfolio"
);
app.use(multerConfig)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/app", express.static("./public/static"));
router(app);

app.listen(3000, ()=>{
    console.log("app runing http://localhost:3000");
});
