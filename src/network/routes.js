const express = require("express");
const home = require("../public/pages/home/network");
const photo = require("../components/photo/PhotoNetwork");

const routers = (server) => {
    server.use("/", home);
    server.use("/photo", photo);
}

module.exports = routers;