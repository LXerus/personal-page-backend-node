const albumStorage = require("./albumStorage");
const photoController = require("../photo/photoController");
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
  return new Promise(async(resolve, reject) => {
    let imageIds = [];
    let imageList = [];

    if (!title) {
      reject("Invalid input data");
    }

    for(let image  of images){
      const addedImage = await photoController.addPhoto(image.originalname, image); 
      imageList.push(addedImage);
    }

    for(let image of imageList){
      imageIds.push(image._id);
    }

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
