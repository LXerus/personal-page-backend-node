const CarouselStorage = require("./carouselStorage");
const PhotoController = require("../photo/photoController");
const { isValidObjectId } = require("mongoose");

function getCarousel(carouselId) {
  return new Promise((resolve, reject) => {
    if (carouselId && isValidObjectId(carouselId)) {
      resolve(CarouselStorage.getCarouselById(carouselId));
    }

    if ((carouselId = "")) {
      resolve(CarouselStorage.getCarouselList());
    }

    reject("[carouselController getCarousel] invalid input params");
  });
}

function addCarousel(photos) {
  return new Promise(async (resolve, reject) => {
    let photoIds = [];
    let photoList = [];

    if (!photos || photos.length === 0) {
      reject("[carouselController addCarousel] Photos are required.");
    }

    for (let photo of photos) {
      const addedPhoto = await PhotoController.addPhoto(
        photo.originalname,
        photo
      );
      photoList.push(addedPhoto);
    }

    for (let photo of photoList) {
      photoIds.push(photo._id);
    }

    resolve(CarouselStorage.addCarousel({ photos: photoIds }));
  });
}

function addCarouselPhoto(carouselId, photo) {
  return new Promise(async (resolve, reject) => {
    if (!carouselId || !photo) {
      reject("[carouselController addCarouselPhoto] invalid input params");
    }

    const addedPhoto = await PhotoController.addPhoto(
      photo.originalname,
      photo
    );
    resolve(CarouselStorage.addCarouselPhoto(carouselId, addedPhoto._id));
  });
}

function deleteCarousel(carouselId) {
  return new Promise(async (resolve, reject) => {
    if (!carouselId || !photo) {
      reject("[carouselController deleteCarousel] invalid input params");
    }

    let existingCarousel = await getCarousel(carouselId);
    for (let photoId of existingCarousel.photos) {
      await CarouselStorage.deleteCarouselPhoto(photoId);
    }

    resolve(CarouselStorage.deleteCarousel(carouselId));
  });
}

module.exports = {
  getCarousel,
  addCarousel,
  addCarouselPhoto,
  deleteCarousel,
};
