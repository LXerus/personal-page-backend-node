const photo = require("../components/photo/photoNetwork");
const skill = require("../components/skill/skillNetwork");
const album = require("../components/album/albumNetwork");
const carousel = require("../components/carousel/carouselNetwork");
const home = require("../Pages/home");

const routers = (server) => {
  server.use("/", home);
  server.use("/photo", photo);
  server.use("/skill", skill);
  server.use("/album", album);
  server.use("/carousel", carousel);
};

module.exports = routers;
