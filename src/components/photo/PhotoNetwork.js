const express = require("express");
const PhotoController = require("./PhotoController");
const router = express.Router();

router.post("/", PhotoController.upload.single("image"), (req, res) => {
  PhotoController.addPhoto(req.body.title, req.file)
    .then((data) => {})
    .catch((error) => {});
});
