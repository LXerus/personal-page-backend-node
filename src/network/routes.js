const express = require("express");
const home = require("../public/pages/home/network");
const photo = require("../components/photo/PhotoNetwork");
const skill = require("../components/skill/skillNetwork")

const routers = (server) => {
    server.use("/", home);
    server.use("/photo", photo);
    server.use("/skill", skill);
}

module.exports = routers;