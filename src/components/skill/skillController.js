const { rejects } = require("assert");
const { resolve } = require("path");
const skillStorage = require("./skillStorage");
const photoStorage = require("../photo/PhotoStorage");

function getSkill(skillName) {
  return new Promise((resolve, reject) => {
    if (skillName !== null || skillName !== undefined) {
      resolve(skillStorage.getSkill(skillName));
    }
    reject("Invalid data");
  });

  function addSkill(title, text, image) {    
    return new Promise(async (resolve, reject) => {
      if (!title || !text || !image) {
        reject("Invalid input data");
      }
    });

    const newPhoto = photoStorage
    const newSkill={};
    resolve(skillStorage.addSkill(skill));
  }
}
