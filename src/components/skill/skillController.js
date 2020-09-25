const { rejects } = require("assert");
const { resolve } = require("path");
const skillStorage = require("./skillStorage");
const photoStorage = require("../photo/PhotoStorage");
const configVars = require("../../config/configVars");
const bson = require("bson");
const fs = require("fs");

function getSkill(skillName) {
  return new Promise((resolve, reject) => {
    if (skillName !== null || skillName !== undefined) {
      resolve(skillStorage.getSkill(skillName));
    }
    reject("Invalid data");
  });
}

function addSkill(title, text, image) {
  return new Promise(async (resolve, reject) => {
    if (!title || !text || !image) {
      reject("Invalid input data");
    }

    const imageId = new bson.ObjectID();
    const imageUrl = `${configVars.host}:${configVars.port}/${path.join(
      __dirname,
      "public/images/"
    )}/${photo.originalname}`;
  });

  const newPhoto = { _id: imageId, title: imgage.filename, url: imageUrl };
  const newSkill = { title: title, text: text, image: imageId };
  photoStorage.addPhoto(newPhoto);
  skillStorage.addSkill(newSkill);
  resolve(newSkill);
}

function updateSkill(skillId, title, text, image) {
  return new Promise(async (resolve, reject) =>{
    if(!skillId || !title || !text || !image){
      reject("Invalid input data");
    }

    const existingSkill = await skillStorage.getSkillById(skillId);
    const existingPhoto = await photoStorage.getPhotoByID(existingSkill.image);
    
  });
}

async function __removeOldPhoto(photoId) {
  let existingPhoto = await PhotoStorage.getPhotoByID(photoId);
  if (existingPhoto !== 404) {
    let oldFile = existingPhoto.url.match(
      /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/
    );
    const oldPath = path.join(__dirname, `../../public/images/${oldFile[0]}`);
    await fs.unlink(oldPath, (error) => {
      console.error(error);
      return error;
    });
  }
  return 404;
}