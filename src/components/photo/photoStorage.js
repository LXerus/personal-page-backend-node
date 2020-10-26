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

function addPhoto(photo) {
  return new Promise((resolve, reject) => {
    if (!photo) {
      reject("[photoStorage addPhoto] invalid input params");
    }

    try {
      const newPhoto = new PhotoModel(photo);
      newPhoto.save();
      resolve(newPhoto);
    } catch (error) {
      reject("[photoStorage addPhoto] invalid input params" + error);
    }
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
    reject("[photoStorage updatePhoto] invalid input params");
  });
}

function deletePhoto(photoId) {
  return new Promise(async (resolve, reject) => {
    if (photoId) {
      const deletedPhoto = PhotoModel.deleteOne({ _id: photoId });
      resolve(deletedPhoto);
    }

    reject("[photoStorage updatePhoto] invalid input params");
  });
}

module.exports = {
  getPhotoByID,
  getPhoto,
  addPhoto,
  updatePhoto,
  deletePhoto,
};
