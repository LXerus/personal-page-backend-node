const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const skillController = require("./skillController");
  
router.get("/", (req, res) => {
  skillController
    .getSkill(req.query.title || "")
    .then((data) => {
      response.success(req, res, 200, data);
    })
    .catch((error) => {
      response.error(req, res, error, 404);
    });
});

router.post("/", (req, res) => {
  skillController
    .addSkill(req.query.title || null, req.query.text || null, req.file || null)
    .then((data) => {
      response.success(req, res, 201, data);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.patch("/:id", (req, res) => {
  skillController
    .updateSkill(
      req.params.id || null,
      req.query.title || null,
      req.query.text || null,
      req.file || null
    )
    .then(() => {
      response.success(req, res, 204);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

router.delete("/:id", (req, res) => {
  skillController
    .deleteSkill(req.params.id || null)
    .then((data) => {
      response.success(req, res, 204, data);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

module.exports = router;
