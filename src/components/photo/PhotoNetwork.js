const express = require("express");
const response = require("../../network/response");
const PhotoController = require("./PhotoController");
const router = express.Router();

router.get("/", (req, res) => {
  const filteredData = req.query.title;
  PhotoController.getPhoto(filteredData)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 404, "Could not find photo");
    });
});

router.post("/", (req, res) => {
  console.log(req.file);
  PhotoController.addPhoto(req.file.filename, req.file)
    .then((photo) => {
      response.success(req, res, "Image upload succesful", 201);
    })
    .catch((error) => {
      response.error(req, res, error, 500, "Could not upload image");
    });
});

module.exports = router;
