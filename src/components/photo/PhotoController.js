const PhotoStorage = require("./PhotoStorage");
const multer = require("multer");
const path = require("path");
const host = "localhost";
const port = 3000;

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|jpng)$/)) {
      return callback(
        "El archivo tiene que ser una de las siguientes extensiones: png, jpg, jpeg, jpng"
      );
    }
    callback(null, true);
  },
});

function addPhoto(title, image) {
  return new Promise((resolve, reject) => {
    if (!title || !image) {
      reject("Invalid file data, image or tittle missing");
    }

    const newPhoto = {
      title: title,
      path: `http:${host}/${port}/${storage.destination}/${image.originalname}`,
    };

    PhotoStorage.addPhoto(newPhoto);
    resolve(newPhoto);
  });
}

function getPhoto(photoName) {
    
}
module.exports = {
  storage,
  upload,
  addPhoto,
  getPhoto,
};
