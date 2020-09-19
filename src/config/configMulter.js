const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images/"),
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const configMulter =  multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return callback(
        "El archivo tiene que ser una de las siguientes extensiones: png, jpg, jpeg"
      );
    }
    callback(null, true);
  },
}).single("image");

module.exports = configMulter;
