const albumModel = require("./albumModel");
const albumStorage = require("./albumModel");

async function getAlbumByID(albumId) {
  const existingAlbum = await albumModel.findById(albumId);

  if (existingAlbum) {
    return existingAlbum;
  }

  return 404;
}

function getAlbum(albumName) {
  return new Promise(async (resolve, reject) => {
    let filter = { title: new RegExp(albumName, "i") };
    let albums = await albumModel.find(filter).exec();

    if(albums.length === 0){
        reject(404);
    }

    resolve(albums);
  });
}

function addAlbum(album) {
    const newAlbum = new albumModel(album);
    newAlbum.save();
}

function updateAlbum(albumId, album) {
    return new Promise( async(resolve, reject)=>{
        if (albumId) {
            const updatedAlbum = await albumModel.findByIdAndUpdate(albumId, album);
            resolve(updatedAlbum);
        }

        reject("Could not update album");
    });
}

async function deleteAlbum(albumId) {
    return await albumModel.findByIdAndDelete({_id: albumId});
}

module.exports = {
  getAlbumByID,
  getAlbum,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
