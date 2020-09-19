const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const PhotoController = require("./PhotoController");

router.get("/", (req, res) => {
  PhotoController.getPhoto(req.query.title)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, error, "Could not find photo", 404);
    });
});

router.post("/", (req, res) => {
  PhotoController.addPhoto(req.query.title, req.file)
    .then(() => {
      response.success(req, res, "Photo upload succesful", 201);
    })
    .catch((error) => {
      response.error(req, res, error, "Photo upload failed", 500);
    });
});

router.patch("/", (req, res) => {
  PhotoController.updatePhoto(
    req.query.id,
    req.query.title || "",
    req.file || null
  )
    .then((data) => {
      response.success(req, res, `${data} update succesful`, 201);
    })
    .catch((error) => {
      response.error(req, res, error, "Photo update failed", 500);
    });
});

router.delete("/:id", (req, res) => {
  PhotoController.deletePhoto(req.params.id)
    .then((data) => {
      response.success(req, res, `${data} deleted sucesfully`, 204);
    })
    .catch((error) => {
      response.error(req, res, error, "Photo delete failed", 500);
    });
});

module.exports = router;
