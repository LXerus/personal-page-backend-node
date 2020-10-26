const express = require("express");
const router = express.Router();
const CarouselController = require("./carouselController");
const uploader = require("../../config/uploader");
const response = require("../../network/response");

router.get("/", (req, res) => {
  CarouselController.getCarousel(req.query.id || "")
    .then((data) => {
      response.success(req, res, 200, data);
    })
    .catch((error) => {
      response.error(req, res, 404, error);
    });
});

router.post("/", uploader.array("images", 4), (req, res) => {
  CarouselController.addCarouselPhoto(req.files || [])
    .then(() => {
      response.success(req, res, 204);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.post("/photo/:id", uploader.single("image"), (req, res) => {
  CarouselController.addCarouselPhoto(req.file || null)
    .then(() => {
      response.success(req, res, 204);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.delete("/:id", (req, res) => {
  CarouselController.deleteCarousel(req.params.id || null)
    .then(() => {
      response.success(req, res, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

module.exports = router;
