const photo = require("../components/photo/PhotoNetwork");
const skill = require("../components/skill/skillNetwork")

const routers = (server) => {
    server.use("/photo", photo);
    server.use("/skill", skill);
}

module.exports = routers;