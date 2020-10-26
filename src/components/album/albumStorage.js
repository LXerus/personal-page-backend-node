const { isValidObjectId } = require("mongoose");
const AlbumModel = require("./albumModel");

async function getAlbumByID(albumId) {
  const existingAlbum = await AlbumModel.findById(albumId);

  if (existingAlbum) {
    return existingAlbum;
  }

  return 404;
}

function getAlbum(albumName) {
  return new Promise(async (resolve, reject) => {
    let filter = { title: new RegExp(albumName, "i") };
    let albums = await AlbumModel.find(filter).exec();

    if (albums.length === 0) {
      reject(404);
    }

    resolve(albums);
  });
}
async function getAlbumByPhotoId(phptoId) {
  if (!phptoId || !isValidObjectId(phptoId)) {
    return "[albumStorage getAlbumByPhotoId] Invalid input params";
  }
  const albums = await AlbumModel.find({ photos: { $in: [phptoId] } });
  return albums;
}

async function addAlbum(album) {
  const newAlbum = new AlbumModel(album);
  await newAlbum.save();
  return newAlbum;
}

function updateAlbum(albumId, album) {
  return new Promise(async (resolve, reject) => {
    if (!albumId || !isValidObjectId(albumId)) {
      reject("[albumStorage updateAlbum] Invalid input params");
    }
    const updatedAlbum = await AlbumModel.findByIdAndUpdate(albumId, album);
    resolve(updatedAlbum);
  });
}

async function deleteAlbum(albumId) {
  return new Promise(async (resolve, reject) => {
    if (!albumId || !isValidObjectId(albumId)) {
      reject("[albumStorage deleteAlbum] Invalid input params");
    }
    resolve(AlbumModel.deleteOne({ _id: albumId }));
  });
}

async function deleteAlbumPhoto(phptoId) {
  if (!albumId || !isValidObjectId(phptoId)) {
    return "[albumStorage deleteAlbumPhoto] Invalid input params";
  }

  await AlbumModel.updateOne(
    {},
    { $pull: { photos: { $in: [phptoId] } } },
    { multi: true }
  );
}

module.exports = {
  getAlbumByID,
  getAlbumByPhotoId,
  getAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  deleteAlbumPhoto,
};
