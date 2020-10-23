const mongoose = require("mongoose");
const Album = require("../album/albumModel");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: String,
  url: String,
});

photoSchema.pre("deleteOne", (photo) => {
  const photoId = photo._id;
  console.log(this)
  Album.find({ photos: { $in: [photoId] } }).then((albums) => {
    Promise.all(
      albums.map((album) => {
        Album.findOneAndUpdate(
          album._id,
          { $pull: { photos: photoId } },
          { new: true }
        ).exec();
      })
    );
  });
});

const photoModel = mongoose.model("Photo", photoSchema, "photos");

module.exports = photoModel;
