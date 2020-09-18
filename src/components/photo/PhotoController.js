const PhotoStorage = require("./PhotoStorage");
const multer = require("multer");
const path = require("path");
const host = "localhost";
const port = 3000;

function getPhoto(photoName) {
  return new Promise((resolve, reject) => {
    if (photoName !== null || photoName !== undefined) {
      resolve(PhotoStorage.getPhoto(photoName));
    }
    reject("Invalid data");
  });
}

function addPhoto(title, photo) {
  return new Promise((resolve, reject) => {
    if (!title || !photo) {
      reject("Invalid file data, title or file missing");
    }

    const url = `http://${host}:${port}/${path.join(
      __dirname,
      "public/images/"
    )}/${photo.originalname}`;
    const newPhoto = { title: title, url: url };
    PhotoStorage.addPhoto(newPhoto);
    resolve(newPhoto);
  });
}

function updatePhoto(photoId, title, photo) {
  return new Promise((resolve, reject) => {
    if (!photoId || !photo) {
      reject("Invalid photo data, id or new data missing");
    }

    const url = `http://${host}:${port}/${path.join(
      __dirname,
      "public/images/"
    )}/${image.originalname}`;
    const newPhoto = { title: title, url: url };
    resolve(PhotoStorage.updatePhoto(photoId, newPhoto));
  });
}

function deletePhoto(photoId) {
  return new Promise((resolve, reject) => {
    if (!photoId) {
      reject("Invalid data, Id missing");
    }
    resolve(PhotoStorage.deletePhoto(photoId));
  });
}

module.exports = {
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
};
