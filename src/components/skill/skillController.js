const skillStorage = require("./skillStorage");
const photoController = require("../photo/photoController");
const fs = require("fs");
const { isValidObjectId } = require("mongoose");

function getSkill(title) {
  return new Promise(async (resolve, reject) => {
    if (title || title === "") {
      let skills = await skillStorage.getSkill(title);

      let skillList = [];

      for (let skill of skills) {
        let skillPhoto = await photoController.getPhotoById(skill.image);
        const skillDetails = {
          id: skill._id,
          title: skill.title,
          text: skill.text,
          image: skillPhoto,
        };
        skillList.push(skillDetails);
      }

      resolve(skillList);
    }
    reject("[skillController getSkill] Invalid input params");
  });
}

function addSkill(title, text, image) {
  return new Promise(async (resolve, reject) => {
    if (!title || !text || !image) {
      reject("[skillController addSkill] Invalid input params");
    }

    const addedImage = await photoController.addPhoto(
      image.originalname,
      image
    );
    const newSkill = { title: title, text: text, image: addedImage._id };
    await skillStorage.addSkill(newSkill);
    resolve(newSkill);
  });
}

function updateSkill(skillId, title, text, image) {
  return new Promise(async (resolve, reject) => {
    if (!skillId || !title || !text || !isValidObjectId(skillId)) {
      reject("[skillController updateSkill] Invalid input params");
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
    if (!skillId || !isValidObjectId(skillId)) {
      reject("[skillController deleteSkill] Invalid input params");
    }

    let toBeDeleted = await skillStorage.getSkillById(skillId);
    await skillStorage.deleteSkill(skillId);
    await photoController.deletePhoto(toBeDeleted.image);
    resolve("Skill deleted");
  });
}

module.exports = {
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
};
