const PhotoModel = require("./PhotoModel");

function addPhoto(photo) {
  const newPhoto = new PhotoModel(photo);
  newPhoto.save();
}

async function getPhotoByID(photoId) {
  const existingPhoto =  await PhotoModel.findById(photoId);
 
  if (existingPhoto) {
    return existingPhoto;
  }

  return 404;
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
    if (photoId) {      
      const existingPhoto = await PhotoModel.findByIdAndUpdate(photoId, photo, {new: true});
      resolve(existingPhoto);
    }
    reject("Could not find original photo");
  });
}

async function deletePhoto(photoId) {
  return await PhotoModel.findByIdAndDelete({ _id: photoId });
}

module.exports = {
  getPhotoByID,
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
};
