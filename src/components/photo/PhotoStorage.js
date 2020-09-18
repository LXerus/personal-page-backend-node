const PhotoModel = require("./PhotoModel");

function addPhoto(photo) {
  const newPhoto = new PhotoModel(photo);
  newPhoto.save();
}

async function getPhoto(photoName) {
  let filter = {};
  let photos;

  if (photoName) {
    filter = { title: new RegExp(`/${photoName}/`, "i") };
    console.log(filter);
    photos = await PhotoModel.find(photoName);
  } else {
    photos = await PhotoModel.find({});
  }

  return photos;
}

async function updatePhoto(photoId, photo) {
    const existingPhoto = await PhotoModel.findOne({_id: photoId});
    existingPhoto.photo = photo;
    return await existingPhoto.save();
}

async function deletePhoto(photoId) {
    return await PhotoModel.deleteOne({ _id: photoId });
}

module.exports = {
    addPhoto,
    getPhoto,
    updatePhoto,
    deletePhoto
};