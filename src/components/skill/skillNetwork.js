const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const skillController = require("./skillController");

router.get("/", (req, res)=>{
    skillController.g
});

module.exports = router;