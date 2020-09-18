const PhotoModel = require("./PhotoModel");

function addPhoto(photo) {
  const newPhoto = new PhotoModel(photo);
  newPhoto.save();
}

function getPhoto(photoName) {
  return new Promise(async (resolve, reject) => {
    let photos;

    if (photoName) {
      let filter = { title: new RegExp(photoName, "i") };
      photos = await PhotoModel.find(filter).exec();
    } else {
      photos = await PhotoModel.find({}).exec();
    }

    if (photos.length === 0) {
      reject("No results were found");
    }

    resolve(photos);
  });
}

function updatePhoto(photoId, photo) {
  return new Promise(async (resolve, reject) => {
    const existingPhoto = await PhotoModel.findOne({ _id: photoId });
    if (photoId) {
      existingPhoto.photo = photo;
      resolve(existingPhoto.save());
    }
    reject("Could not find original photo");
  });
}

async function deletePhoto(photoId) {
  return await PhotoModel.deleteOne({ _id: photoId });
}

module.exports = {
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
};
