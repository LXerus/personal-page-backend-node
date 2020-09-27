const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const photoController = require("./photoController");

router.get("/", (req, res) => {
  photoController
    .getPhoto(req.query.title || "")
    .then((data) => {
      response.success(req, res, 200, data);
    })
    .catch((error) => {
      response.error(req, res, error, 404);
    });
});

router.post("/", (req, res) => {
  photoController
    .addPhoto(req.query.title || null, req.file || null)
    .then(() => {
      response.success(req, res, 201);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.patch("/:id", (req, res) => {
  photoController
    .updatePhoto(req.params.id || null, req.query.title || "", req.file || null)
    .then(() => {
      
      response.success(req, res, 204);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.delete("/:id", (req, res) => {
  photoController
    .deletePhoto(req.params.id || null)
    .then(() => {
      response.success(req, res, 204);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

module.exports = router;
