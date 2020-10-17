const photo = require("../components/photo/PhotoNetwork");
const skill = require("../components/skill/skillNetwork");
const album = require("../components/album/albumNetwork");
const home = require("../Pages/home");

const routers = (server) => {
    server.use("/", home);
    server.use("/photo", photo);
    server.use("/skill", skill);
    server.use("/album", album);
}

module.exports = routers;