const PhotoStorage = require("./PhotoStorage");
const multer = require("multer");
const path = require("path");
const host = "localhost";
const port = 3000;

function getPhoto(photoName) {
  return new Promise((resolve, reject) => {
    if(photoName){
      resolve(PhotoStorage.getPhoto(photoName));
    }else{
      reject("Invalid data");
    }
    
  });
}

function addPhoto(filename, image) {
  return new Promise((resolve, reject) => {
    if (!filename || !image) {
      reject("Invalid file data, title or file missing");
    }

    const url = `http://${host}:${port}/${path.join(
      __dirname,
      "public/images/"
    )}/${image.originalname}`;
    const title = filename.substr(0, filename.lastIndexOf(".")) || filename;
    const newPhoto = { title: title, url: url };
    PhotoStorage.addPhoto(newPhoto);
    resolve(newPhoto);
  });
}

module.exports = {
  addPhoto,
  getPhoto
};
