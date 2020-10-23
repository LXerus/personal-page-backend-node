const { configMulterSingle, configMulterMulti } = require("./uploader");
const configVars = require("./configVars");
const dataBase = require("../DB/dbConnection");

const config = (server) => {
  dataBase.connect(configVars.dbUri);
};

module.exports = config;
