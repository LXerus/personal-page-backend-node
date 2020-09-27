const { configMulterSingle, configMulterMulti } = require("./configMulter");
const configVars = require("./configVars");
const dataBase = require("../DB/dbConnection");

const config = (server) => {
  dataBase.connect(configVars.dbUri);
  server.use(configMulterSingle);
  server.use(configMulterMulti);
};

module.exports = config;
