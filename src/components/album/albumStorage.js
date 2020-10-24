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
  if (!phptoId) {
    return "[albumStorage] Invalid input data";
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
    if (albumId) {
      const updatedAlbum = await AlbumModel.findByIdAndUpdate(albumId, album);
      resolve(updatedAlbum);
    }

    reject("Could not update album");
  });
}

async function deleteAlbum(albumId) {
  return await AlbumModel.deleteOne({ _id: albumId });
}

async function deleteAlbumPhoto(phptoId) {
  await AlbumModel.updateOne(
    {},
    { $pull: { photos: {$in: [phptoId]} } },
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
