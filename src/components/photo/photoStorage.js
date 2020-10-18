const { resolve } = require("path");
const PhotoModel = require("./photoModel");

async function getPhotoByID(photoId) {
  const existingPhoto = await PhotoModel.findById(photoId);

  if (existingPhoto) {
    return existingPhoto;
  }

  return 404;
}

function getPhoto(photoName) {
  return new Promise(async (resolve, reject) => {
    let filter = { title: new RegExp(photoName, "i") };
    let photos = await PhotoModel.find(filter).exec();

    if (photos.length === 0) {
      reject(404);
    }

    resolve(photos);
  });
}

function addPhoto(photo, returnPhoto = false) {
  return new Promise((resolve, reject) => {
    if (!photo) {
      reject("could not add photo");
    }

    const newPhoto = new PhotoModel(photo);
    newPhoto.save();
    resolve(newPhoto);
  });
}

function updatePhoto(photoId, photo) {
  return new Promise(async (resolve, reject) => {
    if (photoId) {
      const updatedPhoto = await PhotoModel.findByIdAndUpdate(photoId, photo, {
        new: true,
      });
      resolve(updatedPhoto);
    }
    reject("Could not update photo");
  });
}

async function deletePhoto(photoId) {
  return await PhotoModel.findByIdAndDelete({ _id: photoId });
}

module.exports = {
  getPhotoByID,
  getPhoto,
  addPhoto,
  updatePhoto,
  deletePhoto,
};
