const PhotoStorage = require("./photoStorage");
const configVars = require("../../config/configVars");
const path = require("path");
const fs = require("fs");

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
      reject("Invalid input data");
    }

    const url = `${configVars.host}:${configVars.port}/${path.join(
      __dirname,
      "public/images/"
    )}/${photo.originalname}`;
    const newPhoto = { title: title, url: url };
    PhotoStorage.addPhoto(newPhoto);
    resolve(newPhoto);
  });
}

function updatePhoto(photoId, title, photo) {
  return new Promise(async (resolve, reject) => {
    if (!photoId || title === "" || !photo) {
      reject("Invalid photo data, id or new data missing");
    }

    if(await __removeOldPhoto(photoId) === 404){
      reject("[photo] 404 Not found");
    }

    const url = `${configVars.host}:${configVars.port}/${path.join(
      __dirname,
      "public/images/"
    )}/${photo.originalname}`;
    const newPhoto = { title: title, url: url };
    resolve(PhotoStorage.updatePhoto(photoId, newPhoto));
  });
}

function deletePhoto(photoId) {
  return new Promise(async (resolve, reject) => {
    if (!photoId) {
      reject("Invalid data, Id missing");
    }

    if(await __removeOldPhoto(photoId) === 404){
      reject("[photo] 404 Not found");
    }

    resolve(PhotoStorage.deletePhoto(photoId));
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
      return;
    });
  }
  return 404;
}

module.exports = {
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
};
