const albumStorage = require("./albumStorage");
const photoController = require("../photo/photoController");
const configVars = require("../../config/configVars");
const bson = require("bson");
const fs = require("fs");

function getAlbums(albumName) {
  return new Promise((resolve, reject) => {
    if (albumName) {
      resolve(albumStorage.getAlbum(albumName));
    }

    reject("Invalid input data");
  });
}

function addAlbum(title, images = []) {
  return new Promise((resolve, reject) => {
    let imageIds = [];

    if (!title) {
      reject("Invalid input data");
    }

    images.forEach((image) => {
      const imageId = new bson.ObjectID();
      const imageUrl = `${configVars.host}:${configVars.port}/${path.join(
        __dirname,
        "public/images/"
      )}/${Date.now() + image.originalname}`;

      image = {
        _id: imageId,
        title: image.filename,
        url: imageUrl,
      };
    });

    images.forEach((image) => {
      imageIds.push(image._id);
    });

    const newAlbum = { title: title, photos: imageIds };

    resolve(albumStorage.addAlbum(newAlbum));
  });
}

function updateAlbum(albumId, title, images) {
  return new Promise((resolve, reject) => {
    if (!albumId) {
      reject("Invalid input data");
    }

    const newAlbum = { title: title, photos: images };

    resolve(albumStorage.updateAlbum(albumId, newAlbum));
  });
}

function deleteAlbum(albumId) {
  return new Promise((resolve, reject) => {
    if (!albumId) {
      reject("Invalid input data");
    }

    resolve(albumStorage.deleteAlbum(albumId));
  });
}

module.exports = {
  getAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
