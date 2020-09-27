const skillStorage = require("./skillStorage");
const photoController = require("../photo/photoController");
const configVars = require("../../config/configVars");
const bson = require("bson");
const fs = require("fs");

function getSkill(skillName) {
  return new Promise((resolve, reject) => {
    if (skillName) {
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
    )}/${Date.now() + photo.originalname}`;

    const newPhoto = { _id: imageId, title: imgage.filename, url: imageUrl };
    const newSkill = { title: title, text: text, image: imageId };
    await photoController.addPhoto(newPhoto);
    await skillStorage.addSkill(newSkill);
    resolve(newSkill);
  });
}

function updateSkill(skillId, title, text, image) {
  return new Promise(async (resolve, reject) => {
    if (!skillId || !title || !text) {
      reject("Invalid input data");
    }

    const existingSkill = await skillStorage.getSkillById(skillId);
    let updatedSkill = { title: title, text: text };

    if (image !== null) {
      await photoController.updatePhoto(
        existingSkill.image,
        image.filename,
        image
      );
    }

    await skillStorage.updateSkill(skillId, updatedSkill);
    resolve(updatedSkill);
  });
}

function deleteSkill(skillId) {
  return new Promise(async (resolve, reject) => {
    if (!skillId) {
      reject("Invalid input data");
    }

    resolve(skillStorage.deleteSkill(skillId));
  });
}

module.exports = {
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
};
