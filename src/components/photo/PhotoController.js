const PhotoStorage = require("./PhotoStorage");
const path = require("path");
const configVars = require("../../config/configVars");
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
      reject("Invalid file data, title or file missing");
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

    await __removeOldPhoto(photoId);

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

    await __removeOldPhoto(photoId);
    resolve(PhotoStorage.deletePhoto(photoId));
  });
}

async function __removeOldPhoto(photoId) {
  let existingPhoto = await PhotoStorage.getPhotoByID(photoId);
    let oldFile = existingPhoto.url.match(/[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/);
    const oldPath = path.join (__dirname ,`../../public/images/${oldFile[0]}`);
    await fs.unlink(oldPath, (error) =>{
      console.error(error);
      return
    });
}

module.exports = {
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
};
