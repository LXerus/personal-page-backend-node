const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images/"),
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new AppError("Not an image! Please upload an image.", 400), false);
  }
};

const uploader = multer({
  storage: storage,
  fileFilter: multerFilter,
});

module.exports = uploader;
