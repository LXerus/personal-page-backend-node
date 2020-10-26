const CarouselModel = require("./carouselModel");

async function getCarouselList() {
  const carousels = await CarouselModel.find({});
  return carousels;
}

function getCarouselById(carouselId) {
  return new Promise((resolve, reject) => {
    if (!carouselId) {
      reject("[carouselStorage getCarouselById] Invalid input params");
    }

    resolve(CarouselModel.findById(carouselId));
  });
}

function addCarousel(carousel) {
  return new Promise((resolve, reject) => {
    if (!carousel) {
      reject("[carouselStorage add] Invalid input data");
    }

    const newCarousel = new CarouselModel(carousel);
    newCarousel.save();
    resolve(newCarousel);
  });
}

function addCarouselPhoto(carouselId, photoId) {
  return new Promise(async (resolve, reject) => {
    if (!carouselId) {
      reject("[carouselStorage update] Invalid input data");
    }

    const updatedCarousel = await CarouselModel.updateOne(
      { _id: carouselId },
      { $push: { photos: [photoId] } }
    );
    resolve(updatedCarousel);
  });
}

function deleteCarousel(carouselId) {
  return new Promise(async (resolve, reject) => {
    if (!carouselId) {
      reject("[carouselStorage delete] Invalid input data");
    }

    const deletedCarousel = await CarouselModel.deleteOne({ _id: carouselId });
    resolve(deletedCarousel);
  });
}

async function deleteCarouselPhoto(photoId) {
  await CarouselModel.updateOne(
    {},
    { $pull: { photos: { $in: [photoId] } } },
    { multi: true }
  );
}

module.exports = {
  getCarouselList,
  getCarouselById,
  addCarousel,
  addCarouselPhoto,
  deleteCarousel,
  deleteCarouselPhoto,
};
