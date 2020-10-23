const express = require("express");
const router = express.Router();
const albumController = require("./albumController");
const response = require("../../network/response");
const uploader = require("../../config/uploader");

router.get("/", (req, res) => {
  albumController
    .getAlbums(req.query.title || "")
    .then((data) => {
      response.success(req, res, 200, data);
    })
    .catch((error) => {
      response.error(res, res, error, 404);
    });
});

router.post("/", uploader.array("images", 20), (req, res) => {
  albumController
    .addAlbum(
      req.query.title || null,
      req.query.description || "",
      req.files || []
    )
    .then((data) => {
      response.success(req, res, 201, data);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.patch("/:id", (req, res) => {
  albumController
    .updateAlbum(
      req.params.id || null,
      req.query.title || null,
      req.query.description || ""
    )
    .then(() => {
      response.success(req, res, 204);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.delete("/:id", (req, res) => {
  albumController
    .deleteAlbum(req.params.id || null)
    .then(() => {
      response.success(req, res, 204);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

module.exports = router;
