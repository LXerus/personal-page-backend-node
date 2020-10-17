const express = require("express");
const router = express.Router();
const response = require("../network/response");


router.get("/", (req, res)=>{
    response.success(req, res, 200, "Welcome to Image Upload API");
});

module.exports = router;