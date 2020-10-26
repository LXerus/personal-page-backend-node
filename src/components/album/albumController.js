const AlbumStorage = require("./albumStorage");
const PhotoController = require("../photo/photoController");
const fs = require("fs");
const { isValidObjectId } = require("mongoose");

function getAlbums(albumName) {
  return new Promise((resolve, reject) => {
    if (albumName || albumName === "") {
      resolve(AlbumStorage.getAlbum(albumName));
    }

    reject("[albumController getAlbums] Invalid input data");
  });
}

function addAlbum(title, description, photos) {
  return new Promise(async (resolve, reject) => {
    let photoIds = [];
    let photoList = [];

    if (!title) {
      reject("[albumController addAlbum] Invalid input data");
    }

    for (let photo of photos) {
      const addedPhoto = await PhotoController.addPhoto(
        photo.originalname,
        photo
      );
      photoList.push(addedPhoto);
    }

    for (let photo of photoList) {
      photoIds.push(photo._id);
    }

    const newAlbum = {
      title: title,
      description: description,
      photos: photoIds,
    };

    resolve(AlbumStorage.addAlbum(newAlbum));
  });
}

function addAlbumPhoto(albumId, photo) {
  return new Promise(async (resolve, reject) => {
    if (!albumId || !isValidObjectId(albumId) || !photo) {
      reject("[albumController addAlbumPhoto] invalid input params");
    }

    const addedPhoto = await PhotoController.addPhoto(
      photo.originalname,
      photo
    );
    resolve(
      AlbumStorage.updateAlbum(albumId, { $push: { photos: [addedPhoto._id] } })
    );
  });
}

function updateAlbum(albumId, title) {
  return new Promise((resolve, reject) => {
    if (!albumId || !isValidObjectId(albumId) || !title) {
      reject("[albumController updateAlbum] invalid input params");
    }

    let newAlbum = {};

    if (images) {
      newAlbum = { title: title, photos: images };
    } else {
      newAlbum = { title: title };
    }

    resolve(AlbumStorage.updateAlbum(albumId, newAlbum));
  });
}

function deleteAlbum(albumId) {
  return new Promise((resolve, reject) => {
    if (!albumId || !isValidObjectId(albumId)) {
      reject("[albumController deleteAlbum] invalid input params");
    }

    resolve(AlbumStorage.deleteAlbum(albumId));
  });
}

module.exports = {
  getAlbums,
  addAlbum,
  addAlbumPhoto,
  updateAlbum,
  deleteAlbum,
};
