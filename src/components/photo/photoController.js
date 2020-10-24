const PhotoStorage = require("./photoStorage");
const AlbumStorage = require("../album/albumStorage");
const configVars = require("../../config/configVars");
const path = require("path");
const fs = require("fs");
const { resolve } = require("path");

function getPhotoById(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Invalid input data");
    }

    resolve(PhotoStorage.getPhotoByID(id));
  });
}

function getPhoto(photoName) {
  return new Promise((resolve, reject) => {
    if (photoName !== null) {
      resolve(PhotoStorage.getPhoto(photoName));
    }
    reject("Invalid data");
  });
}

function addPhoto(title, photo, id = null) {
  return new Promise((resolve, reject) => {
    if (!title || !photo) {
      reject("Invalid input data");
    }

    const url = `${configVars.host}:${configVars.port}/${path.join(
      __dirname,
      "public/images/"
    )}/${photo.filename}`;
    let newPhoto = {};

    if (id !== null) {
      newPhoto = { _id: id, title: title, url: url };
    } else {
      newPhoto = { title: title, url: url };
    }

    resolve(PhotoStorage.addPhoto(newPhoto));
  });
}

function updatePhoto(photoId, title, photo) {
  return new Promise(async (resolve, reject) => {
    if (!photoId || title === "" || !photo) {
      reject("Invalid photo data, id or new data missing");
    }

    if ((await __removeOldPhoto(photoId)) === 404) {
      reject("[photo] 404 Not found");
    }

    const url = `${configVars.host}:${configVars.port}/${path.join(
      __dirname,
      "public/images/"
    )}/${photo.filename}`;
    const newPhoto = { title: title, url: url };
    resolve(PhotoStorage.updatePhoto(photoId, newPhoto));
  });
}

function deletePhoto(photoId) {
  return new Promise(async (resolve, reject) => {
    if (!photoId) {
      reject("Invalid data, Id missing");
    }

    try {
      await __removeOldPhoto(photoId);
    } catch (error) {
      reject("[photo] 404 Not found", error);
    }

    resolve(PhotoStorage.deletePhoto(photoId));
  });
}

function deleteAlbumPhoto(photoId) {
  return new Promise(async (resolve, reject) => {
    if (!photoId) {
      reject(AlbumStorage.getAlbumByPhotoId(null));
    }

    await deletePhoto(photoId);
    resolve(AlbumStorage.deleteAlbumPhoto(photoId));
  });
}

async function __removeOldPhoto(photoId) {
  let existingPhoto = await PhotoStorage.getPhotoByID(photoId);
  if (existingPhoto !== 404) {
    let oldFile = existingPhoto.url.match(
      /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/
    );
    const oldPath = path.join(__dirname, `../../public/images/${oldFile[0]}`);
    await fs.unlink(oldPath, (error) => {
      console.error(error);
      return error;
    });
    return 204;
  }
  return 404;
}

module.exports = {
  addPhoto,
  getPhotoById,
  getPhoto,
  updatePhoto,
  deletePhoto,
  deleteAlbumPhoto,
};
